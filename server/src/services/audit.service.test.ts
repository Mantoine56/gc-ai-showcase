import test from 'node:test';
import assert from 'node:assert/strict';
import { recordAuditEvent } from './audit.service';

test('recordAuditEvent upserts an actor before writing the audit row', async () => {
  const calls: Array<{ type: string; payload: unknown }> = [];
  const prisma = {
    user: {
      upsert: async (args: unknown) => {
        calls.push({ type: 'user.upsert', payload: args });
        return { id: 'dev-submitter-user' };
      },
    },
    auditLog: {
      create: async (args: unknown) => {
        calls.push({ type: 'auditLog.create', payload: args });
        return args;
      },
    },
  };

  await recordAuditEvent(prisma as any, {
    actorId: 'dev-submitter-user',
    actorDisplayName: 'Dev Submitter',
    actorRoles: ['submitter', 'reviewer'],
    action: 'project.update',
    entity: 'project',
    entityId: 'project-1',
  });

  assert.equal(calls[0]?.type, 'user.upsert');
  assert.equal(calls[1]?.type, 'auditLog.create');
  assert.match(JSON.stringify(calls[0]?.payload), /dev-submitter-user@local\.invalid/);
  assert.match(JSON.stringify(calls[1]?.payload), /"actorId":"dev-submitter-user"/);
});

test('recordAuditEvent writes actorless events without a user upsert', async () => {
  const calls: Array<{ type: string; payload: unknown }> = [];
  const prisma = {
    user: {
      upsert: async (args: unknown) => {
        calls.push({ type: 'user.upsert', payload: args });
        return { id: 'unexpected' };
      },
    },
    auditLog: {
      create: async (args: unknown) => {
        calls.push({ type: 'auditLog.create', payload: args });
        return args;
      },
    },
  };

  await recordAuditEvent(prisma as any, {
    action: 'project.archive',
    entity: 'project',
    entityId: 'project-2',
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.type, 'auditLog.create');
  assert.match(JSON.stringify(calls[0]?.payload), /"action":"project\.archive"/);
});
