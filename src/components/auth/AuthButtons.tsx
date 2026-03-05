import { useMsal } from '@azure/msal-react';
import { Button } from '@/components/ui/button';
import { defaultLoginRequest, isEntraEnabled } from '@/auth/msal';

export function AuthButtons() {
  if (!isEntraEnabled) return null;
  return <EntraAuthButtons />;
}

function EntraAuthButtons() {
  const { instance, accounts } = useMsal();
  const activeAccount = accounts[0];

  const handleLogin = async () => {
    await instance.loginPopup(defaultLoginRequest);
    localStorage.removeItem('gcaihubDevUserId');
    localStorage.removeItem('gcaihubDevRoles');
  };

  const handleLogout = async () => {
    localStorage.removeItem('gcaihubAccessToken');
    await instance.logoutPopup();
  };

  if (!activeAccount) {
    return (
      <Button variant="outline" size="sm" onClick={handleLogin}>
        Sign in
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      Sign out
    </Button>
  );
}
