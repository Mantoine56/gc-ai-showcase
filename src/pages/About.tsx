import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, Users, Rocket, GitBranch, Shield } from 'lucide-react';

const About = () => {
  const roadmapItems = [
    {
      quarter: "Q1 2025",
      status: "In Progress",
      items: [
        "Enhanced search with AI-powered recommendations",
        "Integration with GC Kubernetes clusters",
        "Automated security scanning for all projects"
      ]
    },
    {
      quarter: "Q2 2025", 
      status: "Planned",
      items: [
        "Real-time collaboration features",
        "Integration with GCcode.ca",
        "Advanced analytics and usage metrics"
      ]
    },
    {
      quarter: "Q3 2025",
      status: "Planned", 
      items: [
        "Mobile application for iOS and Android",
        "API marketplace for government services",
        "Cross-department project collaboration tools"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Planned':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About GC AI Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fostering innovation and collaboration across Government of Canada through 
            shared AI initiatives and open-source solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To create a centralized platform where Government of Canada departments can 
                discover, share, and collaborate on AI initiatives. We aim to reduce duplication, 
                accelerate innovation, and ensure responsible AI development across government.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-secondary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                A future where AI solutions developed by one department can be easily adapted 
                and reused by others, creating a ecosystem of innovation that serves Canadians 
                more effectively and efficiently.
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
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Open Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Fostering cross-departmental collaboration and knowledge sharing
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Security First</h3>
                <p className="text-sm text-muted-foreground">
                  Ensuring all solutions meet GC security and privacy standards
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <GitBranch className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Open Source</h3>
                <p className="text-sm text-muted-foreground">
                  Promoting transparency and reusability through open-source development
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-muted/30 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">8</div>
              <div className="text-sm text-muted-foreground">Participating Departments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Government Contributors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">50k+</div>
              <div className="text-sm text-muted-foreground">Lines of Shared Code</div>
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
                      <Rocket className="h-5 w-5 text-primary" />
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
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Get Involved */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
              <p className="text-muted-foreground mb-6">
                Join our community of innovators and help shape the future of AI in government. 
                Whether you're a developer, data scientist, or policy expert, there's a place for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg">
                  Join Our Slack
                </Button>
                <Button variant="outline" size="lg">
                  Contribute on GitHub
                </Button>
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;