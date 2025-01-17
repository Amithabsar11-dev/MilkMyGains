import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from './cartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import Logo from './assets/Logo.png';
import Cart from './assets/cart.svg';
import CartPanel from './CartPanel';
import StarTop from './assets/startop.svg';

const Header = () => {
  const { cartQuantity } = useContext(CartContext);
  const [cartPanelOpen, setCartPanelOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <div className='free-shipping'>
        <img src={StarTop} className='star-top' alt='startop' />
       <h1 className='free-heading'>FREE SHIPPING ON ORDERS ABOVE 500/-</h1>
       <img src={StarTop} className='star-top' alt='startop' />
      </div>
      <hr className='border-line'></hr>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-4">
            <img src={Logo} alt="Logo" className="logo" />
          </div>
          <div className="col-8 nav-style">
            <nav className="navbar">
              {/* Toggle Button (Hidden on Desktop) */}
              {!isDesktop && (
                <button
                  className={`navbar-toggler ${isNavOpen ? 'open' : ''}`}
                  onClick={() => setIsNavOpen(!isNavOpen)}
                >
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </button>
              )}

              {/* Navigation Menu */}
              <div className={`navbar-menu ${isNavOpen || isDesktop ? 'active' : ''}`}>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#subscribe">Subscribe</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#product">Products</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#about">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#contact">Contact</a>
                  </li>
                  <li>
                    <div style={{ position: 'relative' }}>
                      <img src={Cart} alt="cart" className="cart-icon" onClick={() => setCartPanelOpen(true)} />
                      {cartQuantity > 0 && (
                        <span className="cartquantity">
                          {cartQuantity}
                        </span>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {cartPanelOpen && <CartPanel onClose={() => setCartPanelOpen(false)} />}
    </header>
  );
};

export default Header;
