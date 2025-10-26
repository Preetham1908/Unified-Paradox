import RealmCard from "./RealmCard";
import { Leaf, Palette, Users, Sparkles } from "lucide-react";
import ecoImage from "@/assets/eco-realm.jpg";
import cultureImage from "@/assets/culture-realm.jpg";
import storiesImage from "@/assets/stories-realm.jpg";
import spiritualImage from "@/assets/spiritual-realm.jpg";

const Realms = () => {
  const realms = [
    {
      title: "EcoVerse",
      subtitle: "India's Living Ecosystem",
      description: "Explore India's breathtaking biodiversity, from the Himalayas to coastal mangroves. Discover endangered species, environmental challenges, and conservation efforts.",
      image: ecoImage,
      icon: Leaf,
      gradient: "gradient-eco",
      realmId: "ecoverse",
      features: [
        "Interactive wildlife encyclopedia",
        "Live environmental data",
        "Ecosystem balance games",
        "Conservation initiatives"
      ]
    },
    {
      title: "SanskritiSphere",
      subtitle: "Cultural Heritage & Arts",
      description: "Immerse yourself in India's rich cultural tapestry. Experience festivals, classical arts, traditional crafts, and architectural marvels across centuries.",
      image: cultureImage,
      icon: Palette,
      gradient: "gradient-culture",
      realmId: "sanskriti",
      features: [
        "AR festival experiences",
        "Virtual heritage tours",
        "Traditional art forms",
        "Cultural calendar"
      ]
    },
    {
      title: "LokVaani",
      subtitle: "Voices of Rural India",
      description: "Listen to untold stories from India's villages and tribal communities. Celebrate indigenous knowledge, oral traditions, and grassroots innovation.",
      image: storiesImage,
      icon: Users,
      gradient: "gradient-stories",
      realmId: "lokvaani",
      features: [
        "Community story wall",
        "Tribal art & craft",
        "Folk music archive",
        "Indigenous wisdom"
      ]
    },
    {
      title: "TatvaVerse",
      subtitle: "Philosophy & Wellness",
      description: "Journey through India's ancient wisdom systems. Explore yoga, meditation, Ayurveda, and philosophical teachings adapted for modern living.",
      image: spiritualImage,
      icon: Sparkles,
      gradient: "gradient-spiritual",
      realmId: "tatvaverse",
      features: [
        "Guided meditation spaces",
        "Yoga & wellness programs",
        "Philosophical teachings",
        "Mindfulness practices"
      ]
    }
  ];

  return (
    <section id="realms" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Explore Four Unique <span className="gradient-hero text-gradient">Realms</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Each realm offers an immersive journey into different aspects of India's incredible diversity
          </p>
        </div>

        {/* Realm Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {realms.map((realm, index) => (
            <div 
              key={realm.title}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RealmCard {...realm} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Realms;