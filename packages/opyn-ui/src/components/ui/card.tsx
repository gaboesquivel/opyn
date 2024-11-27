import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@opyn/ui'

const cardVariants = cva(
  'rounded-lg bg-card text-card-foreground overflow-hidden w-full',
  {
    variants: {
      variant: {
        default: 'bg-gray-1000',
        padded: 'p-2 sm:p-4',
        outline:
          'border border-primary bg-transparent hover:bg-transparent text-neutral-light p-2 sm:p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, className }))} {...props} />
}
Card.displayName = 'Card'

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-2 sm:py-4', className)}
      {...props}
    />
  )
}
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-2 sm:p-4 pt-0', className)} {...props} />
}
CardContent.displayName = 'CardContent'

function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center p-2 sm:p-4 pt-0', className)}
      {...props}
    />
  )
}
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
