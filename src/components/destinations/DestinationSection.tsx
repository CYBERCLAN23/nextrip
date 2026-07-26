"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { BentoGridShowcase } from "@/components/ui/bento-grid";
import {
  Calendar,
  HeartPulse,
  MessageCircle,
  Plus,
  Zap,
} from "lucide-react";

const IntegrationsCard = () => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="text-lg">Integrations</CardTitle>
      <CardDescription>
        Easily integrations of third party apps.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-neutral-100)]">
        <Calendar className="h-6 w-6 text-[var(--color-neutral-500)]" />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-neutral-100)]">
        <MessageCircle className="h-6 w-6 text-[var(--color-neutral-500)]" />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-neutral-100)]">
        <Zap className="h-6 w-6 text-[var(--color-neutral-500)]" />
      </div>
    </CardContent>
  </Card>
);

const FeatureTagsCard = () => (
  <Card className="h-full">
    <CardContent className="flex h-full flex-col justify-center gap-3 p-6">
      <Badge
        variant="outline"
        className="w-fit items-center gap-1.5 border-purple-300 py-1.5 px-3 text-purple-700 dark:border-purple-700 dark:text-purple-300"
      >
        Innovative <Plus className="h-3 w-3" />
      </Badge>
      <Badge
        variant="secondary"
        className="w-fit items-center gap-1.5 bg-purple-100 py-1.5 px-3 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-900/80"
      >
        Revolutionary
      </Badge>
      <Badge
        variant="outline"
        className="w-fit items-center gap-1.5 border-purple-300 py-1.5 px-3 text-purple-700 dark:border-purple-700 dark:text-purple-300"
      >
        Empowering <Plus className="h-3 w-3" />
      </Badge>
    </CardContent>
  </Card>
);

const MainFeatureCard = () => (
  <Card className="relative flex h-full min-h-[400px] w-full overflow-hidden">
    <div className="absolute top-6 left-6 z-10 rounded-lg bg-white/50 p-2 backdrop-blur-sm">
      <p className="text-xl font-bold tracking-tighter">Study Abroad.</p>
    </div>
    <img
      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format"
      alt="Students on graduation day"
      className="h-full w-full object-cover"
      crossOrigin="anonymous"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
  </Card>
);

const StatCard = () => (
  <Card className="flex h-full min-h-[200px] flex-col justify-between bg-lime-100/80 p-6 dark:bg-lime-950/80">
    <HeartPulse className="h-8 w-8 text-lime-700 dark:text-lime-300" />
    <div>
      <p className="text-6xl font-bold text-lime-900 dark:text-lime-100">95%</p>
      <p className="text-sm text-lime-800 dark:text-lime-200">
        Student satisfaction rate with our global partners.
      </p>
    </div>
  </Card>
);

const SecondaryFeatureCard = () => (
  <Card className="relative flex h-full min-h-[200px] w-full overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format"
      alt="Students studying together"
      className="h-full w-full object-cover"
      crossOrigin="anonymous"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 via-transparent to-transparent dark:from-blue-900/40" />
    <p className="absolute bottom-6 left-6 z-10 max-w-[80%] text-xl font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_30%)]">
      Discover your path to global education.
    </p>
  </Card>
);

const JourneyCard = () => (
  <Card className="relative h-full w-full overflow-hidden p-6">
    <CardTitle className="text-lg">Weekly Journey</CardTitle>
    <CardDescription>
      Workflow and Patient journey mapping within 02-03 Weeks.
    </CardDescription>
    <div className="absolute -right-4 -bottom-4 h-48 w-48">
      <div className="absolute top-8 left-20">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute top-24 left-8">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </Card>
);

export function DestinationSection() {
  return (
    <section className="relative min-h-screen w-full bg-[var(--color-white)] py-16" aria-label="Destinations">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <div className="mb-8 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-600)]">
            06 / WORLD STUDY DESTINATIONS
          </span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            DISCOVER YOUR GLOBAL CAMPUS
          </h2>
          <p className="mt-4 text-lg text-[var(--color-neutral-500)]">
            Explore tuition costs, post-study visa pathways, and top accredited universities worldwide.
          </p>
        </div>

        <BentoGridShowcase
          integrations={<IntegrationsCard />}
          featureTags={<FeatureTagsCard />}
          mainFeature={<MainFeatureCard />}
          secondaryFeature={<SecondaryFeatureCard />}
          statistic={<StatCard />}
          journey={<JourneyCard />}
        />
      </div>
    </section>
  );
}

export default DestinationSection;
