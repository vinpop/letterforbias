import { Navbar } from "@/components/navbar";
import { FeatureCard } from "@/components/feature-card";
import { MessageGrid } from "@/components/message-grid";
import { CleanupMessages } from "@/components/cleanup-messages";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <CleanupMessages />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-indie text-5xl sm:text-6xl md:text-7xl">
            Write a letter for your Special Bias,
            <br />
            and tell them your love..
          </h1>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          <FeatureCard
            title="Share Your Message"
            description="Choose a song and write a heartfelt message to someone special"
            buttonText="Write your Letter"
          />
          <FeatureCard
            title="Browse Messages"
            description="Find messages that were written for you. Search by your name to discover heartfelt dedications"
            buttonText="See all"
          />
          <FeatureCard
            title="Detail Messages"
            description="You can click on any message card to read the full story and listen to the chosen song!"
          />
        </div>

        <div className="space-y-8">
          <h2 className="text-center font-indie text-3xl">Recent Messages</h2>
          <MessageGrid showRecent={true} variant="home" />
        </div>
      </div>
    </main>
  );
}