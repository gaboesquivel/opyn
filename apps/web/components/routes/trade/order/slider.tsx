import { Slider } from '@/components/ui/slider'
import { useQueryState } from 'nuqs'
import { useState } from 'react'

export function LeverageSlider() {
  const [leverage, setLeverage] = useQueryState<number>('lev', {
    defaultValue: 0.1,
    clearOnDefault: true,
    parse: (value) => Number.parseFloat(value),
  })
  const [sliderValue, setSliderValue] = useState(
    leverageToSliderPosition(leverage),
  )
  return (
    <div className="my-4 relative text-neutral-light flex w-full gap-4 swiper-no-swiping">
      <div className="flex-1 swiper-no-swiping">
        <Slider
          value={[sliderValue]}
          onValueChange={(value) => {
            const newSliderValue = value[0]
            setSliderValue(newSliderValue)
            const leverage = mapSliderToLeverage(newSliderValue)
            setLeverage(leverage)
          }}
          min={0}
          max={100}
          step={0.1}
          className="w-full cursor-pointer"
          variant="brand"
        />
        <div className="flex justify-between text-xs mt-2 px-1">
          {leverageValues.map((value, index) => (
            <span
              key={`${value}X`}
              className="cursor-pointer"
              onClick={() => {
                const newSliderValue = sliderPositions[index]
                setSliderValue(newSliderValue)
                setLeverage(value)
              }}
            >
              {value}x
            </span>
          ))}
        </div>
      </div>
      <div className="bg-secondary px-2 py-1 rounded text-sm items-center flex justify-center text-center min-w-[55px]">
        {leverage}X
      </div>
    </div>
  )
}

// Define the types for the arrays
const sliderPositions: number[] = [0, 18.6, 32.4, 46.9, 62.1, 79.7, 100] // Slider UI positions including 0
const leverageValues: number[] = [0.1, 1, 2, 5, 10, 15, 20] // Corresponding leverage values

// Function to floor a number to one decimal place
function floorToOneDecimal(num: number): number {
  return Math.floor(num * 10) / 10
}

// Function to map slider value (0-100) to leverage value using piecewise linear interpolation
function mapSliderToLeverage(sliderValue: number): number {
  for (let i = 0; i < sliderPositions.length - 1; i++) {
    const startPos = sliderPositions[i]
    const endPos = sliderPositions[i + 1]

    if (sliderValue >= startPos && sliderValue <= endPos) {
      // Linear interpolation between two leverage values
      const ratio = (sliderValue - startPos) / (endPos - startPos)
      const startLev = leverageValues[i]
      const endLev = leverageValues[i + 1]

      // Calculate leverage and floor to 1 decimal place
      return floorToOneDecimal(startLev + ratio * (endLev - startLev))
    }
  }

  return leverageValues[leverageValues.length - 1] // Return max leverage if slider value exceeds max range
}

// Function to map leverage value to slider position (0-100) using piecewise linear interpolation
function leverageToSliderPosition(leverage: number): number {
  for (let i = 0; i < leverageValues.length - 1; i++) {
    const startLev = leverageValues[i]
    const endLev = leverageValues[i + 1]

    if (leverage >= startLev && leverage <= endLev) {
      // Linear interpolation between two slider positions
      const ratio = (leverage - startLev) / (endLev - startLev)
      const startPos = sliderPositions[i]
      const endPos = sliderPositions[i + 1]

      return startPos + ratio * (endPos - startPos)
    }
  }

  return sliderPositions[sliderPositions.length - 1] // Return max position if leverage exceeds max range
}
