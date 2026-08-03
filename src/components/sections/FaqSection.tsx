"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { FaqSections, type FaqItem } from "@/components/ui/faq-sections";
import { useLenis } from "@/providers/LenisProvider";

gsap.registerPlugin(ScrollTrigger);

const faqs: FaqItem[] = [
  {
    question: "Do I really qualify for a full CSC scholarship?",
    tag: "Scholarship",
    answer:
      "Most CSC tracks cover tuition, accommodation, a monthly stipend and health insurance. Eligibility is judged on your academic record, field, and home region — not your wallet. We audit your profile against the current quota before you commit, so you only apply where the route is real.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    imageAlt: "China university campus",
  },
  {
    question: "Which universities and majors can I apply to?",
    tag: "Universities",
    answer:
      "We work with CSC-hosted universities across China — from Tsinghua, Peking and Fudan to Zhejiang and Shanghai Jiao Tong. You are matched by grades, language level and career goal, never by a generic list, and every shortlist is checked against that institution’s acceptance patterns.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    imageAlt: "University students studying together",
  },
  {
    question: "What does the application timeline look like?",
    tag: "Timeline",
    answer:
      "CSC windows open in November and close in April, with university-level cutoffs inside that span. We work backwards from your deadline: profile mapping in week one, document assembly by month two, submission with buffer for corrections, then tracking until the offer letter lands.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Students walking across a university campus",
  },
  {
    question: "Do I need to speak Chinese before applying?",
    tag: "Language",
    answer:
      "No. Most programs run fully in English, and where a university asks for HSK we plan language support around it. For medicine, CS and finance we fold Chinese proficiency into the roadmap so it strengthens your file instead of blocking it.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Graduate in a cap and gown",
  },
  {
    question: "What happens after I receive my offer letter?",
    tag: "Arrival",
    answer:
      "The visa phase is where most students get stuck. We handle your JW201 form, consulate appointment, document authentication and X1 interview prep — then coordinate arrival, accommodation and the pre-departure briefing. Your file stays open until you land.",
    image:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Graduation caps thrown into the air",
  },
];

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();

  const trackHeight = reduceMotion ? "auto" : `${faqs.length * 100}vh`;

  useGSAP(
    () => {
      if (reduceMotion) return;
      const track = trackRef.current;
      const pinned = pinRef.current;
      if (!track || !pinned) return;

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        pin: pinned,
        pinSpacing: false,
        onUpdate: (self) => {
          const next = Math.min(
            faqs.length - 1,
            Math.max(0, Math.floor(self.progress * faqs.length)),
          );
          if (next !== activeRef.current) {
            activeRef.current = next;
            setActiveIndex(next);
          }
        },
      });
      return () => st.kill();
    },
    { scope: sectionRef, dependencies: [reduceMotion] },
  );

  const handleSelect = (i: number) => {
    if (reduceMotion) {
      activeRef.current = i;
      setActiveIndex(i);
      return;
    }
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const target = top + i * window.innerHeight;
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      data-section
      data-section-label="08 — FAQ"
      className="rr-paper dye-wash relative"
    >
      <div ref={trackRef} className="relative" style={{ height: trackHeight }}>
        <div
          ref={pinRef}
          className="flex min-h-screen flex-col justify-center py-16 md:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <span className="absolute -left-8 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-serif text-[15rem] text-[var(--color-rr-ink)]/[0.04] md:text-[22rem]">
              问
            </span>
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-6">
            <div className="mb-8 max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="rr-tab">REC. 08 · FAQ</span>
                <span
                  className="live-dot"
                  role="status"
                  aria-label="Answers available"
                />
              </div>
              <p className="rr-label mb-2">Common questions, answered</p>
              <h2 className="font-registry-display text-4xl font-semibold tracking-[-0.035em] text-[var(--color-rr-ink)] md:text-5xl">
                Clear answers for your{" "}
                <span className="text-porcelain">next move.</span>
              </h2>
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[var(--color-rr-ink-2)]">
                Scroll through the file to preview the question students ask
                most at each stage of their China study route.
              </p>
            </div>

            <FaqSections
              faqs={faqs}
              activeIndex={activeIndex}
              onSelect={handleSelect}
            />

            <p className="rr-label mt-8 text-[var(--color-rr-ink-2)]">
              REC. 08 · SCROLL TO ADVANCE · ASKED → ANSWERED
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
