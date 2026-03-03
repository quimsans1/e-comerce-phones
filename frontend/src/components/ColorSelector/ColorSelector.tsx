import { useState } from 'react'
import type { ProductDetail } from '../../types/ProductDetail'
import './ColorSelector.scss'

type ProductColorOption = ProductDetail['colorOptions'][number]

interface ColorSelectorProps {
  options: ProductColorOption[]
  selectedIndex: number | null
  onSelect: (index: number) => void
}

export const ColorSelector = ({
  options,
  selectedIndex,
  onSelect,
}: ColorSelectorProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const selectedName =
    hoveredIndex !== null
      ? options[hoveredIndex]?.name
      : selectedIndex !== null
        ? options[selectedIndex]?.name
        : undefined
  const showSelectedName = (selectedIndex !== null || hoveredIndex !== null) && Boolean(selectedName)

  return (
    <div className="color-selector">
      <div className="color-selector-options">
        {options.map((option, index) => (
          <button
            key={`${option.name}-${index}`}
            type="button"
            className={`color-selector-option ${selectedIndex === index ? 'is-selected' : ''}`}
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
      <span
        className={`color-selector-name ${showSelectedName ? '' : 'is-placeholder'}`}
        aria-hidden={!showSelectedName}
      >
        {showSelectedName ? selectedName : '\u00A0'}
      </span>
    </div>
  )
}
