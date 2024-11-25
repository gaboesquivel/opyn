export function OrderDetails() {
  return (
    <div className="space-y-2 text-xs mb-4 text-neutral-light">
      <div className="flex justify-between">
        <span className="">Asset Leverage</span>
        <span>
          2X → <span className="text-white">20X</span>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="">Liquidation price (Low)</span>
        <span>
          $3,000.00 → <span className="text-white">$3,100.00</span>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="">Liquidation price (High)</span>
        <span>
          $3,581.00 → <span className="text-white">$3,308.00</span>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="">Execution Price</span>
        <span className="text-red-500">$3,183.18 -4.18%</span>
      </div>
      <div className="flex justify-between">
        <span className="">Funding</span>
        <span className="text-green-500">+0.002%</span>
      </div>
      <div className="flex justify-between">
        <span className="">Fees</span>
        <span>$71.12</span>
      </div>
    </div>
  )
}
