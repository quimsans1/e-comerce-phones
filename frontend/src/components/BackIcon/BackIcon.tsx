import './BackIcon.scss'

interface BackIconProps {
  className?: string
}

export const BackIcon = ({ className = '' }: BackIconProps) => {
  return (
    <span className={["back-icon", className].filter(Boolean).join(' ')} aria-hidden="true">
      <svg viewBox="0 0 10 10" focusable="false">
        <path d="M6.5 1.5L3 5l3.5 3.5" />
      </svg>
    </span>
  )
}
