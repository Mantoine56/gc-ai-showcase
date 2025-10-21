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

    // Text search across multiple fields
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { capabilities: { contains: query, mode: 'insensitive' } },
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

    // Default to only showing published projects for non-authenticated users (MVP)
    if (!moderationState) {
      where.moderationState = 'Published';
    }

    // Execute query
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          organization: true,
        },
        orderBy: { [sortBy]: sortOrder },
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
