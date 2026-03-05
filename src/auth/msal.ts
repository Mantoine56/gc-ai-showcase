import { Configuration, PublicClientApplication } from '@azure/msal-browser';

const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID;
const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID;
const redirectUri = import.meta.env.VITE_ENTRA_REDIRECT_URI || window.location.origin;

export const isEntraEnabled = Boolean(clientId && tenantId);

const msalConfig: Configuration = {
  auth: {
    clientId: clientId || 'missing-client-id',
    authority: tenantId
      ? `https://login.microsoftonline.com/${tenantId}`
      : undefined,
    redirectUri,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

let msalApp: PublicClientApplication | null = null;

export function getMsalInstance(): PublicClientApplication | null {
  if (!isEntraEnabled) return null;
  if (!msalApp) {
    msalApp = new PublicClientApplication(msalConfig);
  }
  return msalApp;
}

export const defaultLoginRequest = {
  scopes: ['openid', 'profile', 'email'],
};
