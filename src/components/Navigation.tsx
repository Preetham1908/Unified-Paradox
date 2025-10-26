import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold gradient-hero text-gradient">
            BharatVerse
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("realms")} className="text-foreground hover:text-primary transition-colors">
              Realms
            </button>
            <button onClick={() => scrollToSection("features")} className="text-foreground hover:text-primary transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection("impact")} className="text-foreground hover:text-primary transition-colors">
              Impact
            </button>
            <Button variant="hero" size="sm" onClick={() => scrollToSection("realms")}>
              Start Exploring
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-4 animate-fade-in">
            <button
              onClick={() => scrollToSection("realms")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Realms
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Impact
            </button>
            <Button variant="hero" size="sm" onClick={() => scrollToSection("realms")} className="w-full">
              Start Exploring
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
