import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  Mail,
  ExternalLink,
  Keyboard,
  Eye,
  Volume2,
  Monitor,
  Smartphone,
  ArrowLeft,
} from 'lucide-react';

const Accessibility = () => {
  const { t } = useTranslation('pages');

  const features = [
    {
      icon: Keyboard,
      title: 'Keyboard Navigation',
      description: 'Navigate the entire site using only your keyboard. All interactive elements are accessible via Tab, Enter, and Space keys.',
    },
    {
      icon: Eye,
      title: 'Screen Reader Support',
      description: 'Compatible with NVDA, JAWS, and VoiceOver. All content includes proper ARIA labels and semantic HTML.',
    },
    {
      icon: Volume2,
      title: 'Live Regions',
      description: 'Dynamic content updates are announced to screen readers using ARIA live regions.',
    },
    {
      icon: Monitor,
      title: 'High Contrast Mode',
      description: 'Supports Windows High Contrast Mode and respects user color preferences.',
    },
  ];

  const keyboardShortcuts = [
    { key: 'Tab', action: 'Navigate to next interactive element' },
    { key: 'Shift + Tab', action: 'Navigate to previous interactive element' },
    { key: 'Enter / Space', action: 'Activate buttons and links' },
    { key: 'Escape', action: 'Close dialogs and dropdown menus' },
    { key: 'Arrow Keys', action: 'Navigate within menus and lists' },
    { key: 'Home / End', action: 'Jump to first/last item in lists' },
  ];

  const wcagCriteria = [
    { level: 'A', criteria: 'Keyboard', status: 'Full Compliance' },
    { level: 'A', criteria: 'Non-text Content', status: 'Full Compliance' },
    { level: 'A', criteria: 'Info and Relationships', status: 'Full Compliance' },
    { level: 'A', criteria: 'Bypass Blocks', status: 'Full Compliance' },
    { level: 'AA', criteria: 'Contrast (Minimum)', status: 'Full Compliance' },
    { level: 'AA', criteria: 'Resize Text', status: 'Full Compliance' },
    { level: 'AA', criteria: 'Focus Visible', status: 'Full Compliance' },
    { level: 'AA', criteria: 'Language of Page', status: 'Full Compliance' },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Dashboard
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">/</li>
            <li aria-current="page" className="font-medium text-foreground">
              Accessibility Statement
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gcds-text-primary">
              Accessibility Statement
            </h1>
            <Badge className="bg-gcds-color-green-100 text-gcds-color-green-900 border-gcds-color-green-300">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              WCAG 2.1 AA Compliant
            </Badge>
          </div>
          <p className="text-lg text-gcds-text-secondary">
            The Government of Canada is committed to ensuring digital accessibility for people with disabilities.
          </p>
        </div>

        <Separator />

        {/* Commitment Statement */}
        <Card>
          <CardHeader>
            <CardTitle>Our Commitment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gcds-text-secondary leading-relaxed">
              The GC AI Hub is committed to ensuring digital accessibility for all users, including those with disabilities.
              We continually improve the user experience for everyone and apply the relevant accessibility standards to ensure
              we provide equal access to all users.
            </p>
            <p className="text-gcds-text-secondary leading-relaxed">
              This website is designed to be compatible with assistive technologies, including screen readers, keyboard navigation,
              and voice recognition software. We follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
            </p>
          </CardContent>
        </Card>

        {/* Conformance Status */}
        <Card>
          <CardHeader>
            <CardTitle>Conformance Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gcds-color-green-50 rounded-lg border border-gcds-color-green-200">
              <CheckCircle2 className="h-5 w-5 text-gcds-color-green-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gcds-color-green-900">
                  Fully Conformant
                </p>
                <p className="text-sm text-gcds-color-green-800 mt-1">
                  This website fully conforms to WCAG 2.1 Level AA standards. All content is accessible and
                  functional for users with disabilities.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gcds-text-primary">Compliance Date:</p>
              <p className="text-gcds-text-secondary">{new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gcds-text-primary">Standards Applied:</p>
              <ul className="list-disc list-inside space-y-1 text-gcds-text-secondary">
                <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                <li>Government of Canada Standard on Web Accessibility</li>
                <li>Accessible Canada Act (ACA)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Accessible Features */}
        <Card>
          <CardHeader>
            <CardTitle>Accessible Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="p-3 bg-gcds-color-blue-50 rounded-lg shrink-0">
                      <Icon className="h-6 w-6 text-gcds-color-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gcds-text-primary mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gcds-text-secondary">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Keyboard Shortcuts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gcds-border-secondary">
                    <th className="text-left py-3 px-4 font-semibold text-gcds-text-primary" scope="col">
                      Key
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gcds-text-primary" scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {keyboardShortcuts.map((shortcut, index) => (
                    <tr key={index} className="border-b border-gcds-border-secondary last:border-0">
                      <td className="py-3 px-4">
                        <kbd className="px-2 py-1 bg-gcds-background-secondary border border-gcds-border-secondary rounded text-sm font-mono">
                          {shortcut.key}
                        </kbd>
                      </td>
                      <td className="py-3 px-4 text-gcds-text-secondary">
                        {shortcut.action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* WCAG Criteria */}
        <Card>
          <CardHeader>
            <CardTitle>WCAG 2.1 Level AA Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gcds-border-secondary">
                    <th className="text-left py-3 px-4 font-semibold text-gcds-text-primary" scope="col">
                      Level
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gcds-text-primary" scope="col">
                      Success Criteria
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gcds-text-primary" scope="col">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wcagCriteria.map((item, index) => (
                    <tr key={index} className="border-b border-gcds-border-secondary last:border-0">
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          Level {item.level}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gcds-text-secondary">
                        {item.criteria}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-gcds-color-green-700">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-sm font-medium">{item.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gcds-text-secondary mt-4">
              This is a representative sample of WCAG criteria. View the complete{' '}
              <a
                href="https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1&levels=aa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gcds-color-blue-700 hover:underline inline-flex items-center gap-1"
              >
                WCAG 2.1 AA quick reference
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gcds-text-primary mb-2">Compatibility:</p>
              <ul className="list-disc list-inside space-y-1 text-gcds-text-secondary">
                <li>Modern web browsers (Chrome, Firefox, Safari, Edge)</li>
                <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
                <li>Keyboard-only navigation</li>
                <li>Voice recognition software</li>
                <li>Screen magnification software</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gcds-text-primary mb-2">Technologies:</p>
              <ul className="list-disc list-inside space-y-1 text-gcds-text-secondary">
                <li>HTML5 with semantic elements</li>
                <li>ARIA (Accessible Rich Internet Applications) attributes</li>
                <li>CSS3 with GC Design System tokens</li>
                <li>JavaScript with progressive enhancement</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Testing */}
        <Card>
          <CardHeader>
            <CardTitle>Testing & Validation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gcds-text-secondary">
              This website has been tested with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gcds-text-secondary">
              <li>Automated accessibility testing tools (axe DevTools, Lighthouse, WAVE)</li>
              <li>Manual keyboard navigation testing</li>
              <li>Screen reader testing (NVDA on Windows, VoiceOver on macOS)</li>
              <li>Color contrast analysis</li>
              <li>Zoom and magnification testing (up to 200%)</li>
              <li>Windows High Contrast Mode compatibility</li>
            </ul>
            <p className="text-gcds-text-secondary">
              We conduct regular accessibility audits to ensure continued compliance with WCAG 2.1 Level AA standards.
            </p>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback & Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gcds-text-secondary leading-relaxed">
              We welcome your feedback on the accessibility of the GC AI Hub. Please let us know if you encounter
              any accessibility barriers or have suggestions for improvement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" asChild>
                <a href="mailto:accessibility@canada.ca" className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  accessibility@canada.ca
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/gc-ai/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Report Issue on GitHub
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <p className="text-sm text-gcds-text-secondary">
              We aim to respond to accessibility feedback within 5 business days and to propose a solution within 10 business days.
            </p>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.canada.ca/en/government/publicservice/wellness-inclusion-diversity-public-service/diversity-inclusion-public-service/accessibility-public-service.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gcds-color-blue-700 hover:underline inline-flex items-center gap-2"
                >
                  Accessibility in the Government of Canada
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gcds-color-blue-700 hover:underline inline-flex items-center gap-2"
                >
                  Web Content Accessibility Guidelines (WCAG)
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://accessible.canada.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gcds-color-blue-700 hover:underline inline-flex items-center gap-2"
                >
                  Accessible Canada
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://design.canada.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gcds-color-blue-700 hover:underline inline-flex items-center gap-2"
                >
                  Canada.ca Design System
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="text-center pt-6 border-t border-gcds-border-secondary">
          <p className="text-sm text-gcds-text-secondary">
            Last Updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-sm text-gcds-text-secondary mt-1">
            This accessibility statement is reviewed and updated regularly to reflect the current state of the website.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Accessibility;
