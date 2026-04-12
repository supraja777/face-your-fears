CREATE TABLE IF NOT EXISTS public.challenges (
    -- Unique ID for the challenge entry
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Key linking to your profiles table
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- The core challenge data
    challenge_description TEXT NOT NULL,
    streak INTEGER DEFAULT 0,
    
    -- Array of image URLs (storing URLs is better than base64 in SQL)
    photos TEXT[] DEFAULT '{}',
    
    -- List of strings for tags, categories, or tech stack
    tags TEXT[] DEFAULT '{}',
    
    -- Points earned for this specific challenge
    challenge_points INTEGER DEFAULT 0,
    
    -- Timestamps for tracking
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Index for faster lookups by user
CREATE INDEX IF NOT EXISTS idx_challenges_user_id ON public.challenges(user_id);