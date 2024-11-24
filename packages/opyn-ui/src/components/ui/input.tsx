import { cn } from '@opyn/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-secondary p-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'file:text-foreground',
        quantity:
          'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

const DecoratedInput = React.forwardRef<
  HTMLInputElement,
  InputProps & { deco: React.ReactNode }
>(({ className, type, deco, ...props }, ref) => {
  return (
    <div className="relative">
      <Input
        type={type}
        className={cn('pr-10', className)}
        ref={ref}
        {...props}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        {deco}
      </div>
    </div>
  )
})
DecoratedInput.displayName = 'DecoratedInput'

function QuantityInput({
  className,
  deco,
  value,
  ...props
}: NumericFormatProps & { deco: React.ReactNode }) {
  return (
    <div className="relative">
      <NumericFormat
        value={value as string}
        customInput={Input}
        allowLeadingZeros
        thousandSeparator=","
        decimalScale={2}
        className={cn('pr-10', className)}
        {...props}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        {deco}
      </div>
    </div>
  )
}
QuantityInput.displayName = 'QuantityInput'

export { Input, DecoratedInput, QuantityInput }
