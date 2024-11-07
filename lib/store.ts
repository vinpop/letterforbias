import { create } from 'zustand';
import { supabase } from './supabase';
import { toTitleCase } from './utils';

interface MessageStore {
  messages: any[];
  setMessages: (messages: any[]) => void;
  fetchMessages: () => Promise<void>;
  cleanupMessages: () => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  fetchMessages: async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      set({ messages: data });
    }
  },
  cleanupMessages: async () => {
    const invalidNames = ['kevin', 'kurang asem', 'jaja miharja', 'flsamfafs'];
    
    const { data: messagesToDelete } = await supabase
      .from('messages')
      .select('*')
      .in('recipient_name', invalidNames);

    if (messagesToDelete) {
      await supabase
        .from('messages')
        .delete()
        .in('recipient_name', invalidNames);

      // Refresh messages after cleanup
      const { data: updatedMessages } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (updatedMessages) {
        set({ messages: updatedMessages });
      }
    }
  },
}));