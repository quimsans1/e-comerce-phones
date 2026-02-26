import { Link } from 'react-router-dom'
import './Header.scss'

type HeaderProps = {
  cartCount?: number
}

export const Header = ({ cartCount = 0 }: HeaderProps) => {
  return (
    <header className="navbar" aria-label="Barra de navegación principal">
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link to="/" aria-label="Ir al listado de teléfonos">
            <span className="navbar-title">MBST</span>
          </Link>
        </div>
        <div className="navbar-right">
          <Link to="/cart" className="navbar-cart" aria-label="Ver carrito">
            <span aria-hidden="true">🛒</span>
            <span aria-hidden="true">{cartCount}</span>
            <span className="visually-hidden">
              {cartCount} productos en el carrito
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

