import React from "react"
import { cn } from "@/lib/cn"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 text-base rounded-xl",
            "bg-white border",
            "text-[var(--color-text-primary)] placeholder:text-[var(--color-neutral-400)]",
            "transition-all duration-200 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)] focus:border-[var(--color-primary-500)]",
            error
              ? "border-[var(--color-accent-400)] focus:ring-[var(--color-accent-300)] focus:border-[var(--color-accent-500)]"
              : "border-[var(--color-border-default)] hover:border-[var(--color-primary-300)]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-50)]",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-[var(--color-accent-500)] m-0" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-[var(--color-text-secondary)] m-0">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
export type { InputProps }
