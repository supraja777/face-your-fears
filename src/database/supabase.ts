import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load variables from .env for terminal execution
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";

console.log("In supabase ts")
// This is your connection instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);