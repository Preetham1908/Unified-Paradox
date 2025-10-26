import { Button } from "@/components/ui/button";
import { Sparkles, Map, Compass } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 gradient-eco rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-40 right-20 w-40 h-40 gradient-spiritual rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 gradient-culture rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 shadow-card">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Discover India's Digital Museum</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="gradient-hero text-gradient">BharatVerse</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experience India's rich ecology, vibrant culture, timeless wisdom, and untold stories through an immersive AI-powered journey
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 backdrop-blur-sm">
              <Map className="w-5 h-5 text-primary" />
              <span>Interactive 3D Map</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 backdrop-blur-sm">
              <Compass className="w-5 h-5 text-secondary" />
              <span>AI Voice Guide</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-accent" />
              <span>AR & VR Ready</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="hero" size="lg" onClick={() => scrollToSection("realms")} className="text-lg">
              Explore the Realms
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection("features")} className="text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Unique Realms</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-secondary">1000+</div>
              <div className="text-sm text-muted-foreground">Species</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-accent">5000+</div>
              <div className="text-sm text-muted-foreground">Stories</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold gradient-culture text-gradient">36</div>
              <div className="text-sm text-muted-foreground">States & UTs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;