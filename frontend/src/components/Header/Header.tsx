import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import bagIcon from '../../assets/bag-icon.svg'
import './Header.scss'

interface HeaderProps {
  cartCount?: number
}

export const Header = ({ cartCount = 0 }: HeaderProps) => {
  const location = useLocation()
  const isShoppingBagPage = location.pathname === '/cart'

  return (
    <header
      className={`navbar ${isShoppingBagPage ? 'navbar--shopping-bag' : ''}`}
      aria-label="Barra de navegación principal"
    >
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link to="/" aria-label="Ir al listado de teléfonos">
            <img src={logo} alt="MBST logo" className="navbar-title" />
          </Link>
        </div>
        <div className="navbar-right">
          <Link to="/cart" className="navbar-cart" aria-label="Ver carrito">
            <img src={bagIcon} alt="shopping-bag" aria-hidden="true" />
            <span id="cart-count" aria-hidden="true">{cartCount}</span>
            <span className="visually-hidden">
              {cartCount} productos en el carrito
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

