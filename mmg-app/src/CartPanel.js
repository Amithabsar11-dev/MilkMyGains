import React from 'react';
import { useContext } from 'react';
import { CartContext } from './cartContext';

const CartPanel = ({ onClose }) => {
  const { cartItems, cartQuantity, cartTotal, updateItemQuantity, removeItemFromCart } = useContext(CartContext);

  return (
    <div className="cart-panel">
      <div className="cart-items-wrapper">
        <button className="close-cart" onClick={onClose}>
          &times;
        </button>
        <h2>Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title || "Product Image"}
              className="cart-image"
            />
            <div className="cart-details">
              <h3>{item.title}</h3>
              <p>Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <div className="quantity-controls">
                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-option">
        <p>Total: ₹{cartTotal.toFixed(2)}</p>
        <button className="checkout">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CartPanel;