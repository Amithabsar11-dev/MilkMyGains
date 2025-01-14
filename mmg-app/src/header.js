import React, { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from './cartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import Logo from './assets/Logo.png';
import Cart from './assets/cart.svg';
import CartPanel from './CartPanel';

const Header = () => {
  const { cartQuantity } = useContext(CartContext);
  const [cartPanelOpen, setCartPanelOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-4">
            <img src={Logo} alt="Logo" className="logo" />
          </div>
          <div className="col-8 nav-style">
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse navbar-style" id="navbarNav">
                <ul className="navbar-nav ml-auto">
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
                      <img src={Cart} alt='cart' className='cart-icon' onClick={() => setCartPanelOpen(true)}/>
                      {cartQuantity > 0 && (
                        <span className='cartquantity' style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '40px',
                          backgroundColor: 'red',
                          color: 'white',
                          borderRadius: '50%',
                          padding: '2px 6px',
                          fontSize: '12px',
                        }}>
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