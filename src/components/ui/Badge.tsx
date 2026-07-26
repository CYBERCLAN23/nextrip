import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const badgeVariants = cva(
  "inline-flex items-center font-semibold text-xs uppercase tracking-wider rounded-full",
  {
    variants: {
      variant: {
        default:
          "text-[var(--color-primary-600)] bg-[var(--color-primary-50)]",
        outline:
          "text-[var(--color-primary-600)] border border-[var(--color-primary-200)] bg-transparent",
        subtle:
          "text-[var(--color-neutral-600)] bg-[var(--color-neutral-100)]",
        white:
          "text-[var(--color-neutral-900)] bg-white/80 backdrop-blur-xl border border-black/10",
        success:
          "text-[var(--color-success-700)] bg-[var(--color-success-50)]",
      },
      size: {
        sm: "px-2.5 py-1 gap-1",
        md: "px-4 py-1.5 gap-1.5",
        lg: "px-5 py-2 gap-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge, badgeVariants }
export type { BadgeProps }
