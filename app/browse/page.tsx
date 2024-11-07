"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { MessageGrid } from "@/components/message-grid";

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-indie text-5xl sm:text-6xl md:text-7xl">
            Browse Messages
          </h1>
        </div>

        <div className="mx-auto mb-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by recipient name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {!searchQuery && (
            <p className="mt-4 text-center text-muted-foreground">
              Enter a name to search for messages...
            </p>
          )}
        </div>

        <MessageGrid searchQuery={searchQuery} />
      </div>
    </main>
  );
}