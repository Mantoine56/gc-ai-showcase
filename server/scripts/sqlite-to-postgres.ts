import Database from 'better-sqlite3';
import path from 'path';
import { PrismaClient } from '../generated/prisma';

type Row = Record<string, unknown>;

function readTable(db: Database.Database, table: string): Row[] {
  return db.prepare(`SELECT * FROM "${table}"`).all() as Row[];
}

function toDateOrNull(value: unknown): Date | null {
  if (value === null || value === undefined) return null;
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
}

async function main() {
  const sourcePath =
    process.env.SQLITE_SOURCE_PATH ||
    path.resolve(process.cwd(), 'server/prisma/dev.db');

  console.log(`Using source SQLite database: ${sourcePath}`);
  const sqlite = new Database(sourcePath, { readonly: true });
  const prisma = new PrismaClient();

  const organizations = readTable(sqlite, 'Organization');
  const projects = readTable(sqlite, 'Project');
  const contacts = readTable(sqlite, 'ProjectContact');
  const codeRequests = readTable(sqlite, 'CodeRequest');
  const users = readTable(sqlite, 'User');
  const auditLogs = readTable(sqlite, 'AuditLog');

  console.log(
    `Read ${organizations.length} organizations, ${projects.length} projects, ${contacts.length} contacts, ${codeRequests.length} code requests.`
  );

  await prisma.$transaction(async (tx) => {
    await tx.auditLog.deleteMany();
    await tx.projectContact.deleteMany();
    await tx.codeRequest.deleteMany();
    await tx.project.deleteMany();
    await tx.organization.deleteMany();
    await tx.user.deleteMany();

    if (users.length) {
      await tx.user.createMany({
        data: users.map((row) => ({
          id: String(row.id),
          email: String(row.email),
          displayName: String(row.displayName),
          roles: String(row.roles),
          createdAt: toDateOrNull(row.createdAt) || new Date(),
          updatedAt: toDateOrNull(row.updatedAt) || new Date(),
        })),
      });
    }

    if (organizations.length) {
      await tx.organization.createMany({
        data: organizations.map((row) => ({
          id: String(row.id),
          nameEN: String(row.nameEN),
          nameFR: String(row.nameFR),
          acronym: row.acronym ? String(row.acronym) : null,
          url: row.url ? String(row.url) : null,
          createdAt: toDateOrNull(row.createdAt) || new Date(),
          updatedAt: toDateOrNull(row.updatedAt) || new Date(),
        })),
      });
    }

    if (projects.length) {
      await tx.project.createMany({
        data: projects.map((row) => ({
          id: String(row.id),
          aiRegisterId: row.aiRegisterId ? String(row.aiRegisterId) : null,
          nameEN: String(row.nameEN),
          nameFR: String(row.nameFR),
          serviceInventoryId: row.serviceInventoryId
            ? String(row.serviceInventoryId)
            : null,
          organizationId: String(row.organizationId),
          descriptionEN: String(row.descriptionEN),
          descriptionFR: String(row.descriptionFR),
          primaryUsers: String(row.primaryUsers) as any,
          developedBy: String(row.developedBy) as any,
          vendorName: row.vendorName ? String(row.vendorName) : null,
          status: String(row.status) as any,
          statusYear: typeof row.statusYear === 'number' ? row.statusYear : null,
          capabilitiesEN: row.capabilitiesEN ? String(row.capabilitiesEN) : null,
          capabilitiesFR: row.capabilitiesFR ? String(row.capabilitiesFR) : null,
          isAutomatedDecisionSystem: Boolean(row.isAutomatedDecisionSystem),
          openGovAiaId: row.openGovAiaId ? String(row.openGovAiaId) : null,
          dataSourcesEN: row.dataSourcesEN ? String(row.dataSourcesEN) : null,
          dataSourcesFR: row.dataSourcesFR ? String(row.dataSourcesFR) : null,
          involvesPersonalInfo: Boolean(row.involvesPersonalInfo),
          personalInformationBanksEN: row.personalInformationBanksEN
            ? String(row.personalInformationBanksEN)
            : null,
          personalInformationBanksFR: row.personalInformationBanksFR
            ? String(row.personalInformationBanksFR)
            : null,
          hasUserNotification: Boolean(row.hasUserNotification),
          atipRequestRefsEN: row.atipRequestRefsEN ? String(row.atipRequestRefsEN) : null,
          atipRequestRefsFR: row.atipRequestRefsFR ? String(row.atipRequestRefsFR) : null,
          outcomesEN: row.outcomesEN ? String(row.outcomesEN) : null,
          outcomesFR: row.outcomesFR ? String(row.outcomesFR) : null,
          source1: row.source1 ? String(row.source1) : null,
          source2: row.source2 ? String(row.source2) : null,
          moderationState: String(row.moderationState) as any,
          translationStatus: row.translationStatus
            ? (String(row.translationStatus) as any)
            : 'Incomplete',
          ownerEntraObjectId: row.ownerEntraObjectId
            ? String(row.ownerEntraObjectId)
            : null,
          submittedAt: toDateOrNull(row.submittedAt),
          approvedAt: toDateOrNull(row.approvedAt),
          publishedAt: toDateOrNull(row.publishedAt),
          reviewNotes: row.reviewNotes ? String(row.reviewNotes) : null,
          featured: Boolean(row.featured),
          isOpenSource: Boolean(row.isOpenSource),
          githubUrl: row.githubUrl ? String(row.githubUrl) : null,
          createdBy: row.createdBy ? String(row.createdBy) : null,
          updatedBy: row.updatedBy ? String(row.updatedBy) : null,
          createdAt: toDateOrNull(row.createdAt) || new Date(),
          updatedAt: toDateOrNull(row.updatedAt) || new Date(),
        })),
      });
    }

    if (contacts.length) {
      await tx.projectContact.createMany({
        data: contacts.map((row) => ({
          id: String(row.id),
          projectId: String(row.projectId),
          name: String(row.name),
          email: String(row.email),
          role: String(row.role) as any,
          title: row.title ? String(row.title) : null,
          phone: row.phone ? String(row.phone) : null,
          createdAt: toDateOrNull(row.createdAt) || new Date(),
          updatedAt: toDateOrNull(row.updatedAt) || new Date(),
        })),
      });
    }

    if (codeRequests.length) {
      await tx.codeRequest.createMany({
        data: codeRequests.map((row) => ({
          id: String(row.id),
          projectId: String(row.projectId),
          requesterId: row.requesterId ? String(row.requesterId) : null,
          requesterEmail: String(row.requesterEmail),
          message: String(row.message),
          status: String(row.status),
          createdAt: toDateOrNull(row.createdAt) || new Date(),
          updatedAt: toDateOrNull(row.updatedAt) || new Date(),
        })),
      });
    }

    if (auditLogs.length) {
      await tx.auditLog.createMany({
        data: auditLogs.map((row) => ({
          id: String(row.id),
          actorId: row.actorId ? String(row.actorId) : null,
          action: String(row.action),
          entity: String(row.entity),
          entityId: String(row.entityId),
          diff: row.diff ? String(row.diff) : null,
          createdAt: toDateOrNull(row.createdAt) || new Date(),
        })),
      });
    }
  });

  await prisma.$disconnect();
  sqlite.close();
  console.log('SQLite to target database migration completed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
