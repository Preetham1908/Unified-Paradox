import { Card } from "@/components/ui/card";
import { 
  Globe, 
  Mic, 
  Glasses, 
  Gamepad2, 
  Database, 
  BookOpen,
  Map,
  Share2,
  Brain
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Globe,
      title: "3D Virtual Map",
      description: "Navigate India's geography in stunning 3D. Zoom into states, regions, and ecosystems.",
      color: "text-primary"
    },
    {
      icon: Mic,
      title: "AI Voice Guide",
      description: "Multilingual AI assistant narrates stories in English, Hindi, Kannada, and more.",
      color: "text-secondary"
    },
    {
      icon: Glasses,
      title: "AR Experiences",
      description: "Try on traditional attire, visualize festivals, and interact with cultural elements.",
      color: "text-accent"
    },
    {
      icon: Gamepad2,
      title: "Interactive Games",
      description: "Learn through play - balance ecosystems, solve cultural puzzles, explore history.",
      color: "text-primary"
    },
    {
      icon: Database,
      title: "Live Data Dashboards",
      description: "Real-time environmental metrics, cultural events, and biodiversity information.",
      color: "text-secondary"
    },
    {
      icon: BookOpen,
      title: "Educational Mode",
      description: "Curated content for schools, students, and curious minds of all ages.",
      color: "text-accent"
    },
    {
      icon: Map,
      title: "VR Compatibility",
      description: "Fully immersive experiences with VR headset support for deep exploration.",
      color: "text-primary"
    },
    {
      icon: Share2,
      title: "Story Sharing",
      description: "Upload and share your own stories, photos, and experiences from across India.",
      color: "text-secondary"
    },
    {
      icon: Brain,
      title: "Wisdom Library",
      description: "Access ancient texts, philosophical teachings, and wellness practices digitally.",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Powered by <span className="gradient-hero text-gradient">Advanced Technology</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Cutting-edge features that make learning about India engaging, accessible, and unforgettable
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="p-6 bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;