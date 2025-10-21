import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-ai-hub.jpg';

interface HeroProps {
  onSearchFocus: () => void;
}

const Hero = ({ onSearchFocus }: HeroProps) => {
  return (
    <section className="relative py-8 md:py-12 overflow-hidden" role="banner">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img 
          src={heroImage} 
          alt="" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gcds-background-secondary" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gcds-background-accent text-gcds-text-primary px-3 py-1 rounded-md text-sm font-medium mb-4" role="status" aria-label="Government of Canada AI Innovation badge">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Government of Canada AI Innovation
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gcds-text-primary">
            GC AI Hub: Share, Learn, Re-use
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gcds-text-secondary max-w-3xl mx-auto mb-6 leading-relaxed">
            Discover and collaborate on AI initiatives across Government of Canada departments. 
            From proof-of-concepts to production systems, explore what's possible.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mb-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gcds-color-blue-700 mb-1">15+</div>
              <div className="text-sm text-gcds-text-secondary">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gcds-color-blue-700 mb-1">8</div>
              <div className="text-sm text-gcds-text-secondary">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gcds-color-blue-700 mb-1">100%</div>
              <div className="text-sm text-gcds-text-secondary">Open Source</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              size="lg" 
              className="min-w-[180px] h-11 text-base font-medium bg-gcds-button-primary-default-background text-gcds-button-primary-default-text hover:bg-gcds-button-primary-hover-background focus:ring-2 focus:ring-gcds-focus-border"
              onClick={onSearchFocus}
              aria-label="Search and explore AI projects"
            >
              <Search className="mr-2 h-4 w-4" aria-hidden="true" />
              Explore Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="min-w-[180px] h-11 text-base font-medium border-gcds-border-primary text-gcds-text-primary hover:bg-gcds-background-accent focus:ring-2 focus:ring-gcds-focus-border"
              aria-label="Get started with the GC AI Hub"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;