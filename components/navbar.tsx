"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-indie">
          Letter for Bias
        </Link>
        <div className="flex items-center gap-6">
          <Link 
            href="/submit" 
            className="text-sm font-medium transition-colors hover:text-primary/80"
          >
            Submit
          </Link>
          <Link 
            href="/browse" 
            className="text-sm font-medium transition-colors hover:text-primary/80"
          >
            Browse
          </Link>
          <Link 
            href="/support" 
            className="text-sm font-medium transition-colors hover:text-primary/80"
          >
            Support
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}