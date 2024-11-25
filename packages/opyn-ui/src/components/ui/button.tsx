import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@opyn/ui'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive',
        outline:
          'border border-primary bg-none hover:bg-none hover:text-accent-foreground p-2',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        positve:
          'bg-positive/20 hover:bg-positive/20 text-positive hover:text-positive',
        up: 'border border-positive bg-positive/20 hover:bg-positive/20 text-positive hover:text-positive',
        down: 'border border-negative bg-negative/20 hover:bg-negative/20 text-negative hover:text-negative',
        brand:
          'border border-brand bg-brand/20 hover:bg-brand/20 text-brand hover:text-brand',
        inactive:
          'border border-primary  bg-primary/20 hover:bg-primary/20 text-negative hover:text-tertiary text-tertiary',
        subtle:
          'bg-subtle text-tertiary hover:bg-subtle/80 h-8 text-light font-normal',
        brand: 'bg-brand-600 hover:bg-brand-600/90 text-black'
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 rounded-full px-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
