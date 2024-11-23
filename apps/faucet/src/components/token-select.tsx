import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Tables } from '@opyn/supabase'
import type { SelectProps } from '@radix-ui/react-select'

export function TokenSelect({
  tokens,
  ...props
}: { tokens: Tables<'asset'>[] } & SelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-[260px]">
        <SelectValue placeholder="Select a token" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Token</SelectLabel>
          {tokens.map((o, i) => (
            <SelectItem key={o.address} value={i.toString()}>
              {o.symbol} on Sepolia
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
