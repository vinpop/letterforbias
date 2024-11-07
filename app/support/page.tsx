"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4">
            <span className="block font-indie text-5xl sm:text-6xl md:text-7xl">
              Support
            </span>
            <span className="font-indie text-3xl sm:text-4xl md:text-5xl">
              Letter for Bias
            </span>
          </h1>

          <p className="mb-12 text-lg text-muted-foreground">
            Letter for Bias is and will always be completely free to use! However, if you'd like to
            support the development and server costs, you can make a voluntary
            contribution. Any amount is deeply appreciated and helps keep this service
            running smoothly for everyone :)
          </p>

          <div className="flex flex-col gap-4">
            <Button
              size="lg"
              className="w-full"
              onClick={() => window.open('https://saweria.co/letterforbias', '_blank')}
            >
              Support Letter for Bias (Saweria) <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              className="w-full"
              onClick={() => window.open('https://sociabuzz.com/letterforbias', '_blank')}
            >
              Support Letter for Bias (SociaBuzz) <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Accept payments from outside Indonesia
          </p>
        </div>
      </div>
    </main>
  );
}