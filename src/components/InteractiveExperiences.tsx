import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Heart, BookOpen, Sparkles } from "lucide-react";
import meditationImage from "@/assets/meditation-space.jpg";

const InteractiveExperiences = () => {
  const experiences = [
    {
      icon: Gamepad2,
      title: "Ecosystem Balance Game",
      description: "Learn about food chains and biodiversity through an interactive game",
      gradient: "gradient-eco",
      action: "Play Now"
    },
    {
      icon: Heart,
      title: "Meditation Space",
      description: "Experience guided meditation on the 5 Tatvas (elements)",
      gradient: "gradient-spiritual",
      action: "Begin Journey"
    },
    {
      icon: BookOpen,
      title: "Story Wall",
      description: "Share and explore stories from India's villages and communities",
      gradient: "gradient-stories",
      action: "Explore Stories"
    },
    {
      icon: Sparkles,
      title: "AR Cultural Try-On",
      description: "Try traditional Indian attire using augmented reality",
      gradient: "gradient-culture",
      action: "Try Now"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Interactive <span className="gradient-hero text-gradient">Experiences</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engage with India's heritage through immersive activities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {experiences.map((exp, idx) => (
            <Card 
              key={idx}
              className="p-8 hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className={`w-16 h-16 rounded-2xl ${exp.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <exp.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{exp.title}</h3>
              <p className="text-muted-foreground mb-6">{exp.description}</p>
              <Button variant="outline" className="group-hover:border-primary group-hover:text-primary transition-colors">
                {exp.action}
              </Button>
            </Card>
          ))}
        </div>

        {/* Featured: Meditation Experience */}
        <Card className="relative overflow-hidden max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 w-fit">
                <Sparkles className="w-4 h-4" />
                Featured Experience
              </div>
              <h3 className="text-3xl font-bold mb-4">Virtual Meditation Sanctuary</h3>
              <p className="text-muted-foreground mb-6">
                Enter a peaceful digital space designed for mindfulness practice. Experience guided meditations on the 5 Tatvas - Earth, Water, Fire, Air, and Space.
              </p>
              <Button variant="hero" size="lg" className="w-fit">
                Enter Sanctuary
              </Button>
            </div>
            <div className="relative h-64 md:h-auto">
              <img 
                src={meditationImage}
                alt="Meditation sanctuary"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent md:from-transparent" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default InteractiveExperiences;
