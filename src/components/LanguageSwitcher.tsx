import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = newLang;
  };

  const currentLanguage = i18n.language === 'fr' ? 'fr' : 'en';
  const displayText = currentLanguage === 'en' ? 'EN' : 'FR';
  const otherLanguage = currentLanguage === 'en' ? 'FR' : 'EN';

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="h-9 px-3 font-semibold border-2"
      aria-label={`Switch to ${otherLanguage === 'FR' ? 'French' : 'English'}`}
    >
      <span className="text-gcds-text-primary">{displayText}</span>
      <span className="mx-1 text-muted-foreground">|</span>
      <span className="text-muted-foreground">{otherLanguage}</span>
    </Button>
  );
}
