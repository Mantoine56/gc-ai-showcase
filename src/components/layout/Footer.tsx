import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import gcLogo from '@/assets/gc-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('en-CA', {
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
              <span className="text-lg font-bold">GC AI Hub</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A centralized platform for discovering, sharing, and collaborating on AI initiatives 
              across Government of Canada departments and agencies.
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              <p>Last updated: {lastUpdated}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About & Roadmap
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/gc-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h3 className="font-semibold mb-4">Government</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://canada.ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Canada.ca
                </a>
              </li>
              <li>
                <a 
                  href="https://design.canada.ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GC Design System
                </a>
              </li>
              <li>
                <a 
                  href="https://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=32592" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI & Data Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://accessibility.canada.ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accessibility Statement
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap gap-4">
            <span>© {currentYear} Government of Canada</span>
            <span>•</span>
            <span>MIT Licensed</span>
            <span>•</span>
            <a 
              href="mailto:gc-ai-hub@canada.ca"
              className="hover:text-foreground transition-colors"
            >
              Contact: gc-ai-hub@canada.ca
            </a>
          </div>
          <div className="text-xs">
            Built with ❤️ for the GC community
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;