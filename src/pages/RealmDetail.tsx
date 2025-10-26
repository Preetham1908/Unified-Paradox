import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Leaf, Palette, Users, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ecoImage from "@/assets/eco-realm.jpg";
import cultureImage from "@/assets/culture-realm.jpg";
import storiesImage from "@/assets/stories-realm.jpg";
import spiritualImage from "@/assets/spiritual-realm.jpg";

const RealmDetail = () => {
  const { realmId } = useParams();

  const realmsData: Record<string, any> = {
    ecoverse: {
      title: "EcoVerse",
      subtitle: "India's Living Ecosystem",
      description: "Explore India's breathtaking biodiversity, from the Himalayas to coastal mangroves. Discover endangered species, environmental challenges, and conservation efforts.",
      image: ecoImage,
      icon: Leaf,
      gradient: "gradient-eco",
      details: "Dive deep into India's diverse ecosystems - from the snow-capped Himalayas to tropical rainforests, from vast deserts to vibrant coral reefs. Learn about endangered species like the Bengal Tiger, Asiatic Lion, and Indian Elephant. Understand environmental challenges and discover how you can contribute to conservation efforts.",
      features: [
        "Interactive wildlife encyclopedia with 3D models",
        "Live environmental data from across India",
        "Ecosystem balance simulation games",
        "Connect with conservation initiatives",
        "Virtual nature tours with 360° views",
        "Track endangered species populations"
      ]
    },
    sanskriti: {
      title: "SanskritiSphere",
      subtitle: "Cultural Heritage & Arts",
      description: "Immerse yourself in India's rich cultural tapestry. Experience festivals, classical arts, traditional crafts, and architectural marvels across centuries.",
      image: cultureImage,
      icon: Palette,
      gradient: "gradient-culture",
      details: "Experience the vibrant colors and sounds of India's cultural heritage. From ancient classical dance forms to traditional crafts passed down through generations. Explore architectural wonders like the Taj Mahal, Hampi ruins, and ancient temples. Witness festivals through AR experiences.",
      features: [
        "AR festival experiences - celebrate virtually",
        "Virtual heritage tours with expert guides",
        "Learn traditional art forms interactively",
        "Cultural calendar with upcoming events",
        "Craft workshops with master artisans",
        "Architecture exploration in 3D"
      ]
    },
    lokvaani: {
      title: "LokVaani",
      subtitle: "Voices of Rural India",
      description: "Listen to untold stories from India's villages and tribal communities. Celebrate indigenous knowledge, oral traditions, and grassroots innovation.",
      image: storiesImage,
      icon: Users,
      gradient: "gradient-stories",
      details: "Amplify the voices often unheard. Discover stories from remote villages, tribal wisdom passed through oral traditions, and grassroots innovations solving real problems. Connect with indigenous communities and learn about their sustainable living practices.",
      features: [
        "Community story wall - share and listen",
        "Tribal art & craft marketplace",
        "Folk music archive with recordings",
        "Indigenous wisdom knowledge base",
        "Connect with rural communities",
        "Support grassroots innovations"
      ]
    },
    tatvaverse: {
      title: "TatvaVerse",
      subtitle: "Philosophy & Wellness",
      description: "Journey through India's ancient wisdom systems. Explore yoga, meditation, Ayurveda, and philosophical teachings adapted for modern living.",
      image: spiritualImage,
      icon: Sparkles,
      gradient: "gradient-spiritual",
      details: "Experience the profound wisdom of ancient Indian philosophy adapted for modern life. Practice yoga and meditation in virtual sacred spaces. Learn Ayurvedic principles for holistic health. Explore philosophical texts with modern interpretations.",
      features: [
        "Guided meditation in virtual spaces",
        "Personalized yoga & wellness programs",
        "Philosophical teachings made accessible",
        "Daily mindfulness practices",
        "Ayurveda consultations and tips",
        "Connect with wellness experts"
      ]
    }
  };

  const realm = realmId ? realmsData[realmId] : null;

  if (!realm) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Realm not found</h1>
          <Link to="/">
            <Button variant="hero">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = realm.icon;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-background -z-10" />
        
        <div className="container mx-auto">
          <Link to="/">
            <Button variant="outline" size="sm" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6 animate-fade-in">
              <div className={`w-20 h-20 rounded-2xl ${realm.gradient} flex items-center justify-center shadow-glow`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">{realm.title}</h1>
                <p className="text-2xl text-muted-foreground mb-6">{realm.subtitle}</p>
                <p className="text-lg leading-relaxed">{realm.details}</p>
              </div>
              <Button variant="hero" size="lg">
                Start Exploring
              </Button>
            </div>

            <div className="animate-scale-in">
              <img
                src={realm.image}
                alt={realm.title}
                className="rounded-2xl shadow-elevated w-full aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            What You'll Discover
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {realm.features.map((feature: string, index: number) => (
              <Card
                key={index}
                className="p-6 bg-card border-0 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-2 rounded-full ${realm.gradient} mt-2 flex-shrink-0`} />
                  <p className="text-lg leading-relaxed">{feature}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Begin Your Journey?</h2>
            <p className="text-lg text-muted-foreground">
              Immerse yourself in this realm and discover a new perspective on India's incredible diversity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="hero" size="lg">
                Launch Experience
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Explore Other Realms
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealmDetail;
