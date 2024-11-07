"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
}

export function FeatureCard({ title, description, buttonText, onClick }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center p-6 text-center">
      <h3 className="mb-2 font-indie text-2xl">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      {buttonText && (
        <Button onClick={onClick} className="mt-auto">
          {buttonText} →
        </Button>
      )}
    </Card>
  );
}