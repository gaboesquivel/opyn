'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const sliderVariants = cva(
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      variant: {
        default: '',
        brand: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const trackVariants = cva(
  'relative h-2 w-full grow overflow-hidden rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-secondary',
        brand: 'bg-[#494D50]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const rangeVariants = cva('absolute h-full', {
  variants: {
    variant: {
      default: 'bg-primary',
      brand: 'bg-brand',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const thumbVariants = cva(
  'block h-5 w-5 rounded-full border-2 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary',
        brand: 'bg-brand border-background',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderVariants({ variant, className }))}
    {...props}
  >
    <SliderPrimitive.Track className={trackVariants({ variant })}>
      <SliderPrimitive.Range className={rangeVariants({ variant })} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={thumbVariants({ variant })} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
