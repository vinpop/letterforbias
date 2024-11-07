"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useMessageStore, type Message } from "@/lib/store";
import { MessageCard } from "@/components/message-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBaseUrl } from "@/lib/utils";
import Swal from "sweetalert2";

export default function MessagePage() {
  const params = useParams();
  const getMessage = useMessageStore((state) => state.getMessage);
  const [message, setMessage] = useState<Message | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Generate absolute URL for sharing
  const messageUrl = typeof window !== "undefined" 
    ? `${getBaseUrl()}/message/${params.id}`
    : "";

  useEffect(() => {
    if (params.id) {
      const foundMessage = getMessage(params.id as string);
      if (foundMessage) {
        setMessage(foundMessage);
      }
    }
  }, [params.id, getMessage]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(messageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      await Swal.fire({
        title: "Link Copied!",
        text: "Share this link with others to show them your message.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to copy link. Please try again.",
        icon: "error",
      });
    }
  };

  if (!message) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <h1 className="mb-4 font-indie text-4xl">Message not found</h1>
          <p className="text-muted-foreground">
            The message you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto mb-8 flex max-w-2xl flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="message-link">Message Link</Label>
              <Input
                id="message-link"
                value={messageUrl}
                readOnly
                className="bg-muted"
              />
            </div>
            <Button
              variant="outline"
              className="mt-6 gap-2"
              onClick={handleCopyLink}
            >
              {copied ? "Copied!" : "Copy"} <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="instagram-story-container relative">
            <Link 
              href={`/bias/${encodeURIComponent(message.recipientName)}`}
              className="absolute left-6 top-6 z-20 max-w-[calc(100%-96px)]"
            >
              <span className="font-indie text-2xl text-black hover:opacity-70">
                To: {message.recipientName}
              </span>
            </Link>
            <MessageCard {...message} variant="story" hideRecipient />
          </div>
        </div>
      </div>
    </main>
  );
}