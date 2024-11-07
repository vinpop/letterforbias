"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { MessageGrid } from "@/components/message-grid";

export default function BiasPage() {
  const params = useParams();
  const biasName = decodeURIComponent(params.name as string);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-indie text-5xl sm:text-6xl md:text-7xl">
            Letters for {biasName}
          </h1>
          <p className="text-muted-foreground">
            All the heartfelt messages written for {biasName}
          </p>
        </div>

        <MessageGrid biasName={biasName} />
      </div>
    </main>
  );
}