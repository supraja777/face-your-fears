import { createClient } from '@supabase/supabase-js';

// Use VITE_ prefix so the browser can see them
const supabaseUrl = import.meta.env.VITE_SUPABASE_DB_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);