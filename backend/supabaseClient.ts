import { createClient } from '@supabase/supabase-js';

// Vite exposes env variables via import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Export the connected client so your components can use it
export const supabase = createClient(supabaseUrl, supabaseAnonKey);