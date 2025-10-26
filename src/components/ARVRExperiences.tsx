import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Glasses, Smartphone, Sparkles, Play } from 'lucide-react';

const ARVRExperiences = () => {
  const experiences = [
    {
      title: "Virtual Heritage Tour",
      description: "Explore Taj Mahal, ancient temples, and historical monuments in immersive VR",
      type: "VR",
      gradient: "gradient-culture",
      features: ["360° Views", "Guided Narration", "Historical Context"]
    },
    {
      title: "Traditional Attire Try-On",
      description: "Try traditional Indian clothing from different states using AR",
      type: "AR",
      gradient: "gradient-stories",
      features: ["Real-time Mirror", "35+ Outfits", "Photo Export"]
    },
    {
      title: "Wildlife Safari",
      description: "Virtual safari through Indian forests and wildlife sanctuaries",
      type: "VR",
      gradient: "gradient-eco",
      features: ["Wildlife Encounters", "Ecosystem Info", "Conservation Lessons"]
    },
    {
      title: "Festival Celebration",
      description: "Experience Indian festivals with AR overlays and effects",
      type: "AR",
      gradient: "gradient-culture",
      features: ["Interactive Elements", "Cultural Info", "Share Moments"]
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AR & VR Ready
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Immersive <span className="gradient-hero text-gradient">AR & VR Experiences</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step into India's heritage with cutting-edge augmented and virtual reality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {experiences.map((exp, idx) => (
            <Card key={idx} className="p-8 hover:shadow-elegant transition-all hover:scale-[1.02] group">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 rounded-2xl ${exp.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {exp.type === 'VR' ? (
                    <Glasses className="w-8 h-8 text-white" />
                  ) : (
                    <Smartphone className="w-8 h-8 text-white" />
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${exp.gradient} text-white`}>
                  {exp.type}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3">{exp.title}</h3>
              <p className="text-muted-foreground mb-6">{exp.description}</p>

              <div className="space-y-2 mb-6">
                {exp.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary">
                <Play className="w-4 h-4 mr-2" />
                Launch Experience
              </Button>
            </Card>
          ))}
        </div>

        {/* Device Support Info */}
        <Card className="max-w-4xl mx-auto p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Supported Devices</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="w-12 h-12 rounded-xl gradient-eco flex items-center justify-center mx-auto mb-3">
                  <Glasses className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold mb-2">VR Headsets</h4>
                <p className="text-sm text-muted-foreground">
                  Meta Quest, HTC Vive, PlayStation VR, and WebXR compatible browsers
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl gradient-culture flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold mb-2">AR Devices</h4>
                <p className="text-sm text-muted-foreground">
                  iOS 12+, Android 7+ with ARCore support, and modern web browsers
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ARVRExperiences;
