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
  BookOpen,
  GraduationCap,
  Globe,
  Heart,
  Landmark,
  MapPin,
  Plus,
  Star,
  Users,
} from "lucide-react";

const ProgramsCard = () => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="text-lg">2,500+ Programs</CardTitle>
      <CardDescription>
        Across 600+ partner universities worldwide
      </CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-neutral-100)]">
        <BookOpen className="h-6 w-6 text-[var(--color-neutral-500)]" />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-neutral-100)]">
        <Globe className="h-6 w-6 text-[var(--color-neutral-500)]" />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-neutral-100)]">
        <GraduationCap className="h-6 w-6 text-[var(--color-neutral-500)]" />
      </div>
    </CardContent>
  </Card>
);

const BenefitsCard = () => (
  <Card className="h-full">
    <CardContent className="flex h-full flex-col justify-center gap-3 p-6">
      <Badge
        variant="outline"
        className="w-fit items-center gap-1.5 border-[var(--color-primary-300)] py-1.5 px-3 text-[var(--color-primary-600)]"
      >
        Global Access <Plus className="h-3 w-3" />
      </Badge>
      <Badge
        variant="secondary"
        className="w-fit items-center gap-1.5 py-1.5 px-3"
      >
        World-Class Education
      </Badge>
      <Badge
        variant="outline"
        className="w-fit items-center gap-1.5 border-[var(--color-primary-300)] py-1.5 px-3 text-[var(--color-primary-600)]"
      >
        Career Ready <Plus className="h-3 w-3" />
      </Badge>
    </CardContent>
  </Card>
);

const MainFeatureCard = () => (
  <Card className="relative flex h-full min-h-[400px] w-full overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format"
      alt="Students on graduation day"
      className="h-full w-full object-cover"
      crossOrigin="anonymous"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    <div className="absolute bottom-6 left-6 z-10">
      <p className="text-2xl font-bold text-white drop-shadow-lg">Study Abroad</p>
      <p className="text-sm text-white/80 drop-shadow">Open doors to global opportunities</p>
    </div>
  </Card>
);

const StatCard = () => (
  <Card className="flex h-full min-h-[200px] flex-col justify-between bg-[var(--color-success-50)] p-6">
    <Star className="h-8 w-8 text-[var(--color-success-600)]" />
    <div>
      <p className="text-6xl font-bold text-[var(--color-success-700)]">97%</p>
      <p className="text-sm text-[var(--color-success-600)]">
        Student satisfaction rate with our guidance and support.
      </p>
    </div>
  </Card>
);

const StudentLifeCard = () => (
  <Card className="relative flex h-full min-h-[200px] w-full overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format"
      alt="Students collaborating"
      className="h-full w-full object-cover"
      crossOrigin="anonymous"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 via-transparent to-transparent" />
    <p className="absolute bottom-6 left-6 z-10 max-w-[80%] text-xl font-bold text-white drop-shadow-lg">
      Your journey starts here
    </p>
  </Card>
);

const JourneyCard = () => (
  <Card className="relative h-full w-full overflow-hidden p-6">
    <CardTitle className="text-lg">Apply in 3 Steps</CardTitle>
    <CardDescription>
      Choose your destination, submit documents, get your visa.
    </CardDescription>
    <div className="absolute -right-4 -bottom-4 h-48 w-48">
      <div className="absolute top-8 left-20">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute top-24 left-8">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" />
          <AvatarFallback>SB</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute top-4 left-4">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </Card>
);

export function DestinationSection() {
  return (
    <section className="relative min-h-screen w-full bg-[var(--color-white)] py-16" aria-label="Study Destinations">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <div className="mb-12 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-600)]">
            06 / WORLD STUDY DESTINATIONS
          </span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl text-[var(--color-neutral-900)]">
            DISCOVER YOUR GLOBAL CAMPUS
          </h2>
          <p className="mt-4 text-lg text-[var(--color-neutral-500)] max-w-2xl mx-auto">
            Explore tuition costs, post-study visa pathways, and top accredited universities worldwide.
          </p>
        </div>

        <BentoGridShowcase
          integrations={<ProgramsCard />}
          featureTags={<BenefitsCard />}
          mainFeature={<MainFeatureCard />}
          secondaryFeature={<StudentLifeCard />}
          statistic={<StatCard />}
          journey={<JourneyCard />}
        />
      </div>
    </section>
  );
}

export default DestinationSection;
