import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { validateBody, validateQuery } from '../middleware/validateRequest';
import {
  CreateProjectSchema,
  UpdateProjectSchema,
  ProjectQuerySchema,
} from '../validation/schemas';

const router = Router();

// GET /api/projects/stats - Get global statistics
router.get(
  '/stats',
  asyncHandler(async (req, res) => {
    // Get total count
    const total = await prisma.project.count({
      where: { moderationState: 'Published' },
    });

    // Get featured count
    const featured = await prisma.project.count({
      where: {
        moderationState: 'Published',
        featured: true,
      },
    });

    // Get in production count
    const inProduction = await prisma.project.count({
      where: {
        moderationState: 'Published',
        status: 'InProduction',
      },
    });

    // Get unique organizations count
    const organizations = await prisma.project.findMany({
      where: { moderationState: 'Published' },
      select: { organizationId: true },
      distinct: ['organizationId'],
    });

    // Get open source count
    const openSource = await prisma.project.count({
      where: {
        moderationState: 'Published',
        isOpenSource: true,
      },
    });

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
    } = req.query as any;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    // Text search across multiple bilingual fields
    // Note: SQLite LIKE is case-insensitive by default, so we don't use mode: 'insensitive'
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

    // Filters
    if (organizationId) where.organizationId = organizationId;
    if (status) where.status = status;
    if (isAutomatedDecisionSystem !== undefined) {
      where.isAutomatedDecisionSystem = isAutomatedDecisionSystem === 'true';
    }
    if (involvesPersonalInfo !== undefined) {
      where.involvesPersonalInfo = involvesPersonalInfo === 'true';
    }
    if (statusYear) {
      where.statusYear = parseInt(statusYear);
    }
    if (moderationState) where.moderationState = moderationState;
    if (featured !== undefined) {
      where.featured = featured === 'true';
    }
    if (isOpenSource !== undefined) {
      where.isOpenSource = isOpenSource === 'true';
    }

    // Default to only showing published projects for non-authenticated users (MVP)
    if (!moderationState) {
      where.moderationState = 'Published';
    }

    // Build orderBy clause - handle organization sorting specially
    let orderBy: any = { [sortBy]: sortOrder };

    if (sortBy === 'organization') {
      // Sort by organization name instead of organizationId
      orderBy = {
        organization: {
          nameEN: sortOrder,
        },
      };
    }

    // Execute query
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          organization: true,
          contacts: {
            orderBy: { role: 'asc' }, // Order by role: Primary, Technical, Business
          },
        },
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.project.count({ where }),
    ]);

    res.json({
      data: projects,
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

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        organization: true,
        contacts: {
          orderBy: { role: 'asc' }, // Order by role: Primary, Technical, Business
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

    res.json(project);
  })
);

// POST /api/projects - Create new project
router.post(
  '/',
  validateBody(CreateProjectSchema),
  asyncHandler(async (req, res) => {
    const data = req.body;

    // For MVP, all new projects start as Published (no moderation)
    // In production, this would be Draft and require admin approval
    const project = await prisma.project.create({
      data: {
        ...data,
        moderationState: 'Published',
      },
      include: {
        organization: true,
      },
    });

    res.status(201).json(project);
  })
);

// PUT /api/projects/:id - Update project
router.put(
  '/:id',
  validateBody(UpdateProjectSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    // Check if project exists
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'Project not found');
    }

    const project = await prisma.project.update({
      where: { id },
      data,
      include: {
        organization: true,
      },
    });

    res.json(project);
  })
);

// DELETE /api/projects/:id - Soft delete (archive) project
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if project exists
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'Project not found');
    }

    // Soft delete by setting moderation state to Archived
    const project = await prisma.project.update({
      where: { id },
      data: {
        moderationState: 'Archived',
      },
    });

    res.json({ message: 'Project archived successfully', project });
  })
);

// GET /api/projects/:id/stats - Get project statistics (for future use)
router.get(
  '/:id/stats',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new AppError(404, 'Project not found');
    }

    const codeRequestCount = await prisma.codeRequest.count({
      where: { projectId: id },
    });

    res.json({
      codeRequests: codeRequestCount,
      // Future: views, bookmarks, etc.
    });
  })
);

export default router;
