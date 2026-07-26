import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-semibold leading-none",
    "transition-all duration-300 ease-out",
    "outline-none cursor-pointer rounded-full",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-500)] text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 focus-visible:outline-[var(--color-primary-600)]",
        secondary:
          "bg-white/80 text-[var(--color-neutral-900)] backdrop-blur-xl border border-black/10 hover:bg-white/95 hover:scale-105 active:scale-95 focus-visible:outline-[var(--color-neutral-900)]",
        ghost:
          "text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] active:scale-95 focus-visible:outline-[var(--color-primary-600)]",
        outline:
          "border-2 border-[var(--color-primary-600)] text-[var(--color-primary-600)] bg-transparent hover:bg-[var(--color-primary-600)] hover:text-white active:scale-95 focus-visible:outline-[var(--color-primary-600)]",
        danger:
          "bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-600)] hover:scale-105 active:scale-95 focus-visible:outline-[var(--color-accent-500)]",
      },
      size: {
        sm: "px-6 py-3 text-sm gap-2",
        md: "px-8 py-4 text-base gap-2.5",
        lg: "px-10 py-5 text-lg gap-3",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonProps }
