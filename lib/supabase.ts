import { createClient } from '@supabase/supabase-js';

// Provide default values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client only if URL is valid
const createSupabaseClient = () => {
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    // Return a mock client for development
    return {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
      }),
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    };
  }
};

export const supabase = createSupabaseClient();

export type Message = {
  id: string;
  recipient_name: string;
  message: string;
  background_color: string;
  image?: string;
  image_position?: 'top' | 'bottom';
  created_at: string;
};