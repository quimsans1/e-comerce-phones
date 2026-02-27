import type { ChangeEvent } from 'react'
import './Input.scss'

type InputProps = {
  id?: string
  name?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  className?: string
  ariaLabel?: string
  marginTop?: string
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
  marginTop
}: InputProps) => {
  return (
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
  )
}

export default Input
