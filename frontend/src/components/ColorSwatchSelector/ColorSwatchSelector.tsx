import { useState } from 'react'
import type { ProductColorOption } from '../../types'
import './ColorSwatchSelector.scss'

interface ColorSwatchSelectorProps {
  options: ProductColorOption[]
  selectedIndex: number | null
  onSelect: (index: number) => void
}

export const ColorSwatchSelector = ({
  options,
  selectedIndex,
  onSelect,
}: ColorSwatchSelectorProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const selectedName =
    hoveredIndex !== null
      ? options[hoveredIndex]?.name
      : selectedIndex !== null
        ? options[selectedIndex]?.name
        : options[0]?.name

  return (
    <div className="color-swatch-selector">
      <div className="color-swatch-selector-options">
        {options.map((option, index) => (
          <button
            key={`${option.name}-${index}`}
            type="button"
            className={`color-swatch-selector-swatch ${selectedIndex === index ? 'is-selected' : ''}`}
            style={{ backgroundColor: option.hexCode }}
            onClick={() => onSelect(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            aria-label={option.name}
          />
        ))}
      </div>
      <p key={selectedName} className="color-swatch-selector-name">
        {selectedName}
      </p>
    </div>
  )
}

export default ColorSwatchSelector
