import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExternalLink, BookOpen, FileSpreadsheet, Shield, Users, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const policies = [
    {
      title: "Directive on Automated Decision-Making",
      description: "Guidelines for implementing AI systems in government decision-making processes",
      url: "https://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=32592"
    },
    {
      title: "Privacy Act Compliance",
      description: "Requirements for handling personal information in AI systems",
      url: "https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-privacy-act/"
    },
    {
      title: "GC Data Strategy",
      description: "Strategic approach to data management and governance",
      url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/enabling-interoperability/gc-enterprise-data-strategy.html"
    },
    {
      title: "Accessibility Standards",
      description: "WCAG 2.1 AA compliance requirements for government digital services",
      url: "https://accessibility.canada.ca/"
    }
  ];

  const designResources = [
    {
      title: "GC Design System",
      description: "Official design tokens, components, and guidelines",
      url: "https://design.canada.ca/"
    },
    {
      title: "Canada.ca Style Guide",
      description: "Content and design standards for government websites",
      url: "https://design.canada.ca/style-guide/"
    },
    {
      title: "Aurora Design System",
      description: "Design system for internal government applications",
      url: "https://design.gccollab.ca/"
    }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Resources & Guidance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Essential resources for submitting AI projects, understanding compliance requirements,
            and navigating Government of Canada AI policies and guidelines.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <Upload className="h-12 w-12 text-gcds-color-blue-700 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Submit Projects</h3>
              <p className="text-sm text-muted-foreground">Add your AI initiative</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-gcds-color-purple-700 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Compliance</h3>
              <p className="text-sm text-muted-foreground">Policy & guidelines</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <FileSpreadsheet className="h-12 w-12 text-gcds-color-green-700 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Import/Export</h3>
              <p className="text-sm text-muted-foreground">Excel data management</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 text-gcds-color-blue-700 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Design System</h3>
              <p className="text-sm text-muted-foreground">GCDS standards</p>
            </CardContent>
          </Card>
        </div>

        {/* Accordion Sections */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {/* How to Submit Projects */}
            <AccordionItem value="submit-projects" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Upload className="h-6 w-6 text-gcds-color-blue-700" />
                  How to Submit Your AI Project
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-muted-foreground mb-6">
                  GC AI Hub provides transparency and discoverability for AI initiatives across the Government of Canada.
                  Follow these steps to add your project to the registry.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gcds-text-primary">Submission Process</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Click the "Add Project" button in the top navigation</li>
                      <li>Complete the 5-step submission wizard:
                        <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                          <li>Step 1: Project identity and organization</li>
                          <li>Step 2: Purpose, description, and capabilities</li>
                          <li>Step 3: Compliance requirements (ADS, PIB)</li>
                          <li>Step 4: Operational details and status</li>
                          <li>Step 5: Review and submit</li>
                        </ul>
                      </li>
                      <li>Review all information in the final step</li>
                      <li>Submit for publication to the registry</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-gcds-text-primary">Required Information</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Project name and description</li>
                      <li>Organization/department</li>
                      <li>AI capabilities and use cases</li>
                      <li>Primary users (employees, public, or both)</li>
                      <li>Development status and timeline</li>
                      <li>Compliance details (ADS, PIB, privacy)</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-gcds-color-blue-700 hover:bg-gcds-color-blue-800">
                      <Link to="/submit">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit a Project
                      </Link>
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* GC AI Policies */}
            <AccordionItem value="policies" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-gcds-color-purple-700" />
                  GC AI Policies & Guidelines
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-muted-foreground mb-6">
                  Essential policy documents and compliance requirements for AI development in government.
                </p>
                <div className="space-y-4">
                  {policies.map((policy) => (
                    <Card key={policy.title} className="hover:shadow-card-hover transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2">{policy.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {policy.description}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild className="ml-4">
                            <a href={policy.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Design Guidelines */}
            <AccordionItem value="design" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-gcds-color-blue-700" />
                  Design Guidelines
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-muted-foreground mb-6">
                  Official design systems and style guides for creating government-compliant interfaces.
                </p>
                <div className="space-y-4">
                  {designResources.map((resource) => (
                    <Card key={resource.title} className="hover:shadow-card-hover transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {resource.description}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild className="ml-4">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Excel Import/Export */}
            <AccordionItem value="data-management" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-6 w-6 text-gcds-color-green-700" />
                  Excel Import & Export
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-muted-foreground mb-6">
                  Manage multiple projects efficiently using Excel spreadsheets for bulk import and export operations.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gcds-text-primary">Exporting Projects</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Export all registry data to Excel format for reporting, analysis, or backup purposes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Access via API endpoint: <code className="bg-muted px-1 py-0.5 rounded">/api/registry/export</code></li>
                      <li>Includes all project fields and metadata</li>
                      <li>Bilingual organization names (English/French)</li>
                      <li>Compatible with Excel, Google Sheets, and other spreadsheet tools</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-gcds-text-primary">Importing Projects</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Bulk import or update multiple projects using Excel spreadsheets:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Use exported file as a template</li>
                      <li>Add new rows for new projects</li>
                      <li>Update existing rows (matched by AI Register ID)</li>
                      <li>Validate data before import</li>
                      <li>Receive detailed import results (created/updated/errors)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-gcds-text-primary">Required Fields</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>• Project Name</div>
                      <div>• Organization ID</div>
                      <div>• Description</div>
                      <div>• Capabilities</div>
                      <div>• Primary Users</div>
                      <div>• Developed By</div>
                      <div>• Status</div>
                      <div>• Status Year</div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Resources;