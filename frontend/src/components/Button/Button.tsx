import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.scss'

type ButtonStyleType = 'black' | 'white'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode
  type?: ButtonStyleType
  buttonType?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  children,
  type = 'black',
  buttonType = 'button',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={buttonType}
      className={['button', `button--${type}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button