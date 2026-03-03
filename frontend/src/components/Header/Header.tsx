import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import bagIcon from '../../assets/bag-icon.svg'
import bagIconBlack from '../../assets/bag-icon-black.svg'
import './Header.scss'

interface HeaderProps {
  cartCount?: number
}

export const Header = ({ cartCount = 0 }: HeaderProps) => {
  const location = useLocation()
  const isShoppingBagPage = location.pathname === '/cart'
  const shoppingBagIcon = cartCount > 0 ? bagIconBlack : bagIcon

  return (
    // Accessibility: header has aria-label for screen readers
    <header
      className={`navbar ${isShoppingBagPage ? 'navbar--shopping-bag' : ''}`}
      aria-label="Main navigation menu with links to home and shopping bag"
    >
      <div className="navbar-inner">
        <div className="navbar-left">
          {/* Accessibility: explicit label clarifies that the logo link returns to the product list. */}
          <Link to="/" aria-label="Go to the product list">
            <img src={logo} alt="MBST logo" className="navbar-title" />
          </Link>
        </div>

        <div className="navbar-right">  
          {/* Accessibility: destination label and item-count summary */}
          <Link to="/cart" className="navbar-cart" aria-label="Go to the shopping bag">
            {/* Accessibility: icon and cart count are hidden because the accessible name is provided by the visually hidden text */}
            <img src={shoppingBagIcon} alt="shopping-bag" aria-hidden="true" />
            <span id="cart-count" aria-hidden="true">{cartCount}</span>

            {/* Accessibility: announces current item count  */}
            <span className="visually-hidden">
              {cartCount} products in the shopping bag
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

