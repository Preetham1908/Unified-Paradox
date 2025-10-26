import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Book, Clock, Search, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WisdomContent {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty_level: string;
  duration_minutes: number;
  tags: string[];
}

const WisdomLibrary = () => {
  const [content, setContent] = useState<WisdomContent[]>([]);
  const [filteredContent, setFilteredContent] = useState<WisdomContent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    filterContent();
  }, [searchTerm, selectedCategory, content]);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('wisdom_content')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching content:', error);
    } else {
      setContent(data || []);
      setFilteredContent(data || []);
    }
  };

  const filterContent = () => {
    let filtered = content;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredContent(filtered);
  };

  const categories = [
    { value: 'all', label: 'All', gradient: 'gradient-hero' },
    { value: 'yoga', label: 'Yoga', gradient: 'gradient-spiritual' },
    { value: 'meditation', label: 'Meditation', gradient: 'gradient-spiritual' },
    { value: 'ayurveda', label: 'Ayurveda', gradient: 'gradient-eco' },
    { value: 'philosophy', label: 'Philosophy', gradient: 'gradient-culture' },
    { value: 'texts', label: 'Ancient Texts', gradient: 'gradient-stories' }
  ];

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-500';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-500';
      case 'advanced': return 'bg-red-500/20 text-red-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Wisdom <span className="gradient-spiritual text-gradient">Library</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access ancient texts, philosophical teachings, and wellness practices digitally
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search wisdom content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 max-w-4xl mx-auto">
            {categories.map(cat => (
              <TabsTrigger key={cat.value} value={cat.value}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-elegant transition-all hover:scale-[1.02]">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl gradient-${item.category} flex items-center justify-center`}>
                  <Book className="w-6 h-6 text-white" />
                </div>
                <Badge className={getDifficultyColor(item.difficulty_level)}>
                  {item.difficulty_level}
                </Badge>
              </div>

              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">{item.content}</p>

              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {item.duration_minutes} min
                </div>
                <Badge variant="outline">{item.category}</Badge>
              </div>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-muted text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Button variant="outline" className="w-full group hover:border-primary">
                <Play className="w-4 h-4 mr-2 group-hover:text-primary" />
                Start Learning
              </Button>
            </Card>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No content found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WisdomLibrary;
