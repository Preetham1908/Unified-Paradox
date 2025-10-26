import { Card } from "@/components/ui/card";
import { MapPin, Info } from "lucide-react";
import indiaMap from "@/assets/india-map.jpg";

const InteractiveMap = () => {
  const states = [
    { name: "Himalayas", top: "15%", left: "40%", description: "Snow leopards, red pandas" },
    { name: "Western Ghats", top: "55%", left: "20%", description: "Endemic biodiversity hotspot" },
    { name: "Sundarbans", top: "35%", left: "75%", description: "Royal Bengal tigers" },
    { name: "Thar Desert", top: "35%", left: "25%", description: "Desert wildlife ecosystem" },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore India's <span className="gradient-eco text-gradient">Biodiversity Map</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover wildlife, ecosystems, and conservation efforts across different regions
          </p>
        </div>

        <Card className="relative overflow-hidden max-w-5xl mx-auto">
          <img 
            src={indiaMap} 
            alt="Interactive map of India" 
            className="w-full h-auto"
          />
          
          {states.map((state, idx) => (
            <div
              key={idx}
              className="absolute group cursor-pointer animate-pulse-slow"
              style={{ top: state.top, left: state.left }}
            >
              <div className="relative">
                <MapPin className="w-8 h-8 text-primary drop-shadow-lg" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <Card className="p-3 whitespace-nowrap shadow-elegant bg-card/95 backdrop-blur-sm">
                    <p className="font-bold text-sm">{state.name}</p>
                    <p className="text-xs text-muted-foreground">{state.description}</p>
                  </Card>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-card">
            <div className="flex items-center gap-2 text-sm">
              <Info className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Hover over pins to explore</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default InteractiveMap;
