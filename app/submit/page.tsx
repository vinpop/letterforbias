"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/image-upload";
import { MessageCard } from "@/components/message-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMessageStore } from "@/lib/store";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn, toTitleCase } from "@/lib/utils";
import Swal from "sweetalert2";

const MAX_MESSAGE_LENGTH = 250;

const COLORS = [
  "#FFFFFF", // White (default)
  "#E45255",
  "#9AD1B3",
  "#8388DB",
  "#9AC7D1",
  "#ECD8CD",
];

export default function SubmitPage() {
  const router = useRouter();
  const messages = useMessageStore((state) => state.messages);
  const addMessage = useMessageStore((state) => state.addMessage);
  
  const [formData, setFormData] = useState({
    recipientName: "",
    message: "",
    backgroundColor: COLORS[0],
    image: "",
    imagePosition: "top" as "top" | "bottom",
  });
  
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Get unique bias names from existing messages and normalize them
  const uniqueBiasNames = Array.from(
    new Set(messages.map((message) => toTitleCase(message.recipientName)))
  ).sort();

  // Handle input change with debounce
  const handleInputChange = (value: string) => {
    setFormData({ ...formData, recipientName: value });

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Only show suggestions if user has typed something
    if (!value.trim()) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    // Set new timeout for search
    const newTimeout = setTimeout(() => {
      const normalizedInput = value.toLowerCase();
      const filtered = uniqueBiasNames.filter((name) =>
        name.toLowerCase().includes(normalizedInput)
      );
      setSuggestions(filtered);
      setOpen(filtered.length > 0);
    }, 300);

    setSearchTimeout(newTimeout);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.recipientName || !formData.message) {
      await Swal.fire({
        title: "Error",
        text: "Please fill in all required fields",
        icon: "error",
      });
      return;
    }

    // Normalize recipient name to Title Case before saving
    const normalizedFormData = {
      ...formData,
      recipientName: toTitleCase(formData.recipientName),
    };

    const messageId = addMessage(normalizedFormData);
    
    await Swal.fire({
      title: "Success!",
      text: "Your message has been created",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    router.push(`/message/${messageId}`);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-indie text-5xl sm:text-6xl md:text-7xl">
            Share Your Message
          </h1>
          <p className="text-muted-foreground">
            Write your message with love! Avoid including any sensitive or personal information like phone numbers, addresses, or private details. Please use appropriate language.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Your Bias Name</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      id="recipientName"
                      value={formData.recipientName}
                      onChange={(e) => handleInputChange(e.target.value)}
                      maxLength={50}
                      className="w-full"
                      placeholder="Enter bias name..."
                    />
                  </div>
                </PopoverTrigger>
                {formData.recipientName.trim() && (
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandGroup>
                        {suggestions.length > 0 ? (
                          suggestions.map((name) => (
                            <CommandItem
                              key={name}
                              onSelect={() => {
                                setFormData({ ...formData, recipientName: name });
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.recipientName.toLowerCase() === name.toLowerCase()
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {name}
                            </CommandItem>
                          ))
                        ) : (
                          <CommandItem disabled>No suggestions found</CommandItem>
                        )}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                )}
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                maxLength={MAX_MESSAGE_LENGTH}
                className="h-40 resize-none"
              />
              <div className="text-right text-sm text-muted-foreground">
                {formData.message.length}/{MAX_MESSAGE_LENGTH}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Background Color</Label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`h-8 w-8 rounded-full border-2 transition-all hover:scale-110 ${
                      formData.backgroundColor === color ? "border-primary" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData({ ...formData, backgroundColor: color })}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Image (Optional)</Label>
              <div className="flex items-center gap-4">
                <ImageUpload
                  onImageChange={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
                />
                {formData.image && (
                  <Select
                    value={formData.imagePosition}
                    onValueChange={(value: "top" | "bottom") =>
                      setFormData({ ...formData, imagePosition: value })
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Image Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>

          <div className="lg:sticky lg:top-24">
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <h2 className="mb-4 font-indie text-2xl">Preview</h2>
              <MessageCard {...formData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}