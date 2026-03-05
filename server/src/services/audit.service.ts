import { PrismaClient } from '../../generated/prisma';

interface AuditEvent {
  actorId?: string;
  action: string;
  entity: string;
  entityId: string;
  diff?: string;
}

export async function recordAuditEvent(
  prisma: PrismaClient,
  event: AuditEvent
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: event.actorId,
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
