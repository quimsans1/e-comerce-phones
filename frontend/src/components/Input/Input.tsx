import type { ChangeEvent, ReactNode } from 'react'
import './Input.scss'

interface InputProps {
  id?: string
  name?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  className?: string
  ariaLabel?: string
  marginTop?: string
  resultsIndicator?: ReactNode
}

export const Input = ({
  id,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
  ariaLabel,
  marginTop,
  resultsIndicator
}: InputProps) => {
  return (
    <div className="input-wrapper">
      <input
        id={id}
        name={name}
        className={["input", className].filter(Boolean).join(' ')}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-label={ariaLabel}
        style={{ marginTop }}
      />
      {resultsIndicator && (
        <span className="search-count">{resultsIndicator}</span>
      )}
    </div>
  )
}
