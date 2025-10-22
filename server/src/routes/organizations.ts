import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { validateBody } from '../middleware/validateRequest';
import {
  CreateOrganizationSchema,
  UpdateOrganizationSchema,
} from '../validation/schemas';

const router = Router();

// GET /api/organizations - List all organizations
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { search } = req.query;

    const where: any = {};

    if (search && typeof search === 'string') {
      where.OR = [
        { nameEN: { contains: search } },
        { nameFR: { contains: search } },
        { acronym: { contains: search } },
      ];
    }

    const organizations = await prisma.organization.findMany({
      where,
      orderBy: { nameEN: 'asc' },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });

    res.json(organizations);
  })
);

// GET /api/organizations/:id - Get single organization
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        projects: {
          where: { moderationState: 'Published' },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { projects: true },
        },
      },
    });

    if (!organization) {
      throw new AppError(404, 'Organization not found');
    }

    res.json(organization);
  })
);

// POST /api/organizations - Create new organization (admin only in production)
router.post(
  '/',
  validateBody(CreateOrganizationSchema),
  asyncHandler(async (req, res) => {
    const data = req.body;

    const organization = await prisma.organization.create({
      data,
    });

    res.status(201).json(organization);
  })
);

// PUT /api/organizations/:id - Update organization (admin only in production)
router.put(
  '/:id',
  validateBody(UpdateOrganizationSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const existing = await prisma.organization.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'Organization not found');
    }

    const organization = await prisma.organization.update({
      where: { id },
      data,
    });

    res.json(organization);
  })
);

// DELETE /api/organizations/:id - Delete organization (admin only in production)
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const existing = await prisma.organization.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'Organization not found');
    }

    // Check if organization has projects
    const projectCount = await prisma.project.count({
      where: { organizationId: id },
    });

    if (projectCount > 0) {
      throw new AppError(
        400,
        `Cannot delete organization with ${projectCount} active projects`
      );
    }

    await prisma.organization.delete({ where: { id } });

    res.json({ message: 'Organization deleted successfully' });
  })
);

export default router;
