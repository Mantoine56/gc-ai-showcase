import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation('pages');
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gcds-color-grayscale-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gcds-text-primary">{t('notFound.code')}</h1>
        <p className="text-xl text-gcds-text-secondary mb-4">{t('notFound.title')}</p>
        <p className="text-muted-foreground mb-6">{t('notFound.message')}</p>
        <a href="/" className="text-gcds-color-blue-700 hover:text-gcds-color-blue-800 underline">
          {t('notFound.returnHome')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
