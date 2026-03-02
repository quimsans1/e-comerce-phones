import './OptionsSelector.scss'

type OptionItem = {
  id: string
  label: string
}

interface OptionsSelectorProps {
  options: OptionItem[]
  selectedIndex: number | null
  onSelect: (index: number) => void
}

export const OptionsSelector = ({
  options,
  selectedIndex,
  onSelect,
}: OptionsSelectorProps) => {
  return (
    <div className="options-selector options-selector__list">
      {options.map((option, index) => (
        <button
          key={option.id}
          type="button"
          className={`options-selector__button ${selectedIndex === index ? 'is-selected' : ''}`}
          onClick={() => onSelect(index)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
