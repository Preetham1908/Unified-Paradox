-- Create storage bucket for user stories and media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'stories',
  'stories',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'audio/mpeg', 'audio/wav']
);

-- Create stories table
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('rural', 'tribal', 'cultural', 'ecological', 'spiritual')),
  location TEXT,
  media_urls TEXT[],
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view stories
CREATE POLICY "Stories are viewable by everyone"
ON public.stories
FOR SELECT
USING (true);

-- Allow authenticated users to insert their own stories
CREATE POLICY "Users can create their own stories"
ON public.stories
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own stories
CREATE POLICY "Users can update their own stories"
ON public.stories
FOR UPDATE
USING (auth.uid() = user_id);

-- Allow users to delete their own stories
CREATE POLICY "Users can delete their own stories"
ON public.stories
FOR DELETE
USING (auth.uid() = user_id);

-- Create environmental data table for live dashboard
CREATE TABLE public.environmental_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  air_quality_index INTEGER,
  temperature DECIMAL(5,2),
  humidity INTEGER,
  forest_cover_percentage DECIMAL(5,2),
  wildlife_count INTEGER,
  endangered_species TEXT[],
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.environmental_data ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view environmental data
CREATE POLICY "Environmental data is viewable by everyone"
ON public.environmental_data
FOR SELECT
USING (true);

-- Create cultural events table
CREATE TABLE public.cultural_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  state TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cultural_events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view cultural events
CREATE POLICY "Cultural events are viewable by everyone"
ON public.cultural_events
FOR SELECT
USING (true);

-- Create wisdom library table
CREATE TABLE public.wisdom_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('yoga', 'meditation', 'ayurveda', 'philosophy', 'texts')),
  language TEXT DEFAULT 'english',
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_minutes INTEGER,
  tags TEXT[],
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.wisdom_content ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view wisdom content
CREATE POLICY "Wisdom content is viewable by everyone"
ON public.wisdom_content
FOR SELECT
USING (true);

-- Create storage policies for stories bucket
CREATE POLICY "Anyone can view story media"
ON storage.objects
FOR SELECT
USING (bucket_id = 'stories');

CREATE POLICY "Authenticated users can upload story media"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'stories' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own story media"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'stories' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own story media"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'stories' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Insert sample environmental data
INSERT INTO public.environmental_data (location, state, air_quality_index, temperature, humidity, forest_cover_percentage, wildlife_count, endangered_species) VALUES
('Jim Corbett National Park', 'Uttarakhand', 45, 28.5, 65, 82.5, 450, ARRAY['Bengal Tiger', 'Asian Elephant']),
('Western Ghats', 'Kerala', 38, 26.0, 78, 88.0, 1200, ARRAY['Nilgiri Tahr', 'Lion-tailed Macaque']),
('Sundarbans', 'West Bengal', 52, 30.0, 82, 75.0, 320, ARRAY['Royal Bengal Tiger', 'Saltwater Crocodile']),
('Kaziranga', 'Assam', 48, 27.5, 70, 80.0, 890, ARRAY['One-horned Rhinoceros', 'Wild Water Buffalo']);

-- Insert sample cultural events
INSERT INTO public.cultural_events (name, description, category, state, start_date, end_date) VALUES
('Diwali Festival', 'Festival of Lights celebrated across India', 'Festival', 'Pan-India', '2025-11-01', '2025-11-05'),
('Durga Puja', 'Celebration of Goddess Durga', 'Religious', 'West Bengal', '2025-10-10', '2025-10-14'),
('Onam', 'Harvest festival of Kerala', 'Harvest', 'Kerala', '2025-08-20', '2025-08-30'),
('Pushkar Camel Fair', 'Annual livestock fair and cultural celebration', 'Cultural', 'Rajasthan', '2025-11-15', '2025-11-23');

-- Insert sample wisdom content
INSERT INTO public.wisdom_content (title, content, category, difficulty_level, duration_minutes, tags) VALUES
('Introduction to Pranayama', 'Learn the ancient art of breath control to enhance vitality and mental clarity. Pranayama is a fundamental practice in yoga.', 'yoga', 'beginner', 15, ARRAY['breathing', 'wellness', 'beginner']),
('Bhagavad Gita Essence', 'Explore the timeless wisdom of the Bhagavad Gita and its relevance in modern life. Learn about dharma, karma, and self-realization.', 'philosophy', 'intermediate', 45, ARRAY['philosophy', 'texts', 'spirituality']),
('Ayurvedic Daily Routine', 'Discover the power of Dinacharya - the Ayurvedic daily routine for optimal health and balance.', 'ayurveda', 'beginner', 20, ARRAY['wellness', 'health', 'lifestyle']),
('Meditation for Inner Peace', 'A guided meditation practice to cultivate inner peace and mindfulness in daily life.', 'meditation', 'beginner', 20, ARRAY['meditation', 'mindfulness', 'peace']);

-- Enable realtime for stories
ALTER PUBLICATION supabase_realtime ADD TABLE public.stories;

-- Enable realtime for environmental data
ALTER PUBLICATION supabase_realtime ADD TABLE public.environmental_data;

-- Enable realtime for cultural events
ALTER PUBLICATION supabase_realtime ADD TABLE public.cultural_events;