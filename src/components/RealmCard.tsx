import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface RealmCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  realmId: string;
}

const RealmCard = ({ title, subtitle, description, image, icon: Icon, gradient, features, realmId }: RealmCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card border-0 shadow-elevated hover:shadow-glow transition-all duration-500 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 ${gradient} opacity-40 mix-blend-overlay`} />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Icon Badge */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-card">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div>
          <div className="text-sm font-medium text-muted-foreground mb-1">{subtitle}</div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link to={`/realm/${realmId}`}>
          <Button variant="ghost" className="w-full group/btn justify-between mt-4">
            <span>Explore {title}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default RealmCard;