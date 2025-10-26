import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MapPin, Upload, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Story {
  id: string;
  title: string;
  content: string;
  category: string;
  location: string | null;
  likes_count: number;
  created_at: string;
  media_urls: string[] | null;
}

const StorySharing = () => {
  const { toast } = useToast();
  const [stories, setStories] = useState<Story[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    category: 'rural',
    location: ''
  });

  useEffect(() => {
    fetchStories();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('story-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'stories'
        },
        () => {
          fetchStories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(12);

    if (error) {
      console.error('Error fetching stories:', error);
    } else {
      setStories(data || []);
    }
  };

  const handleSubmit = async () => {
    if (!newStory.title || !newStory.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and content",
        variant: "destructive"
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to share your story",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('stories')
      .insert({
        user_id: user.id,
        title: newStory.title,
        content: newStory.content,
        category: newStory.category,
        location: newStory.location || null
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to share story. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Story Shared! 🎉",
        description: "Your story has been added to the community wall"
      });
      setNewStory({ title: '', content: '', category: 'rural', location: '' });
      fetchStories();
    }

    setIsSubmitting(false);
  };

  const categories = [
    { value: 'rural', label: 'Rural Life', gradient: 'gradient-stories' },
    { value: 'tribal', label: 'Tribal Heritage', gradient: 'gradient-culture' },
    { value: 'cultural', label: 'Cultural', gradient: 'gradient-culture' },
    { value: 'ecological', label: 'Ecological', gradient: 'gradient-eco' },
    { value: 'spiritual', label: 'Spiritual', gradient: 'gradient-spiritual' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Community <span className="gradient-stories text-gradient">Story Wall</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share and explore stories from India's villages, tribes, and communities
          </p>
        </div>

        {/* Submit Story Form */}
        <Card className="max-w-3xl mx-auto p-6 mb-12">
          <h3 className="text-2xl font-bold mb-6">Share Your Story</h3>
          <div className="space-y-4">
            <Input
              placeholder="Story Title"
              value={newStory.title}
              onChange={(e) => setNewStory({...newStory, title: e.target.value})}
            />
            <Textarea
              placeholder="Tell your story..."
              value={newStory.content}
              onChange={(e) => setNewStory({...newStory, content: e.target.value})}
              rows={6}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Select value={newStory.category} onValueChange={(value) => setNewStory({...newStory, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Location (optional)"
                value={newStory.location}
                onChange={(e) => setNewStory({...newStory, location: e.target.value})}
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              variant="hero"
              size="lg"
              className="w-full"
            >
              <Send className="w-4 h-4 mr-2" />
              Share Story
            </Button>
          </div>
        </Card>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story) => {
            const category = categories.find(c => c.value === story.category);
            return (
              <Card key={story.id} className="p-6 hover:shadow-elegant transition-all hover:scale-[1.02]">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${category?.gradient} text-white mb-4`}>
                  {category?.label}
                </div>
                <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{story.content}</p>
                {story.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    {story.location}
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {new Date(story.created_at).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-1" />
                    {story.likes_count}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {stories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No stories yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StorySharing;
