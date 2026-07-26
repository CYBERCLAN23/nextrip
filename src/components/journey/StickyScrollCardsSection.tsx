"use client";

import { oswald } from "@/lib/fonts";
import { journeySteps } from "./JourneyStep";
import dynamic from "next/dynamic";
import type { StickyScrollCardItem } from "@/components/ui/sticky-scroll-cards";
import "./sticky-scroll-section.css";

const StickyScrollCards = dynamic(
  () =>
    import("@/components/ui/sticky-scroll-cards").then(
      (mod) => mod.StickyScrollCards,
    ),
  { ssr: false },
);

export function StickyScrollCardsSection() {
  const cards: StickyScrollCardItem[] = journeySteps.map((step) => ({
    src: step.image,
    title: step.title,
    subtitle: step.subtitle,
    tag: step.tag,
    duration: step.duration,
    number: step.number,
    description: step.description,
    deliverables: step.deliverables,
  }));

  return (
    <section className="sss-section" aria-labelledby="roadmap-heading">
      {/* ── Subtle radial glow behind the header ── */}
      <div aria-hidden className="sss-glow-wrap">
        <div className="sss-glow" />
      </div>

      {/* ── Section header ── */}
      <header className="sss-header">
        {/* Badge */}
        <span className="sss-badge">
          <span className="sss-badge__dot" />
          <span className={`sss-badge__text ${oswald.className}`}>
            04 &middot; Roadmap to Scholarship &amp; Admission
          </span>
        </span>

        {/* Heading */}
        <h2
          id="roadmap-heading"
          className={`sss-heading ${oswald.className}`}
        >
          How do we guide your{" "}
          <span className="sss-heading__accent">journey?</span>
        </h2>

        {/* Subtext */}
        <p className="sss-subtext">
          Six transparent steps — from discovery to your first day on campus —
          crafted by global scholars and visa experts.
        </p>

        {/* Step progress dots */}
        <div className="sss-dots" aria-hidden>
          {journeySteps.map((step, i) => (
            <div
              key={step.id}
              className="sss-dot"
              style={{ width: i === 0 ? 24 : 12 }}
            />
          ))}
        </div>
      </header>

      {/* ── Sticky scroll card stack ── */}
      <StickyScrollCards
        cards={cards}
        hint="scroll through each step"
        style={{ paddingTop: "18vh" }}
      />

      {/* ── Closing Call to Action ── */}
      <div className="ssc-footer" style={{ margin: "40px auto 0 auto" }}>
        <h4 className="ssc-footer__title">Your global journey begins here.</h4>
        <p className="ssc-footer__text">
          NexTrip is with you at every milestone, ensuring a seamless and confident transition to your dream university.
        </p>
      </div>
    </section>
  );
}

export default StickyScrollCardsSection;
