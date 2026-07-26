'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: Image[];
  /** Optional content overlay that fades in when the center image is fully zoomed */
  children?: React.ReactNode;
}

export function ZoomParallax({ images, children }: ZoomParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    // Reset refs array length to prevent memory leaks/stale elements
    imageRefs.current = imageRefs.current.slice(0, images.length);

    const ctx = gsap.context(() => {
      // Main timeline tied to the scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: sticky,
          pinSpacing: true,
        },
      });

      const scales = [4, 5, 6, 5, 6, 8, 9];

      // 1. Animate scales of all images
      imageRefs.current.forEach((el, index) => {
        if (!el) return;
        const targetScale = scales[index % scales.length];
        tl.to(
          el,
          {
            scale: targetScale,
            ease: 'none',
          },
          0
        ); // start all scaling at 0 on the timeline
      });

      // 2. Animate mask opacity on center image (index 0)
      if (maskRef.current) {
        tl.fromTo(
          maskRef.current,
          { opacity: 0 },
          { opacity: 0.85, ease: 'power1.out' },
          0.45 // start mask halfway through zoom
        );
      }

      // 3. Animate details content overlay
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.7 // fade in details in the last 30% of scroll
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [images]);

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full overflow-visible">
      <div
        ref={stickyRef}
        className="h-screen w-full overflow-hidden relative flex items-center justify-center"
      >
        {images.map(({ src, alt }, index) => {
          return (
            <div
              key={index}
              ref={(el) => {
                if (el) imageRefs.current[index] = el;
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className={`relative h-[25vh] w-[25vw] overflow-hidden rounded-2xl border border-neutral-200/10 shadow-2xl pointer-events-auto transition-shadow duration-300 ${
                  index === 1 ? '!-top-[30vh] !left-[5vw] !h-[30vh] !w-[35vw]' : ''
                } ${
                  index === 2 ? '!-top-[10vh] !-left-[25vw] !h-[45vh] !w-[20vw]' : ''
                } ${
                  index === 3 ? '!left-[27.5vw] !h-[25vh] !w-[25vw]' : ''
                } ${
                  index === 4 ? '!top-[27.5vh] !left-[5vw] !h-[25vh] !w-[20vw]' : ''
                } ${
                  index === 5 ? '!top-[27.5vh] !-left-[22.5vw] !h-[25vh] !w-[30vw]' : ''
                } ${
                  index === 6 ? '!top-[22.5vh] !left-[25vw] !h-[15vh] !w-[15vw]' : ''
                }`}
              >
                {/* Dark gradient mask on the center image */}
                {index === 0 && (
                  <div
                    ref={maskRef}
                    className="absolute inset-0 bg-neutral-950/90 z-10 opacity-0 pointer-events-none"
                  />
                )}
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          );
        })}

        {/* Detailed Content Overlay */}
        {children && (
          <div
            ref={contentRef}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 opacity-0 pointer-events-none [&_*]:pointer-events-auto"
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
