import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExternalLink, BookOpen, Code, Shield, Users } from 'lucide-react';

const Resources = () => {
  const starterRepos = [
    {
      name: "MLflow Starter",
      description: "Complete MLflow setup for model tracking and deployment",
      url: "https://github.com/gc-ai/mlflow-starter",
      language: "Python"
    },
    {
      name: "Gitea Self-Hosted",
      description: "Self-hosted Git service configuration for GC environments",
      url: "https://github.com/gc-ai/gitea-config",
      language: "Docker"
    },
    {
      name: "AI API Template",
      description: "FastAPI template with authentication and monitoring",
      url: "https://github.com/gc-ai/api-template",
      language: "Python"
    },
    {
      name: "React Dashboard",
      description: "Government-compliant dashboard template",
      url: "https://github.com/gc-ai/dashboard-template",
      language: "TypeScript"
    }
  ];

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Resources & Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to start building AI solutions within the Government of Canada ecosystem. 
            From starter templates to policy guidelines.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <Code className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Starter Repos</h3>
              <p className="text-sm text-muted-foreground">Ready-to-use templates</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Policy Docs</h3>
              <p className="text-sm text-muted-foreground">Compliance guidelines</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Design System</h3>
              <p className="text-sm text-muted-foreground">UI/UX standards</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">Connect & collaborate</p>
            </CardContent>
          </Card>
        </div>

        {/* Accordion Sections */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {/* Starter Repositories */}
            <AccordionItem value="starter-repos" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Code className="h-6 w-6 text-primary" />
                  Starter Repositories
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-muted-foreground mb-6">
                  Pre-configured repositories to jumpstart your AI projects with GC-compliant setups.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {starterRepos.map((repo) => (
                    <Card key={repo.name} className="hover:shadow-card-hover transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                          {repo.name}
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                            {repo.language}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {repo.description}
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <a href={repo.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Repository
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* GC AI Policies */}
            <AccordionItem value="policies" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-secondary" />
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
                  <BookOpen className="h-6 w-6 text-primary" />
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

            {/* How to Contribute */}
            <AccordionItem value="contribute" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-secondary" />
                  How to Contribute
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-muted-foreground mb-6">
                  Join the GC AI community and help build the future of government AI solutions.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Adding Your Project</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Fork the GC AI Hub repository</li>
                      <li>Add your project to the projects.json file</li>
                      <li>Include demo links and documentation</li>
                      <li>Submit a pull request for review</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Community Guidelines</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>All projects must be open source</li>
                      <li>Follow GC coding standards and accessibility requirements</li>
                      <li>Include proper documentation and setup instructions</li>
                      <li>Respect privacy and security guidelines</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button>
                      Submit Your Project
                    </Button>
                    <Button variant="outline">
                      Join Slack Community
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;