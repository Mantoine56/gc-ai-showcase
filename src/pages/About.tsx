import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, Users, Rocket, Shield, FileSpreadsheet, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation(['pages', 'enums']);

  const roadmapItems = [
    {
      quarter: t('about.roadmap.phase1.title'),
      status: 'complete',
      items: [
        t('about.roadmap.phase1.item1'),
        t('about.roadmap.phase1.item2'),
        t('about.roadmap.phase1.item3'),
        t('about.roadmap.phase1.item4'),
        t('about.roadmap.phase1.item5')
      ]
    },
    {
      quarter: t('about.roadmap.phase2.title'),
      status: 'planned',
      items: [
        t('about.roadmap.phase2.item1'),
        t('about.roadmap.phase2.item2'),
        t('about.roadmap.phase2.item3'),
        t('about.roadmap.phase2.item4'),
        t('about.roadmap.phase2.item5')
      ]
    },
    {
      quarter: t('about.roadmap.phase3.title'),
      status: 'planned',
      items: [
        t('about.roadmap.phase3.item1'),
        t('about.roadmap.phase3.item2'),
        t('about.roadmap.phase3.item3'),
        t('about.roadmap.phase3.item4'),
        t('about.roadmap.phase3.item5')
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-gcds-color-green-100 text-gcds-color-green-900';
      case 'inProgress':
        return 'bg-gcds-color-blue-100 text-gcds-color-blue-900';
      case 'planned':
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
            {t('about.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-gcds-color-blue-700" />
                {t('about.mission.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.mission.description')}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-gcds-color-purple-700" />
                {t('about.vision.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.vision.description')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t('about.principles.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-gcds-color-blue-700 mx-auto mb-4" />
                <h3 className="font-bold mb-2">{t('about.principles.transparency.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('about.principles.transparency.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-gcds-color-purple-700 mx-auto mb-4" />
                <h3 className="font-bold mb-2">{t('about.principles.compliance.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('about.principles.compliance.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-gcds-color-blue-700 mx-auto mb-4" />
                <h3 className="font-bold mb-2">{t('about.principles.collaboration.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('about.principles.collaboration.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Platform Capabilities */}
        <div className="bg-gcds-background-secondary rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t('about.capabilities.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gcds-color-blue-700 mb-2">
                <Target className="h-12 w-12 mx-auto" />
              </div>
              <div className="font-semibold text-gcds-text-primary mb-1">{t('about.capabilities.registry.title')}</div>
              <div className="text-sm text-muted-foreground">{t('about.capabilities.registry.description')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gcds-color-purple-700 mb-2">
                <Shield className="h-12 w-12 mx-auto" />
              </div>
              <div className="font-semibold text-gcds-text-primary mb-1">{t('about.capabilities.compliance.title')}</div>
              <div className="text-sm text-muted-foreground">{t('about.capabilities.compliance.description')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gcds-color-green-700 mb-2">
                <FileSpreadsheet className="h-12 w-12 mx-auto" />
              </div>
              <div className="font-semibold text-gcds-text-primary mb-1">{t('about.capabilities.dataManagement.title')}</div>
              <div className="text-sm text-muted-foreground">{t('about.capabilities.dataManagement.description')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gcds-color-blue-700 mb-2">
                <Lightbulb className="h-12 w-12 mx-auto" />
              </div>
              <div className="font-semibold text-gcds-text-primary mb-1">{t('about.capabilities.aiAssistant.title')}</div>
              <div className="text-sm text-muted-foreground">{t('about.capabilities.aiAssistant.description')}</div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{t('about.roadmap.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('about.roadmap.description')}
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
                      {t(`enums.status.${item.status}`)}
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
              <h2 className="text-2xl font-bold mb-4">{t('about.getStarted.title')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('about.getStarted.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-gcds-color-blue-700 hover:bg-gcds-color-blue-800" asChild>
                  <Link to="/submit">
                    <Upload className="mr-2 h-4 w-4" />
                    {t('about.getStarted.submitButton')}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/">
                    <Target className="mr-2 h-4 w-4" />
                    {t('about.getStarted.browseButton')}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/resources">
                    <Shield className="mr-2 h-4 w-4" />
                    {t('about.getStarted.resourcesButton')}
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