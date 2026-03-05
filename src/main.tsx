import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n' // Initialize i18n

if (import.meta.env.DEV) {
  const devUserId = localStorage.getItem('gcaihubDevUserId');
  if (!devUserId) {
    localStorage.setItem('gcaihubDevUserId', 'dev-submitter-user');
    localStorage.setItem('gcaihubDevRoles', 'submitter,reviewer,admin');
  }
}

createRoot(document.getElementById("root")!).render(<App />);
