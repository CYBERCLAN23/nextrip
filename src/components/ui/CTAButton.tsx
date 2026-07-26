import React from 'react'

interface CTAButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  className?: string
  onClick?: () => void
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ children, variant = 'primary', size = 'medium', className = '', onClick, ...props }, ref) => {
    const classes = [
      'btn',
      `btn--${size}`,
      `btn--${variant}`,
      className,
    ].filter(Boolean).join(' ')

    return (
      <button
        ref={ref}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)

CTAButton.displayName = 'CTAButton'

export { CTAButton }
export default CTAButton
