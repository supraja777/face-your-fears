import { createClient } from '@supabase/supabase-js';

// 1. Get values safely
const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || 
  "";

const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || 
  "";

console.log("In supabase ts");

// 2. Validate (Optional but helpful)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials not found. Check your .env file and restart your server.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);