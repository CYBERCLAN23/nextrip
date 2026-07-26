"use client";

/**
 * StickyScrollCards — scroll-driven photo-stack component.
 *
 * Styles: ./sticky-scroll-cards.css  (plain CSS, no Tailwind)
 *
 * How the scroll math works:
 *   - `useScroll({ target: container, offset: ["start start", "end end"] })`
 *     gives a 0 → 1 progress value that starts when the container's *top
 *     edge* reaches the viewport top, and ends when its *bottom edge* does.
 *   - Each card gets a slice of that range via `useTransform`, so only the
 *     relevant card scales during its "active" phase.
 *   - The restingScale curve  max(0.56, 1 − cardsAbove × 0.095)  means
 *     every card ends smaller the deeper it sits in the visual stack.
 */

import "./sticky-scroll-cards.css";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import ReactLenis from "lenis/react";
import { useRef, useState, useEffect } from "react";

/* ─── Public types ─────────────────────────────────────────────────── */

export interface StickyScrollCardItem {
  /** Primary image URL */
  src: string;
  /** Primary label shown in the caption strip */
  title: string;
  /** Optional secondary label */
  subtitle?: string;
  /** Optional pill badge (e.g. "Exploration") */
  tag?: string;
  /** Optional duration string (e.g. "Week 1 – 2") */
  duration?: string;
  /** Optional step number string (e.g. "01") */
  number?: string;
  /** Optional description paragraph */
  description?: string;
  /** Optional list of deliverables */
  deliverables?: string[];
}

interface StickyScrollCardsProps {
  /** Card items. Renders 5 sample landscape photos when omitted. */
  cards?: StickyScrollCardItem[];
  /** Hint copy above the stack. Defaults to "scroll to explore". */
  hint?: string;
  /** Extra inline style merged onto the outermost container. */
  style?: React.CSSProperties;
}

/* ─── Defaults ─────────────────────────────────────────────────────── */

const DEFAULT_CARDS: StickyScrollCardItem[] = [
  {
    title: "Misty Alps",
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=85",
  },
  {
    title: "Sunlit Grove",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85",
  },
  {
    title: "Turquoise Shore",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
  },
  {
    title: "Mountain Pass",
    src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&q=85",
  },
  {
    title: "Rolling Hills",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
  },
];

/**
 * Small organic tilt values — alternating sign makes the stack look like
 * naturally scattered photographs rather than perfectly aligned rectangles.
 */
const TILT_PATTERN = [-1.25, 0.85, -0.65, 1.35, -0.9] as const;

/* ─── Single card subcomponent ─────────────────────────────────────── */

interface StackCardProps {
  card: StickyScrollCardItem;
  index: number;
  total: number;
  container: React.RefObject<HTMLDivElement>;
  reduceMotion: boolean;
}

function StackCard({ card, index, total, container, reduceMotion }: StackCardProps) {
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const cardsAbove = total - index - 1;
  const restingScale = Math.max(0.78, 1 - cardsAbove * 0.045);

  // Partition the scroll progress [0, 1] into segments for each card
  const stepSize = total > 0 ? 1 / total : 1;
  const nextStart = (index + 1) * stepSize;
  const nextEnd = (index + 2) * stepSize;

  // Clamp ranges safely between 0 and 1
  const rangeStart = Math.min(1, Math.max(0, nextStart));
  const rangeEnd = Math.min(1, Math.max(0, nextEnd));

  // The card scales down and tilts ONLY when the next card is entering
  const scale = useTransform(
    scrollYProgress,
    [0, rangeStart, rangeEnd, 1],
    reduceMotion ? [1, 1, 1, 1] : [1, 1, restingScale, restingScale]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, rangeStart, rangeEnd, 1],
    reduceMotion ? [0, 0, 0, 0] : [0, 0, TILT_PATTERN[index % TILT_PATTERN.length], TILT_PATTERN[index % TILT_PATTERN.length]]
  );

  const hasRichContent =
    card.number != null ||
    card.tag != null ||
    card.subtitle != null ||
    card.duration != null ||
    card.description != null ||
    card.deliverables != null;

  return (
    <div className="ssc-frame">
      <motion.figure
        className="ssc-figure"
        style={{
          scale,
          rotate,
          // Pushes subsequent stacked cards down slightly so headers peek out
          // but keeps the base top small to ensure cards fit fully in the viewport.
          top: `${index * 12}px`,
        }}
      >
        {/* ── Image ── */}
        <div className="ssc-img-wrap">
          <img
            src={card.src}
            alt={card.title}
            className="ssc-img"
            loading={index < 2 ? "eager" : "lazy"}
            draggable={false}
          />
        </div>

        {/* ── Caption ── */}
        {hasRichContent ? (
          <div className="ssc-caption">
            <div>
              <div className="ssc-caption__meta">
                {card.number && (
                  <span className="ssc-caption__number">{card.number}</span>
                )}
                {card.tag && (
                  <span className="ssc-caption__tag">{card.tag}</span>
                )}
              </div>
              <figcaption>
                <h3 className="ssc-caption__title">{card.title}</h3>
                {card.subtitle && (
                  <p className="ssc-caption__subtitle">{card.subtitle}</p>
                )}
                {card.description && (
                  <p className="ssc-caption__description">{card.description}</p>
                )}
              </figcaption>
              
              {/* Deliverables checklist */}
              {card.deliverables && card.deliverables.length > 0 && (
                <div>
                  <h4 className="ssc-deliverables-title">Deliverables</h4>
                  <ul className="ssc-deliverables-list">
                    {card.deliverables.map((del, idx) => (
                      <li key={idx} className="ssc-deliverable-item">
                        <span className="ssc-check-icon">✓</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {card.duration && (
              <p className="ssc-caption__duration">{card.duration}</p>
            )}
          </div>
        ) : (
          <figcaption className="ssc-caption--simple">{card.title}</figcaption>
        )}
      </motion.figure>
    </div>
  );
}

/* ─── Container ─────────────────────────────────────────────────────── */

export function StickyScrollCards({
  cards = DEFAULT_CARDS,
  hint = "scroll to explore",
  style,
}: StickyScrollCardsProps) {
  const container = useRef<HTMLDivElement>(null!);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const reduceMotion = useReducedMotion() ?? false;

  const content = (
    <div ref={container} className="ssc-container" style={style}>
      {/* ── "Scroll to explore" hint ── */}
      <div className="ssc-hint">
        <p className="ssc-hint__text">{hint}</p>
        <span className="ssc-hint__line" />
      </div>

      {/* ── Card stack ── */}
      {cards.map((card, index) => (
        <StackCard
          key={`${card.title}-${index}`}
          card={card}
          index={index}
          total={cards.length}
          container={container}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );

  if (!mounted) {
    return content;
  }

  return reduceMotion ? (
    content
  ) : (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {content}
    </ReactLenis>
  );
}
