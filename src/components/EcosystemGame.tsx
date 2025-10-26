import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Leaf, Bird, Fish, Bug, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EcosystemState {
  plants: number;
  herbivores: number;
  carnivores: number;
  decomposers: number;
}

const EcosystemGame = () => {
  const { toast } = useToast();
  const [ecosystem, setEcosystem] = useState<EcosystemState>({
    plants: 50,
    herbivores: 30,
    carnivores: 15,
    decomposers: 20
  });
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const calculateBalance = () => {
    const total = ecosystem.plants + ecosystem.herbivores + ecosystem.carnivores + ecosystem.decomposers;
    const idealRatio = {
      plants: 0.45,
      herbivores: 0.30,
      carnivores: 0.15,
      decomposers: 0.10
    };

    const plantRatio = ecosystem.plants / total;
    const herbRatio = ecosystem.herbivores / total;
    const carnRatio = ecosystem.carnivores / total;
    const decompRatio = ecosystem.decomposers / total;

    const balance = 100 - (
      Math.abs(plantRatio - idealRatio.plants) * 100 +
      Math.abs(herbRatio - idealRatio.herbivores) * 100 +
      Math.abs(carnRatio - idealRatio.carnivores) * 100 +
      Math.abs(decompRatio - idealRatio.decomposers) * 100
    ) * 1.5;

    return Math.max(0, Math.round(balance));
  };

  const checkEcosystem = () => {
    const balance = calculateBalance();
    setScore(score + balance);
    
    if (balance >= 80) {
      toast({
        title: "Excellent Balance! 🌿",
        description: `Perfect ecosystem! +${balance} points. Moving to round ${round + 1}`,
      });
      setRound(round + 1);
      // Add some variation for next round
      setEcosystem({
        plants: 45 + Math.random() * 10,
        herbivores: 25 + Math.random() * 10,
        carnivores: 10 + Math.random() * 10,
        decomposers: 15 + Math.random() * 10
      });
    } else if (balance >= 60) {
      toast({
        title: "Good Balance 👍",
        description: `Nice work! +${balance} points. Try to improve further.`,
      });
    } else {
      toast({
        title: "Imbalanced Ecosystem ⚠️",
        description: `The ecosystem is struggling. Adjust the populations.`,
        variant: "destructive"
      });
    }
  };

  const balance = calculateBalance();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ecosystem <span className="gradient-eco text-gradient">Balance Game</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about food chains and biodiversity by balancing an ecosystem
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-8">
          {/* Score Display */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm text-muted-foreground">Round {round}</p>
              <p className="text-3xl font-bold">{score} Points</p>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className={`text-2xl font-bold ${
                  balance >= 80 ? 'text-green-500' :
                  balance >= 60 ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {balance}%
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6 mb-8">
            {/* Plants */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Plants (Producers)</span>
                </div>
                <span className="text-2xl font-bold">{Math.round(ecosystem.plants)}</span>
              </div>
              <Slider
                value={[ecosystem.plants]}
                onValueChange={([value]) => setEcosystem({...ecosystem, plants: value})}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Herbivores */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bird className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Herbivores (Primary Consumers)</span>
                </div>
                <span className="text-2xl font-bold">{Math.round(ecosystem.herbivores)}</span>
              </div>
              <Slider
                value={[ecosystem.herbivores]}
                onValueChange={([value]) => setEcosystem({...ecosystem, herbivores: value})}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Carnivores */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Fish className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Carnivores (Secondary Consumers)</span>
                </div>
                <span className="text-2xl font-bold">{Math.round(ecosystem.carnivores)}</span>
              </div>
              <Slider
                value={[ecosystem.carnivores]}
                onValueChange={([value]) => setEcosystem({...ecosystem, carnivores: value})}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Decomposers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bug className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Decomposers</span>
                </div>
                <span className="text-2xl font-bold">{Math.round(ecosystem.decomposers)}</span>
              </div>
              <Slider
                value={[ecosystem.decomposers]}
                onValueChange={([value]) => setEcosystem({...ecosystem, decomposers: value})}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={checkEcosystem}
            variant="hero"
            size="lg"
            className="w-full text-lg"
          >
            Check Ecosystem Balance
          </Button>

          {/* Info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Goal:</strong> Create a balanced ecosystem! Plants need to be abundant, followed by herbivores, 
              then carnivores, with decomposers completing the cycle. Aim for 80%+ balance to advance!
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default EcosystemGame;
