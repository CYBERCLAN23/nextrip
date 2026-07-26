import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const cardVariants = cva(
  [
    "rounded-2xl transition-all duration-400 ease-out",
    "border border-[var(--color-border-default)]",
    "shadow-[0_20px_50px_rgba(15,23,42,0.06)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-surface-card)]",
        elevated:
          "bg-[var(--color-surface-card)] shadow-[0_12px_40px_rgba(15,23,42,0.08)]",
        glass:
          "bg-white/70 backdrop-blur-xl border-white/20",
        ghost:
          "bg-transparent border-transparent shadow-none",
      },
      interactive: {
        true:
          "cursor-pointer hover:-translate-y-2 hover:border-[var(--color-secondary-500)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.06),0_0_0_1px_rgba(29,95,209,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary-500)]",
      },
      padding: {
        none: "",
        sm: "p-5",
        md: "p-7",
        lg: "p-9",
        xl: "p-12",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, interactive, padding, className }))}
        {...props}
      />
    )
  }
)

Card.displayName = "Card"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-4 mb-4", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props} />
  )
)
CardBody.displayName = "CardBody"

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 mt-auto pt-4", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardBody, CardFooter, cardVariants }
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps }
