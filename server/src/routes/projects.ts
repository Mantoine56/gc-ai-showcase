import { Request, Router } from 'express';
import { ModerationState, Prisma, ProjectStatus } from '../../generated/prisma';
import {
  serializeProject,
  serializeProjects,
  toCreateProjectData,
  toUpdateProjectData,
} from '../dto/project.dto';
import {
  authenticateOptional,
  authenticateRequired,
  canEditProject,
  requireRoles,
} from '../middleware/auth';
import { ANONYMOUS_AUTH } from '../types/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { prisma } from '../lib/prisma';
import { recordAuditEvent } from '../services/audit.service';
import {
  assertValidTransition,
  computeTranslationStatus,
} from '../services/project-workflow.service';
import { validateBody, validateQuery } from '../middleware/validateRequest';
import {
  CreateProjectSchema,
  ModerationNotesSchema,
  ProjectQuerySchema,
  UpdateProjectSchema,
} from '../validation/schemas';

const router = Router();

router.use(authenticateOptional);

function isReviewerOrAdmin(req: Request): boolean {
  const roles = req.auth?.roles || [];
  return roles.includes('reviewer') || roles.includes('admin');
}

async function getProjectOrThrow(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      organization: true,
      contacts: {
        orderBy: { role: 'asc' },
      },
      codeRequests: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  });

  if (!project) {
    throw new AppError(404, 'Project not found');
  }

  return project;
}

async function transitionProject(
  projectId: string,
  nextState: ModerationState,
  actor: Request['auth'],
  reviewNotes?: string,
  auditAction?: string
) {
  const existing = await prisma.project.findUnique({ where: { id: projectId } });
  if (!existing) throw new AppError(404, 'Project not found');

  try {
    assertValidTransition(existing.moderationState, nextState);
  } catch (error) {
    throw new AppError(400, error instanceof Error ? error.message : 'Invalid moderation transition');
  }

  const now = new Date();
  const update: Prisma.ProjectUpdateInput = {
    moderationState: nextState,
    reviewNotes: reviewNotes?.trim() || existing.reviewNotes,
  };

  if (nextState === 'Submitted') update.submittedAt = now;
  if (nextState === 'Approved') update.approvedAt = now;
  if (nextState === 'Published') update.publishedAt = now;

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: update,
    include: { organization: true },
  });

  await recordAuditEvent(prisma, {
    actorId: actor?.userId,
    actorEmail: actor?.email,
    actorDisplayName: actor?.displayName,
    actorRoles: actor?.roles,
    action: auditAction || `project.${nextState.toLowerCase()}`,
    entity: 'project',
    entityId: projectId,
    diff: JSON.stringify({
      from: existing.moderationState,
      to: nextState,
      reviewNotes: reviewNotes || undefined,
    }),
  });

  return updated;
}

// GET /api/projects/stats - Get global statistics
router.get(
  '/stats',
  asyncHandler(async (_req, res) => {
    const [total, featured, inProduction, organizations, openSource] = await Promise.all([
      prisma.project.count({ where: { moderationState: 'Published' } }),
      prisma.project.count({
        where: { moderationState: 'Published', featured: true },
      }),
      prisma.project.count({
        where: { moderationState: 'Published', status: 'InProduction' },
      }),
      prisma.project.findMany({
        where: { moderationState: 'Published' },
        select: { organizationId: true },
        distinct: ['organizationId'],
      }),
      prisma.project.count({
        where: { moderationState: 'Published', isOpenSource: true },
      }),
    ]);

    res.json({
      total,
      featured,
      inProduction,
      organizations: organizations.length,
      openSource,
    });
  })
);

// GET /api/projects - List projects with filtering, search, and pagination
router.get(
  '/',
  validateQuery(ProjectQuerySchema),
  asyncHandler(async (req, res) => {
    const {
      query,
      organizationId,
      status,
      isAutomatedDecisionSystem,
      involvesPersonalInfo,
      statusYear,
      moderationState,
      featured,
      isOpenSource,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.query as Record<string, string | undefined>;

    const pageNum = Number.parseInt(page || '1', 10) || 1;
    const limitNum = Number.parseInt(limit || '20', 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const where: Prisma.ProjectWhereInput = {};

    if (query) {
      where.OR = [
        { nameEN: { contains: query } },
        { nameFR: { contains: query } },
        { descriptionEN: { contains: query } },
        { descriptionFR: { contains: query } },
        { capabilitiesEN: { contains: query } },
        { capabilitiesFR: { contains: query } },
      ];
    }

    if (organizationId) where.organizationId = organizationId;
    if (status) where.status = status as ProjectStatus;
    if (isAutomatedDecisionSystem !== undefined) {
      where.isAutomatedDecisionSystem = isAutomatedDecisionSystem === 'true';
    }
    if (involvesPersonalInfo !== undefined) {
      where.involvesPersonalInfo = involvesPersonalInfo === 'true';
    }
    if (statusYear) {
      const parsedYear = Number.parseInt(statusYear, 10);
      if (!Number.isNaN(parsedYear)) {
        where.statusYear = parsedYear;
      }
    }
    if (featured !== undefined) where.featured = featured === 'true';
    if (isOpenSource !== undefined) where.isOpenSource = isOpenSource === 'true';

    if (moderationState && moderationState !== 'Published' && !isReviewerOrAdmin(req)) {
      throw new AppError(403, 'Only reviewers and admins can access non-public moderation states');
    }

    if (moderationState) {
      where.moderationState = moderationState as ModerationState;
    } else {
      where.moderationState = 'Published';
    }

    const requestedSort = sortBy || 'createdAt';
    const requestedOrder: Prisma.SortOrder = sortOrder === 'asc' ? 'asc' : 'desc';

    let orderBy: Prisma.ProjectOrderByWithRelationInput = { createdAt: requestedOrder };
    if (requestedSort === 'organization') {
      orderBy = {
        organization: {
          nameEN: requestedOrder,
        },
      };
    } else if (
      requestedSort === 'name' ||
      requestedSort === 'createdAt' ||
      requestedSort === 'updatedAt' ||
      requestedSort === 'status' ||
      requestedSort === 'statusYear'
    ) {
      orderBy = { [requestedSort]: requestedOrder } as Prisma.ProjectOrderByWithRelationInput;
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          organization: true,
          contacts: {
            orderBy: { role: 'asc' },
          },
        },
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.project.count({ where }),
    ]);

    res.json({
      data: serializeProjects(projects),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  })
);

// GET /api/projects/:id - Get single project
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const project = await getProjectOrThrow(id);

    if (
      project.moderationState !== 'Published' &&
      !isReviewerOrAdmin(req) &&
      !canEditProject(req.auth || ANONYMOUS_AUTH, project.ownerEntraObjectId)
    ) {
      throw new AppError(404, 'Project not found');
    }

    res.json(serializeProject(project));
  })
);

// GET /api/projects/:id/audit - Get audit history for a project
router.get(
  '/:id/audit',
  authenticateRequired,
  asyncHandler(async (req, res) => {
    const project = await getProjectOrThrow(req.params.id);
    const auth = req.auth || ANONYMOUS_AUTH;

    if (!isReviewerOrAdmin(req) && !canEditProject(auth, project.ownerEntraObjectId)) {
      throw new AppError(403, 'You do not have permission to view this audit history');
    }

    const auditEntries = await prisma.auditLog.findMany({
      where: {
        entity: 'project',
        entityId: project.id,
      },
      include: {
        actor: {
          select: {
            displayName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 25,
    });

    res.json(
      auditEntries.map((entry) => ({
        id: entry.id,
        actorId: entry.actorId || undefined,
        actorDisplayName: entry.actor?.displayName || undefined,
        actorEmail: entry.actor?.email || undefined,
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId,
        diff: entry.diff || undefined,
        createdAt: entry.createdAt.toISOString(),
      }))
    );
  })
);

// POST /api/projects - Create new draft project
router.post(
  '/',
  authenticateRequired,
  requireRoles('submitter', 'reviewer', 'admin'),
  validateBody(CreateProjectSchema),
  asyncHandler(async (req, res) => {
    const data = req.body;
    const actorId = req.auth?.userId;

    const project = await prisma.project.create({
      data: toCreateProjectData(data, actorId),
      include: {
        organization: true,
      },
    });

    await recordAuditEvent(prisma, {
      actorId,
      actorEmail: req.auth?.email,
      actorDisplayName: req.auth?.displayName,
      actorRoles: req.auth?.roles,
      action: 'project.create',
      entity: 'project',
      entityId: project.id,
      diff: JSON.stringify({
        moderationState: project.moderationState,
        translationStatus: project.translationStatus,
      }),
    });

    res.status(201).json(serializeProject(project));
  })
);

// PUT /api/projects/:id - Update project
router.put(
  '/:id',
  authenticateRequired,
  requireRoles('submitter', 'reviewer', 'admin'),
  validateBody(UpdateProjectSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const patch = req.body;
    const actor = req.auth;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw new AppError(404, 'Project not found');

    if (!canEditProject(actor || ANONYMOUS_AUTH, existing.ownerEntraObjectId)) {
      throw new AppError(403, 'You do not have permission to update this project');
    }

    const project = await prisma.project.update({
      where: { id },
      data: toUpdateProjectData(existing, patch),
      include: { organization: true },
    });

    await recordAuditEvent(prisma, {
      actorId: actor?.userId,
      actorEmail: actor?.email,
      actorDisplayName: actor?.displayName,
      actorRoles: actor?.roles,
      action: 'project.update',
      entity: 'project',
      entityId: id,
    });

    res.json(serializeProject(project));
  })
);

// POST /api/projects/:id/submit - Submit a draft for review
router.post(
  '/:id/submit',
  authenticateRequired,
  requireRoles('submitter', 'reviewer', 'admin'),
  validateBody(ModerationNotesSchema),
  asyncHandler(async (req, res) => {
    const project = await getProjectOrThrow(req.params.id);
    const auth = req.auth || ANONYMOUS_AUTH;

    if (!canEditProject(auth, project.ownerEntraObjectId)) {
      throw new AppError(403, 'You do not have permission to submit this project');
    }

    const updated = await transitionProject(
      project.id,
      'Submitted',
      auth,
      req.body.reviewNotes
    );
    res.json(serializeProject(updated));
  })
);

// POST /api/projects/:id/request-changes - Return a submitted project to draft
router.post(
  '/:id/request-changes',
  authenticateRequired,
  requireRoles('reviewer', 'admin'),
  validateBody(ModerationNotesSchema),
  asyncHandler(async (req, res) => {
    const updated = await transitionProject(
      req.params.id,
      'Draft',
      req.auth,
      req.body.reviewNotes,
      'project.request_changes'
    );
    res.json(serializeProject(updated));
  })
);

// POST /api/projects/:id/approve - Approve a submitted project
router.post(
  '/:id/approve',
  authenticateRequired,
  requireRoles('reviewer', 'admin'),
  validateBody(ModerationNotesSchema),
  asyncHandler(async (req, res) => {
    const updated = await transitionProject(
      req.params.id,
      'Approved',
      req.auth,
      req.body.reviewNotes
    );
    res.json(serializeProject(updated));
  })
);

// POST /api/projects/:id/publish - Publish an approved project
router.post(
  '/:id/publish',
  authenticateRequired,
  requireRoles('reviewer', 'admin'),
  validateBody(ModerationNotesSchema),
  asyncHandler(async (req, res) => {
    const existing = await getProjectOrThrow(req.params.id);
    const translationStatus = computeTranslationStatus(existing);
    if (translationStatus !== 'Ready') {
      throw new AppError(
        400,
        'Cannot publish: bilingual content is incomplete. Fill the required English and French publish fields first.'
      );
    }

    const updated = await transitionProject(
      existing.id,
      'Published',
      req.auth,
      req.body.reviewNotes
    );

    const patched = await prisma.project.update({
      where: { id: updated.id },
      data: {
        translationStatus,
      },
      include: { organization: true },
    });

    res.json(serializeProject(patched));
  })
);

// POST /api/projects/:id/archive - Archive a project
router.post(
  '/:id/archive',
  authenticateRequired,
  requireRoles('reviewer', 'admin'),
  validateBody(ModerationNotesSchema),
  asyncHandler(async (req, res) => {
    const updated = await transitionProject(
      req.params.id,
      'Archived',
      req.auth,
      req.body.reviewNotes
    );
    res.json(serializeProject(updated));
  })
);

// DELETE /api/projects/:id - Backward-compatible archive endpoint
router.delete(
  '/:id',
  authenticateRequired,
  requireRoles('reviewer', 'admin'),
  asyncHandler(async (req, res) => {
    const updated = await transitionProject(
      req.params.id,
      'Archived',
      req.auth
    );
    res.json({
      message: 'Project archived successfully',
      project: serializeProject(updated),
    });
  })
);

// GET /api/projects/:id/stats - Get project statistics
router.get(
  '/:id/stats',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) throw new AppError(404, 'Project not found');

    const codeRequestCount = await prisma.codeRequest.count({
      where: { projectId: id },
    });

    res.json({ codeRequests: codeRequestCount });
  })
);

export default router;
