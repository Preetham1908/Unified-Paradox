import { Card } from "@/components/ui/card";
import { Play, Image as ImageIcon } from "lucide-react";
import wildlifeImage from "@/assets/wildlife-conservation.jpg";
import villageImage from "@/assets/village-life.jpg";
import festivalImage from "@/assets/festival-celebration.jpg";
import meditationImage from "@/assets/meditation-space.jpg";

const MediaGallery = () => {
  const mediaItems = [
    {
      type: "video",
      title: "Wildlife Conservation",
      description: "Protecting India's endangered species",
      thumbnail: wildlifeImage,
      duration: "3:45"
    },
    {
      type: "video",
      title: "Village Stories",
      description: "Life in rural India",
      thumbnail: villageImage,
      duration: "5:12"
    },
    {
      type: "image",
      title: "Festival Celebrations",
      description: "Colorful cultural traditions",
      thumbnail: festivalImage
    },
    {
      type: "video",
      title: "Meditation Practices",
      description: "Ancient wellness techniques",
      thumbnail: meditationImage,
      duration: "4:30"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Immersive <span className="gradient-culture text-gradient">Media Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience India through stunning visuals and captivating stories
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {mediaItems.map((item, idx) => (
            <Card 
              key={idx}
              className="group relative overflow-hidden cursor-pointer hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative aspect-video">
                <img 
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                
                {/* Play/Image Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.type === "video" ? (
                      <Play className="w-8 h-8 text-white" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>

                {/* Duration Badge */}
                {item.duration && (
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-sm">
                    {item.duration}
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
