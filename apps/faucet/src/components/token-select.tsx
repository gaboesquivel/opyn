import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SelectProps } from '@radix-ui/react-select'

export function TokenSelect({ options, ...props }: TokenSelectParams) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-[260px]">
        <SelectValue placeholder="Select a token" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Token</SelectLabel>
          {options.map((o, i) => (
            <SelectItem key={o.address} value={i.toString()}>
              {o.symbol} on Sepolia
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

interface TokenSelectParams extends SelectProps {
  options: TokenContractData[]
}
