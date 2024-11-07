"use client";

import { useEffect } from 'react';
import { useMessageStore } from '@/lib/store';

export function CleanupMessages() {
  const { cleanupMessages } = useMessageStore();

  useEffect(() => {
    cleanupMessages();
  }, [cleanupMessages]);

  return null;
}