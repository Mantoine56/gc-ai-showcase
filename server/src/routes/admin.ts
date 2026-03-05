import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../middleware/errorHandler';
import { validateQuery } from '../middleware/validateRequest';
import { AdminStatsQuerySchema } from '../validation/schemas';
import { authenticateOptional, authenticateRequired, requireRoles } from '../middleware/auth';

// Admin analytics router (no auth for now)
// Exposes a single endpoint that returns a comprehensive analytics payload
// for consumption by the Admin Stats page. A scope toggle allows switching
// between Published-only data and All moderation states.
const router = Router();

router.use(authenticateOptional);
router.use(authenticateRequired);
router.use(requireRoles('reviewer', 'admin'));

type Scope = 'published' | 'all';

// Utility: produce month labels and date boundaries for the last N months
function getLastNMonths(n: number) {
  const labels: string[] = [];
  const starts: Date[] = [];
  const ends: Date[] = [];

  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(startOfThisMonth);
    d.setMonth(d.getMonth() - i);
    const end = new Date(d);
    end.setMonth(end.getMonth() + 1);
    end.setMilliseconds(end.getMilliseconds() - 1);

    const label = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    labels.push(label);
    starts.push(d);
    ends.push(end);
  }

  return { labels, starts, ends };
}

// Utility: count entities per month based on createdAt timestamps
function countPerMonth(items: { createdAt: Date }[], starts: Date[], ends: Date[]) {
  const counts = new Array(starts.length).fill(0);
  for (const item of items) {
    for (let i = 0; i < starts.length; i++) {
      if (item.createdAt >= starts[i] && item.createdAt <= ends[i]) {
        counts[i] += 1;
        break;
      }
    }
  }
  return counts;
}

// GET /api/admin/stats?scope=published|all&includeCodeRequests=true
router.get(
  '/stats',
  validateQuery(AdminStatsQuerySchema),
  asyncHandler(async (req, res) => {
    const scope = (req.query.scope as Scope) || 'published';
    const includeCodeRequests = (req.query.includeCodeRequests as string | undefined) !== 'false';

    // Base where filter for projects depending on scope
    const projectWhere = scope === 'published' ? { moderationState: 'Published' as const } : {};

    // Summary counts
    const [
      total,
      featured,
      inProduction,
      orgDistinct,
      adsCount,
      personalInfoCount,
      hasUserNotificationCount,
      openGovAiaProvided,
    ] = await Promise.all([
      prisma.project.count({ where: projectWhere }),
      prisma.project.count({ where: { ...projectWhere, featured: true } }),
      prisma.project.count({ where: { ...projectWhere, status: 'InProduction' } }),
      prisma.project.findMany({
        where: projectWhere,
        select: { organizationId: true },
        distinct: ['organizationId'],
      }),
      prisma.project.count({ where: { ...projectWhere, isAutomatedDecisionSystem: true } }),
      prisma.project.count({ where: { ...projectWhere, involvesPersonalInfo: true } }),
      prisma.project.count({ where: { ...projectWhere, hasUserNotification: true } }),
      prisma.project.count({
        where: {
          ...projectWhere,
          OR: [
            { openGovAiaId: { not: null } },
            // SQLite: treat empty string as not provided
          ],
          NOT: { openGovAiaId: '' },
        },
      }),
    ]);

    // Distributions via groupBy
    const [statusGroups, moderationGroups, developedByGroups, primaryUsersGroups] = await Promise.all([
      prisma.project.groupBy({ where: projectWhere, by: ['status'], _count: { _all: true } }),
      scope === 'all'
        ? prisma.project.groupBy({ by: ['moderationState'], _count: { _all: true } })
        : Promise.resolve([]),
      prisma.project.groupBy({ where: projectWhere, by: ['developedBy'], _count: { _all: true } }),
      prisma.project.groupBy({ where: projectWhere, by: ['primaryUsers'], _count: { _all: true } }),
    ]);

    // Organizations: top N and matrix org x status
    const orgGroups = await prisma.project.groupBy({
      where: projectWhere,
      by: ['organizationId'],
      _count: { _all: true },
    });
    const orgGroupsSorted = [...orgGroups].sort((a, b) => b._count._all - a._count._all);
    const topOrgs = orgGroupsSorted.slice(0, 10);
    const othersCount = orgGroupsSorted.slice(10).reduce((sum, g) => sum + g._count._all, 0);
    const orgIds = topOrgs.map((g) => g.organizationId);
    const orgRecords = orgIds.length
      ? await prisma.organization.findMany({ where: { id: { in: orgIds } } })
      : [];
    const orgIdToName = new Map(orgRecords.map((o) => [o.id, o.nameEN]));

    // Matrix: counts per status for top orgs
    const matrix: Array<{ organizationId: string; name: string; status: string; count: number }> = [];
    for (const orgId of orgIds) {
      const perStatus = await prisma.project.groupBy({
        where: { ...projectWhere, organizationId: orgId },
        by: ['status'],
        _count: { _all: true },
      });
      perStatus.forEach((g) => {
        matrix.push({ organizationId: orgId, name: orgIdToName.get(orgId) || 'Unknown', status: g.status, count: g._count._all });
      });
    }

    // Vendors: top 10 when developedBy = Vendor and vendorName present
    const vendorGroups = await prisma.project.groupBy({
      where: { ...projectWhere, developedBy: 'Vendor', vendorName: { not: null } },
      by: ['vendorName'],
      _count: { _all: true },
    });
    const vendorGroupsSorted = [...vendorGroups].sort((a, b) => b._count._all - a._count._all);
    const topVendors = vendorGroupsSorted
      .filter((g) => (g.vendorName || '').trim() !== '')
      .slice(0, 10)
      .map((g) => ({ vendorName: g.vendorName as string, count: g._count._all }));

    // Time series: last 24 months of created projects
    const { labels: monthLabels, starts, ends } = getLastNMonths(24);
    const createdProjects = await prisma.project.findMany({
      where: { ...projectWhere, createdAt: { gte: starts[0] } },
      select: { createdAt: true },
    });
    const createdMonthly = countPerMonth(createdProjects, starts, ends);
    const publishedProjects = await prisma.project.findMany({
      where: { moderationState: 'Published', createdAt: { gte: starts[0] } },
      select: { createdAt: true },
    });
    const publishedMonthly = countPerMonth(publishedProjects, starts, ends);
    const cumulative = createdMonthly.reduce<number[]>((acc, cur, i) => {
      const prev = i === 0 ? 0 : acc[i - 1];
      acc.push(prev + cur);
      return acc;
    }, []);

    // Status year buckets
    const statusYearGroups = await prisma.project.groupBy({
      where: { ...projectWhere, statusYear: { not: null } },
      by: ['statusYear'],
      _count: { _all: true },
      orderBy: { statusYear: 'asc' },
    });

    // Content: capabilities & PIB codes frequency (top 20)
    const contentFields = await prisma.project.findMany({
      where: projectWhere,
      select: { capabilitiesEN: true, capabilitiesFR: true, personalInformationBanksEN: true, personalInformationBanksFR: true },
    });
    const capabilityCounts = new Map<string, number>();
    const pibCounts = new Map<string, number>();
    for (const row of contentFields) {
      const cap = (row.capabilitiesEN || row.capabilitiesFR || '').split(/[;,]/).map((s) => s.trim()).filter(Boolean);
      const pibs = (row.personalInformationBanksEN || row.personalInformationBanksFR || '').split(/[;,]/).map((s) => s.trim()).filter(Boolean);
      cap.forEach((c) => capabilityCounts.set(c, (capabilityCounts.get(c) || 0) + 1));
      pibs.forEach((p) => pibCounts.set(p, (pibCounts.get(p) || 0) + 1));
    }
    const capabilitiesTop = Array.from(capabilityCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([key, count]) => ({ key, count }));
    const pibCodesTop = Array.from(pibCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([key, count]) => ({ key, count }));

    // Code requests analytics (optional)
    let codeRequests: {
      total: number;
      countsByStatus: Array<{ key: string; count: number }>;
      months: string[];
      createdMonthly: number[];
      byProjectTop: Array<{ projectId: string; projectName: string; count: number }>;
    } | undefined = undefined;
    if (includeCodeRequests) {
      const [crTotal, crStatusGroups, crRows, crTopByProject] = await Promise.all([
        prisma.codeRequest.count(),
        prisma.codeRequest.groupBy({ by: ['status'], _count: { _all: true } }),
        prisma.codeRequest.findMany({ where: { createdAt: { gte: starts[0] } }, select: { createdAt: true } }),
        prisma.codeRequest.groupBy({ by: ['projectId'], _count: { _all: true } }),
      ]);
      const crMonthly = countPerMonth(crRows, starts, ends);
      const crTopSorted = [...crTopByProject].sort((a, b) => b._count._all - a._count._all);
      const crTop10 = crTopSorted.slice(0, 10);
      const crProjectIds = crTop10.map((g) => g.projectId);
      const crProjects = crProjectIds.length
        ? await prisma.project.findMany({ where: { id: { in: crProjectIds } }, select: { id: true, nameEN: true, nameFR: true } })
        : [];
      const projectIdToName = new Map(crProjects.map((p) => [p.id, p.nameEN || p.nameFR || 'Unknown']));
      codeRequests = {
        total: crTotal,
        countsByStatus: crStatusGroups.map((g) => ({ key: g.status, count: g._count._all })),
        months: monthLabels,
        createdMonthly: crMonthly,
        byProjectTop: crTop10.map((g) => ({ projectId: g.projectId, projectName: projectIdToName.get(g.projectId) || 'Unknown', count: g._count._all })),
      };
    }

    res.json({
      scope,
      summary: {
        total,
        featured,
        inProduction,
        organizations: orgDistinct.length,
        adsCount,
        personalInfoCount,
        hasUserNotificationCount,
        openGovAiaProvided,
      },
      distributions: {
        status: statusGroups.map((g) => ({ key: g.status, count: g._count._all })),
        moderationState: moderationGroups.map((g) => ({ key: g.moderationState, count: g._count._all })),
        developedBy: developedByGroups.map((g) => ({ key: g.developedBy, count: g._count._all })),
        primaryUsers: primaryUsersGroups.map((g) => ({ key: g.primaryUsers, count: g._count._all })),
      },
      organizations: {
        top: topOrgs.map((g) => ({ organizationId: g.organizationId, name: orgIdToName.get(g.organizationId) || 'Unknown', count: g._count._all })),
        othersCount,
        matrix,
      },
      vendors: {
        top: topVendors,
      },
      timeSeries: {
        months: monthLabels,
        createdMonthly,
        publishedMonthly,
        cumulative,
      },
      governance: {
        statusYearBuckets: statusYearGroups.map((g) => ({ year: g.statusYear as number, count: g._count._all })),
        openGovAiaProvided,
      },
      content: {
        capabilitiesTop,
        pibCodesTop,
      },
      codeRequests,
    });
  })
);

export default router;
