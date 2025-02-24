import React , { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from './cartContext';
import "./productDetails.css";

const CartPanel = ({ onClose, isOpen }) => {
  const { cartItems, cartQuantity, cartTotal, updateItemQuantity, removeItemFromCart, proceedToPayment } = useContext(CartContext);
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isOpenState, setIsOpenState] = useState(false);

  const handleProceedToPayment = () => {
    console.log('Proceed to payment button clicked');
    proceedToPayment();
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Show immediately when opening
      setTimeout(() => setIsOpenState(true), 100); // Delay adding the open class
    } else {
      setIsOpenState(false); // Remove open class immediately
      setTimeout(() => setIsVisible(false), 300); // Delay hiding to match transition
    }
  }, [isOpen]);

  if (!isVisible) return null; // Only render when needed

  return (
    <div className={`cart-panel ${isOpenState ? 'open' : 'closed'}`}>
      <div className="cart-items-wrapper">
        <h2 className="close-cart" onClick={onClose}>
          &times;
        </h2>
        <h2 className='cart-panel-heading'>Your Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</h2>
        {cartItems.map((item) => {
          const titleParts = item.title.split(" - "); // Splitting title at " - "
          const mainTitle = titleParts[0]; // First part of the title
          const extraInfo = titleParts[1] ? `(${titleParts[1]})` : ""; // Second part in parentheses if exists

          return (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title || "Product Image"}
                className="cart-image"
              />
              <div className="cart-details">
                <div className='cart-selection'>
                  <h3 className='cart-title'>{mainTitle} {extraInfo}</h3>
                  <h2 className='remove-items' onClick={() => removeItemFromCart(item.id)}>&times;</h2>
                </div>
                <p className='qty-container'>
                  <div className="qty-buttons">
                    <p className='qty-quantity'>QTY: {item.quantity}</p>
                    <button className="circle-btn" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className="circle-btn" onClick={() => {
                      if (item.quantity > 1) {
                        updateItemQuantity(item.id, item.quantity - 1);
                      } else {
                        removeItemFromCart(item.id);
                      }
                    }}>-</button>
                  </div>
                  <p className='items-price'>₹{(item.price * item.quantity).toFixed(2)}</p>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="checkout-option">
        <div className='checkout-total'>
          <p className='subtotal'>
            SUB TOTAL
          </p>
          <p className='subtotal-amount'>
            ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
          </p>
        </div>
        <button className="checkout" onClick={handleProceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CartPanel;