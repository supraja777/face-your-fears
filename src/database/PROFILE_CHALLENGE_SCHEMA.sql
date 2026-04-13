-- 1. Clean slate
DROP TABLE IF EXISTS challenges CASCADE; -- Drop dependent tables first
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. Create the unified table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Auth Data
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- Storing as text for your current setup
  
  -- Profile Data
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  
  -- App State
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Re-link challenges to this new profiles table
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_description TEXT NOT NULL,
  streak INTEGER DEFAULT 0,
  photos TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  challenge_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);