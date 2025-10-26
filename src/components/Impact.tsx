import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, GraduationCap, Globe2, Sparkles } from "lucide-react";

const Impact = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const impacts = [
    {
      icon: Heart,
      title: "Cultural Preservation",
      description: "Digitally archive and celebrate India's disappearing art forms, traditions, and languages for future generations.",
      stat: "500+",
      statLabel: "Art Forms Documented"
    },
    {
      icon: GraduationCap,
      title: "Educational Impact",
      description: "Empower students and educators with immersive, engaging content about India's ecology and heritage.",
      stat: "1M+",
      statLabel: "Students Reached"
    },
    {
      icon: Globe2,
      title: "Global Reach",
      description: "Share India's wisdom and diversity with the world through accessible, modern digital experiences.",
      stat: "150+",
      statLabel: "Countries"
    },
    {
      icon: Sparkles,
      title: "Social Inclusion",
      description: "Amplify voices from rural and indigenous communities, creating a truly representative digital India.",
      stat: "10K+",
      statLabel: "Community Stories"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Making a <span className="gradient-hero text-gradient">Real Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            BharatVerse is more than a digital museum - it's a movement to preserve, celebrate, and share India's incredible heritage
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <Card 
                key={impact.title}
                className="p-8 bg-card border-0 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0 shadow-glow">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-2xl font-bold">{impact.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{impact.description}</p>
                    <div className="pt-2">
                      <div className="text-3xl font-bold gradient-hero text-gradient">{impact.stat}</div>
                      <div className="text-sm text-muted-foreground">{impact.statLabel}</div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto space-y-6 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
          <h3 className="text-3xl font-bold">Join the Journey</h3>
          <p className="text-lg text-muted-foreground">
            Be part of India's digital heritage revolution. Explore, learn, and contribute to preserving our incredible diversity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="hero" size="lg" onClick={() => scrollToSection("realms")}>
              Start Exploring
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection("features")}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;