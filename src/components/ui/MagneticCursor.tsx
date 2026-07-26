"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface MagneticCursorProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticCursor({
  children,
  className,
  strength = 0.3,
}: MagneticCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      gsap.to(cursor, {
        x: mouseX * strength,
        y: mouseY * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      gsap.to(cursor, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <div
        ref={cursorRef}
        className={cn(
          "absolute inset-0 rounded-full pointer-events-none z-10",
          "bg-primary/10 border border-primary/20",
          "transition-opacity duration-200",
          isHovering ? "opacity-100 scale-110" : "opacity-0 scale-100"
        )}
        style={{
          width: "100%",
          height: "100%",
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
        }}
      />
      {children}
    </div>
  );
}

export default MagneticCursor;