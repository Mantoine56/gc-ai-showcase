import { PrismaClient } from '../../generated/prisma';

interface AuditEvent {
  actorId?: string;
  actorEmail?: string;
  actorDisplayName?: string;
  actorRoles?: string[];
  action: string;
  entity: string;
  entityId: string;
  diff?: string;
}

async function ensureAuditActor(
  prisma: PrismaClient,
  event: AuditEvent
): Promise<string | undefined> {
  if (!event.actorId) {
    return undefined;
  }

  const fallbackEmail = `${event.actorId}@local.invalid`;

  const actor = await prisma.user.upsert({
    where: { id: event.actorId },
    update: {
      email: event.actorEmail || fallbackEmail,
      displayName: event.actorDisplayName || event.actorEmail || event.actorId,
      roles: JSON.stringify(event.actorRoles || []),
    },
    create: {
      id: event.actorId,
      email: event.actorEmail || fallbackEmail,
      displayName: event.actorDisplayName || event.actorEmail || event.actorId,
      roles: JSON.stringify(event.actorRoles || []),
    },
  });

  return actor.id;
}

export async function recordAuditEvent(
  prisma: PrismaClient,
  event: AuditEvent
): Promise<void> {
  try {
    const actorId = await ensureAuditActor(prisma, event);
    await prisma.auditLog.create({
      data: {
        actorId,
        action: event.action,
        entity: event.entity,
        entityId: event.entityId,
        diff: event.diff,
      },
    });
  } catch (error) {
    // Auditing must not break product workflows.
    console.error('Failed to persist audit event:', error);
  }
}
