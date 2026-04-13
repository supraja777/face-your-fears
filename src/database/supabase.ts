import { createClient } from '@supabase/supabase-js';

// 1. Grab values (no 'import' or 'require' needed)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. Add this log to see what is happening in the browser console
console.log("Supabase URL Check:", supabaseUrl);

// 3. Prevent the crash by providing fallback strings if undefined
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);