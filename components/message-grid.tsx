"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCard } from "@/components/message-card";
import { useMessageStore } from "@/lib/store";

interface MessageGridProps {
  searchQuery?: string;
  showRecent?: boolean;
  biasName?: string;
  variant?: "home" | "browse" | "story";
}

export function MessageGrid({ 
  searchQuery = "", 
  showRecent = false, 
  biasName,
  variant = "browse"
}: MessageGridProps) {
  const messages = useMessageStore((state) => state.messages);
  const [filteredMessages, setFilteredMessages] = useState(messages);

  useEffect(() => {
    let filtered = messages;
    
    if (biasName) {
      filtered = messages.filter((message) =>
        message.recipientName.toLowerCase() === biasName.toLowerCase()
      );
    } else if (searchQuery) {
      filtered = messages.filter((message) =>
        message.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (showRecent) {
      filtered = messages.slice(0, 8); // Show 8 recent messages
    }

    setFilteredMessages(filtered);
  }, [messages, searchQuery, showRecent, biasName]);

  if (searchQuery && filteredMessages.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No messages found for "{searchQuery}"
      </div>
    );
  }

  if (biasName && filteredMessages.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No messages found for {biasName} yet. Be the first to write one!
      </div>
    );
  }

  if (!searchQuery && !showRecent && !biasName) {
    return null;
  }

  const renderMessageCard = (message: any) => {
    const card = (
      <MessageCard 
        {...message} 
        isLink={variant !== "home"} 
        hideRecipient={true} 
        variant={variant}
      />
    );

    if (variant === "home") {
      return (
        <div className="group relative">
          <Link 
            href={`/bias/${encodeURIComponent(message.recipientName)}`}
            className="absolute left-4 top-4 z-20 max-w-[calc(100%-48px)]"
          >
            <span className="font-indie text-xl text-black hover:opacity-70">
              To: {message.recipientName}
            </span>
          </Link>
          {card}
        </div>
      );
    }

    return (
      <div className="group relative">
        <Link 
          href={`/bias/${encodeURIComponent(message.recipientName)}`}
          className="absolute left-4 top-4 z-20 max-w-[calc(100%-48px)]"
        >
          <span className="font-indie text-xl text-black hover:opacity-70">
            To: {message.recipientName}
          </span>
        </Link>
        <Link href={`/message/${message.id}`} className="block">
          {card}
        </Link>
      </div>
    );
  };

  return (
    <div className={`grid gap-6 ${
      variant === "home" 
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" 
        : "sm:grid-cols-2 lg:grid-cols-3"
    }`}>
      {filteredMessages.map((message) => (
        <div key={message.id}>
          {renderMessageCard(message)}
        </div>
      ))}
    </div>
  );
}