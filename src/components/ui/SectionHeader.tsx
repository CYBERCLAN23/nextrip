import React from "react"
import { cn } from "@/lib/cn"
import { Badge } from "./Badge"

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  align?: "center" | "left"
  className?: string
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ label, title, description, align = "center", className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-6 max-w-[700px]",
          align === "center" && "text-center items-center mx-auto",
          className
        )}
      >
        {label && <Badge>{label}</Badge>}
        <h2 className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] text-[var(--color-text-primary)] font-normal m-0">
          {title}
        </h2>
        {description && (
          <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] m-0">
            {description}
          </p>
        )}
      </div>
    )
  }
)

SectionHeader.displayName = "SectionHeader"

export { SectionHeader }
export type { SectionHeaderProps }
