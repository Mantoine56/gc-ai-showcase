import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';
import gcLogo from '@/assets/gc-logo.png';

const Footer = () => {
  const { t, i18n } = useTranslation('common');
  const currentYear = new Date().getFullYear();
  const locale = i18n.language === 'fr' ? 'fr-CA' : 'en-CA';
  const lastUpdated = new Date().toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={gcLogo} alt="Government of Canada" className="h-8 w-8" />
              <span className="text-lg font-bold">{t('header.appName')}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              {t('footer.brandDescription')}
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              <p>Last updated: {lastUpdated}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.browseProjects')}
                </Link>
              </li>
              <li>
                <Link to="/?tab=featured" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.featuredProjects')}
                </Link>
              </li>
              <li>
                <Link to="/?tab=opensource" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.openSourceProjects')}
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.submitProject')}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.resources')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.aboutRoadmap')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.government')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.directiveAutomatedDecision')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/algorithmic-impact-assessment.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.algorithmicImpactAssessment')}
                </a>
              </li>
              <li>
                <a
                  href="https://canada.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.canadaCa')}
                </a>
              </li>
              <li>
                <a
                  href="https://design.canada.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.gcDesignSystem')}
                </a>
              </li>
              <li>
                <Link
                  to="/accessibility"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.accessibilityStatement')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap gap-4">
            <span>{t('footer.copyright', { year: currentYear })}</span>
            <span>•</span>
            <a
              href="https://open.canada.ca/en/open-government-licence-canada"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {t('footer.license')}
            </a>
            <span>•</span>
            <Link
              to="/about"
              className="hover:text-foreground transition-colors"
            >
              {t('footer.contact')}
            </Link>
          </div>
          <div className="text-xs">
            {t('footer.builtWith')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;