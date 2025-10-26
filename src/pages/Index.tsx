import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Realms from "@/components/Realms";
import Features from "@/components/Features";
import Impact from "@/components/Impact";
import Footer from "@/components/Footer";
import AIGuide from "@/components/AIGuide";
import InteractiveMap from "@/components/InteractiveMap";
import MediaGallery from "@/components/MediaGallery";
import InteractiveExperiences from "@/components/InteractiveExperiences";
import Map3D from "@/components/Map3D";
import LiveDashboard from "@/components/LiveDashboard";
import EcosystemGame from "@/components/EcosystemGame";
import StorySharing from "@/components/StorySharing";
import WisdomLibrary from "@/components/WisdomLibrary";
import ARVRExperiences from "@/components/ARVRExperiences";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <section id="realms">
        <Realms />
      </section>
      <Map3D />
      <InteractiveMap />
      <LiveDashboard />
      <section id="features">
        <Features />
      </section>
      <EcosystemGame />
      <MediaGallery />
      <ARVRExperiences />
      <InteractiveExperiences />
      <StorySharing />
      <WisdomLibrary />
      <section id="impact">
        <Impact />
      </section>
      <Footer />
      <AIGuide />
    </div>
  );
};

export default Index;