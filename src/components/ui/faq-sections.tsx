"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export interface FaqItem {
  question: string;
  answer: string;
  tag: string;
  image: string;
  imageAlt: string;
}

interface FaqSectionsProps {
  faqs: FaqItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function FaqSections({ faqs, activeIndex, onSelect }: FaqSectionsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsMobile(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollableProps = isMobile
    ? ({ "data-lenis-prevent": "" } as Record<string, string>)
    : {};

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
      {/* Image panel — crossfades with the active question */}
      <div className="doc-frame relative h-52 overflow-hidden sm:h-64 lg:h-[28rem]">
        {faqs.map((faq, i) => (
          <Image
            key={faq.image}
            src={faq.image}
            alt={activeIndex === i ? faq.imageAlt : ""}
            aria-hidden={activeIndex !== i}
            fill
            sizes="(max-width: 1023px) calc(100vw - 3rem), 42vw"
            className={`object-cover transition-opacity duration-500 ease-out ${
              activeIndex === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[var(--color-rr-night)]/80 to-transparent p-4">
          <span className="font-registry-mono text-[0.62rem] tracking-[0.2em] text-white uppercase">
            Q.0{activeIndex + 1} / 0{faqs.length}
          </span>
          <span className="font-registry-mono text-[0.62rem] tracking-[0.2em] text-white/85 uppercase">
            {faqs[activeIndex]?.tag}
          </span>
        </div>
      </div>

      {/* Accordion */}
      <div
        className={`lg:overflow-visible ${isMobile ? "max-h-[40vh] overflow-y-auto pr-1" : ""}`}
        {...scrollableProps}
      >
        {faqs.map((faq, i) => {
          const open = activeIndex === i;
          const contentId = `faq-answer-${i}`;
          return (
            <div key={faq.question} className="border-b rr-line">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-expanded={open}
                aria-controls={contentId}
                className="flex w-full items-center justify-between gap-4 py-4 text-left outline-none transition-colors duration-200 hover:text-[var(--color-rr-blue)] focus-visible:ring-2 focus-visible:ring-[var(--color-rr-blue)] focus-visible:ring-inset"
              >
                <span className="flex items-start gap-3">
                  <span className="mt-0.5 font-registry-mono text-[0.62rem] tracking-[0.2em] text-[var(--color-rr-blue)]">
                    Q.0{i + 1}
                  </span>
                  <span
                    className={`font-registry-display text-base leading-snug transition-colors duration-200 md:text-lg ${
                      open
                        ? "text-[var(--color-rr-ink)]"
                        : "text-[var(--color-rr-ink-2)]"
                    }`}
                  >
                    {faq.question}
                  </span>
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  aria-hidden
                  className={`shrink-0 transition-transform duration-300 ${
                    open
                      ? "rotate-180 text-[var(--color-rr-blue)]"
                      : "text-[var(--color-rr-ink-2)]"
                  }`}
                />
              </button>
              <div
                id={contentId}
                role="region"
                aria-label={faq.question}
                className={`grid transition-[grid-template-rows,opacity,transform] duration-500 ease-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[65ch] pb-5 pr-2 pl-8 pt-1 text-sm leading-relaxed text-[var(--color-rr-ink-2)] md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FaqSections;
