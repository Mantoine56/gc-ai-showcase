import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, Users, Rocket, Shield, FileSpreadsheet, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const roadmapItems = [
    {
      quarter: "Phase 1 (Complete)",
      status: "Complete",
      items: [
        "Core project registry with full CRUD operations",
        "Multi-step submission wizard with validation",
        "Advanced filtering and search capabilities",
        "AI-powered assistant for natural language queries",
        "Excel import/export functionality"
      ]
    },
    {
      quarter: "Phase 2 (Planned)",
      status: "Planned",
      items: [
        "User authentication with Azure AD integration",
        "Role-based access control (Admin, Editor, Viewer)",
        "Project moderation workflow (Draft → Review → Published)",
        "Email notifications for submissions and updates",
        "Audit logging for all registry changes"
      ]
    },
    {
      quarter: "Phase 3 (Future)",
      status: "Planned",
      items: [
        "Bilingual support (English/French)",
        "Enhanced analytics and reporting dashboards",
        "API versioning and documentation (OpenAPI/Swagger)",
        "Integration with Open Government portal",
        "Mobile-responsive optimizations"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-gcds-color-green-100 text-gcds-color-green-900';
      case 'In Progress':
        return 'bg-gcds-color-blue-100 text-gcds-color-blue-900';
      case 'Planned':
        return 'bg-gcds-color-purple-100 text-gcds-color-purple-900';
      default:
        return 'bg-gcds-color-grayscale-100 text-gcds-color-grayscale-900';
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About GC AI Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive registry and transparency platform for artificial intelligence
            initiatives across the Government of Canada.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-gcds-color-blue-700" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To provide a central registry that promotes transparency and enables discovery
                of AI initiatives across Government of Canada departments. We aim to reduce
                duplication, facilitate collaboration, and support responsible AI governance
                through comprehensive project documentation and compliance tracking.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-gcds-color-purple-700" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                A future where all Government of Canada AI initiatives are transparently documented,
                easily discoverable, and fully compliant with federal regulations. Through improved
                visibility and knowledge sharing, we enable departments to learn from each other's
                experiences and serve Canadians more effectively.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-gcds-color-blue-700 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Making AI initiatives visible and accessible across government departments
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-gcds-color-purple-700 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  Tracking adherence to GC policies, privacy laws, and automated decision-making directives
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-gcds-color-blue-700 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Enabling departments to discover and learn from each other's AI initiatives
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Platform Capabilities */}
        <div className="bg-gcds-background-secondary rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Capabilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gcds-color-blue-700 mb-2">
                <Target className="h-12 w-12 mx-auto" />
              </div>
              <div className="font-semibold text-gcds-text-primary mb-1">Project Registry</div>
              <div className="text-sm text-muted-foreground">Comprehensive AI project database</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gcds-color-purple-700 mb-2">
                <Shield className="h-12 w-12 mx-auto" />
              </div>
              <div className="font-semibold text-gcds-text-primary mb-1">Compliance Tracking</div>
              <div className="text-sm text-muted-foreground">ADS, PIB, and policy adherence</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gcds-color-green-700 mb-2">
                <FileSpreadsheet className="h-12 w-12 mx-auto" />
              </div>
              <div className="font-semibold text-gcds-text-primary mb-1">Data Management</div>
              <div className="text-sm text-muted-foreground">Excel import/export functionality</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gcds-color-blue-700 mb-2">
                <Lightbulb className="h-12 w-12 mx-auto" />
              </div>
              <div className="font-semibold text-gcds-text-primary mb-1">AI Assistant</div>
              <div className="text-sm text-muted-foreground">Natural language project search</div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Roadmap</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our journey to make AI more accessible and collaborative across government
            </p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {roadmapItems.map((item) => (
              <Card key={item.quarter} className="hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Rocket className="h-5 w-5 text-gcds-color-blue-700" />
                      {item.quarter}
                    </CardTitle>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.items.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 bg-gcds-color-blue-700 rounded-full mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Get Started */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Get Started</h2>
              <p className="text-muted-foreground mb-6">
                Help build a comprehensive view of AI across the Government of Canada. Submit your department's
                AI projects to increase transparency, enable knowledge sharing, and support responsible AI governance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-gcds-color-blue-700 hover:bg-gcds-color-blue-800" asChild>
                  <Link to="/submit">
                    <Upload className="mr-2 h-4 w-4" />
                    Submit a Project
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/">
                    <Target className="mr-2 h-4 w-4" />
                    Browse Projects
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/resources">
                    <Shield className="mr-2 h-4 w-4" />
                    View Resources
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;