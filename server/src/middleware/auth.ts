import { NextFunction, Request, Response } from 'express';
import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose';
import { ANONYMOUS_AUTH, AppRole, AuthContext, hasRole } from '../types/auth';

const DEV_USER_ID_HEADER = 'x-dev-user-id';
const DEV_ROLES_HEADER = 'x-dev-roles';

let cachedJwks: ReturnType<typeof createRemoteJWKSet> | null = null;

function getEntraConfig() {
  const tenantId = process.env.ENTRA_TENANT_ID;
  const clientId = process.env.ENTRA_CLIENT_ID;
  const issuer =
    process.env.ENTRA_ISSUER ||
    (tenantId ? `https://login.microsoftonline.com/${tenantId}/v2.0` : undefined);
  const jwksUrl =
    process.env.ENTRA_JWKS_URL ||
    (tenantId ? `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys` : undefined);

  return { tenantId, clientId, issuer, jwksUrl };
}

function parseGroupSet(envName: string): Set<string> {
  const raw = process.env[envName] || '';
  return new Set(
    raw
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
  );
}

function mapClaimsToRoles(payload: JWTPayload): AppRole[] {
  const mappedRoles = new Set<AppRole>();

  const roleClaim = payload.roles;
  if (Array.isArray(roleClaim)) {
    for (const value of roleClaim) {
      const normalized = String(value).toLowerCase();
      if (normalized === 'admin') mappedRoles.add('admin');
      if (normalized === 'reviewer') mappedRoles.add('reviewer');
      if (normalized === 'submitter') mappedRoles.add('submitter');
    }
  }

  const groups = Array.isArray(payload.groups)
    ? payload.groups.map((group) => String(group))
    : [];
  const adminGroups = parseGroupSet('ENTRA_ADMIN_GROUP_IDS');
  const reviewerGroups = parseGroupSet('ENTRA_REVIEWER_GROUP_IDS');
  const submitterGroups = parseGroupSet('ENTRA_SUBMITTER_GROUP_IDS');

  for (const group of groups) {
    if (adminGroups.has(group)) mappedRoles.add('admin');
    if (reviewerGroups.has(group)) mappedRoles.add('reviewer');
    if (submitterGroups.has(group)) mappedRoles.add('submitter');
  }

  // Admin implies reviewer + submitter.
  if (mappedRoles.has('admin')) {
    mappedRoles.add('reviewer');
    mappedRoles.add('submitter');
  }
  if (mappedRoles.has('reviewer')) {
    mappedRoles.add('submitter');
  }

  return Array.from(mappedRoles);
}

function getJwks(url: string) {
  if (!cachedJwks) {
    cachedJwks = createRemoteJWKSet(new URL(url));
  }
  return cachedJwks;
}

function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header) return null;

  const [type, token] = header.split(' ');
  if (!type || type.toLowerCase() !== 'bearer' || !token) {
    return null;
  }

  return token;
}

function getDevelopmentAuth(req: Request): AuthContext | null {
  if (process.env.NODE_ENV === 'production') return null;

  const devUserId = req.header(DEV_USER_ID_HEADER);
  if (!devUserId) return null;

  const rolesRaw = req.header(DEV_ROLES_HEADER);
  const roles = (rolesRaw || 'submitter')
    .split(',')
    .map((role) => role.trim().toLowerCase())
    .filter(Boolean) as AppRole[];

  return {
    isAuthenticated: true,
    userId: devUserId,
    roles: Array.from(new Set(roles)),
    displayName: req.header('x-dev-user-name') || devUserId,
    email: req.header('x-dev-user-email') || undefined,
  };
}

async function resolveAuth(req: Request): Promise<AuthContext> {
  const devAuth = getDevelopmentAuth(req);
  if (devAuth) {
    return devAuth;
  }

  const token = getBearerToken(req);
  if (!token) {
    return ANONYMOUS_AUTH;
  }

  const { clientId, issuer, jwksUrl } = getEntraConfig();
  if (!clientId || !issuer || !jwksUrl) {
    if (process.env.NODE_ENV !== 'production') {
      return ANONYMOUS_AUTH;
    }
    throw new Error(
      'Entra authentication is not configured. Set ENTRA_CLIENT_ID, ENTRA_TENANT_ID (or ENTRA_ISSUER + ENTRA_JWKS_URL).'
    );
  }

  const { payload } = await jwtVerify(token, getJwks(jwksUrl), {
    issuer,
    audience: clientId,
  });

  const userId = String(payload.oid || payload.sub || '');
  if (!userId) {
    throw new Error('Token does not contain a supported user identifier.');
  }

  const roles = mapClaimsToRoles(payload);

  return {
    isAuthenticated: true,
    userId,
    roles,
    email: typeof payload.preferred_username === 'string' ? payload.preferred_username : undefined,
    displayName: typeof payload.name === 'string' ? payload.name : undefined,
  };
}

export async function authenticateOptional(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.auth = await resolveAuth(req);
    next();
  } catch (error) {
    next(error);
  }
}

export function authenticateRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.auth || ANONYMOUS_AUTH;
  if (!auth.isAuthenticated) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication is required for this operation.',
    });
  }
  return next();
}

export function requireRoles(...roles: AppRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.auth || ANONYMOUS_AUTH;
    if (!hasRole(auth, roles)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `This operation requires one of the following roles: ${roles.join(', ')}`,
      });
    }
    return next();
  };
}

export function canEditProject(
  auth: AuthContext,
  ownerEntraObjectId: string | null
): boolean {
  if (!auth.isAuthenticated) return false;
  if (auth.roles.includes('admin') || auth.roles.includes('reviewer')) return true;
  if (!ownerEntraObjectId) return false;
  return auth.userId === ownerEntraObjectId;
}
