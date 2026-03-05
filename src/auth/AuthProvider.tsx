import { PropsWithChildren, useEffect } from 'react';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { getMsalInstance, isEntraEnabled, defaultLoginRequest } from './msal';

function AuthBootstrap() {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const syncToken = async () => {
      const account = accounts[0];
      if (!account) {
        localStorage.removeItem('gcaihubAccessToken');
        return;
      }

      try {
        const tokenResponse = await instance.acquireTokenSilent({
          ...defaultLoginRequest,
          account,
        });

        const token = tokenResponse.accessToken || tokenResponse.idToken;
        if (token) {
          localStorage.setItem('gcaihubAccessToken', token);
        }
      } catch {
        localStorage.removeItem('gcaihubAccessToken');
      }
    };

    void syncToken();
  }, [accounts, instance]);

  return null;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const instance = getMsalInstance();
  if (!isEntraEnabled || !instance) {
    return <>{children}</>;
  }

  return (
    <MsalProvider instance={instance}>
      <AuthBootstrap />
      {children}
    </MsalProvider>
  );
}
