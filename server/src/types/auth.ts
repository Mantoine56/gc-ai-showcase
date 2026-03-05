export type AppRole = 'submitter' | 'reviewer' | 'admin';

export interface AuthContext {
  isAuthenticated: boolean;
  userId?: string;
  email?: string;
  displayName?: string;
  roles: AppRole[];
}

export const ANONYMOUS_AUTH: AuthContext = {
  isAuthenticated: false,
  roles: [],
};

export function hasRole(auth: AuthContext, roles: AppRole[]): boolean {
  if (!auth.isAuthenticated) return false;
  return auth.roles.some((role) => roles.includes(role));
}
