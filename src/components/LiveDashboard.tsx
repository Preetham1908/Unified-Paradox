import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { Leaf, Droplets, Wind, AlertTriangle } from 'lucide-react';

interface EnvironmentalData {
  id: string;
  location: string;
  state: string;
  air_quality_index: number;
  temperature: number;
  humidity: number;
  forest_cover_percentage: number;
  wildlife_count: number;
  endangered_species: string[];
}

const LiveDashboard = () => {
  const [envData, setEnvData] = useState<EnvironmentalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('environmental-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'environmental_data'
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('environmental_data')
      .select('*')
      .order('location');

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setEnvData(data || []);
    }
    setIsLoading(false);
  };

  const chartData = envData.map(d => ({
    name: d.location.split(' ')[0],
    AQI: d.air_quality_index,
    Temp: d.temperature,
    Forest: d.forest_cover_percentage,
    Wildlife: d.wildlife_count / 10
  }));

  const stats = [
    {
      icon: Leaf,
      label: 'Avg Forest Cover',
      value: `${(envData.reduce((acc, d) => acc + Number(d.forest_cover_percentage), 0) / envData.length || 0).toFixed(1)}%`,
      gradient: 'gradient-eco'
    },
    {
      icon: Wind,
      label: 'Avg Air Quality',
      value: Math.round(envData.reduce((acc, d) => acc + d.air_quality_index, 0) / envData.length || 0),
      gradient: 'gradient-culture'
    },
    {
      icon: Droplets,
      label: 'Avg Temperature',
      value: `${(envData.reduce((acc, d) => acc + Number(d.temperature), 0) / envData.length || 0).toFixed(1)}°C`,
      gradient: 'gradient-spiritual'
    },
    {
      icon: AlertTriangle,
      label: 'Endangered Species',
      value: new Set(envData.flatMap(d => d.endangered_species)).size,
      gradient: 'gradient-stories'
    }
  ];

  if (isLoading) {
    return (
      <div className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-pulse">Loading live data...</div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Live Data
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real-Time <span className="gradient-hero text-gradient">Environmental Dashboard</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Live environmental metrics, biodiversity information, and conservation data
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-6 hover:shadow-elegant transition-shadow">
              <div className={`w-12 h-12 rounded-xl ${stat.gradient} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Environmental Metrics by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="AQI" fill="#22c55e" name="Air Quality Index" />
                <Bar dataKey="Forest" fill="#8b5cf6" name="Forest Cover %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Wildlife & Temperature Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Wildlife" stroke="#3b82f6" name="Wildlife (×10)" strokeWidth={2} />
                <Line type="monotone" dataKey="Temp" stroke="#f59e0b" name="Temperature °C" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Detailed Location Data */}
        <div className="grid md:grid-cols-2 gap-6">
          {envData.map((location) => (
            <Card key={location.id} className="p-6 hover:shadow-elegant transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{location.location}</h3>
                  <p className="text-sm text-muted-foreground">{location.state}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  location.air_quality_index < 50 ? 'bg-green-500/20 text-green-500' :
                  location.air_quality_index < 100 ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  AQI: {location.air_quality_index}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="text-lg font-semibold">{location.temperature}°C</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="text-lg font-semibold">{location.humidity}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Forest Cover</p>
                  <p className="text-lg font-semibold">{location.forest_cover_percentage}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wildlife</p>
                  <p className="text-lg font-semibold">{location.wildlife_count}</p>
                </div>
              </div>

              {location.endangered_species.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Endangered Species:</p>
                  <div className="flex flex-wrap gap-2">
                    {location.endangered_species.map((species, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {species}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveDashboard;
