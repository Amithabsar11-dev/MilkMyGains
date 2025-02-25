import { createContext, useState, useEffect } from 'react';
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from local storage if available
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [cartQuantity, setCartQuantity] = useState(() => {
    // Load cart quantity from local storage if available
    const savedCartQuantity = localStorage.getItem('cartQuantity');
    return savedCartQuantity ? JSON.parse(savedCartQuantity) : 0;
  });

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Update local storage whenever cartItems or cartQuantity changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
  }, [cartItems, cartQuantity]);

  const addItemToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartItems.push(item);
    }
    setCartItems([...cartItems]);
    setCartQuantity(cartQuantity + item.quantity);
    setCartTotal(cartTotal + item.price * item.quantity);
  };

  const removeItemFromCart = (id) => {
    const itemIndex = cartItems.findIndex((i) => i.id === id);
    if (itemIndex !== -1) {
      const item = cartItems[itemIndex];
      cartItems.splice(itemIndex, 1);
      setCartItems([...cartItems]);
      setCartQuantity(cartQuantity - item.quantity);
      setCartTotal(cartTotal - item.price * item.quantity);
    }
  };

  const updateItemQuantity = (id, quantity) => {
    const itemIndex = cartItems.findIndex((i) => i.id === id);
    if (itemIndex !== -1) {
      const item = cartItems[itemIndex];
      item.quantity = quantity;
      item.packQuantity = quantity * item.originalPackQuantity;
      setCartItems([...cartItems]);
      setCartQuantity(cartQuantity - item.quantity + quantity);
      setCartTotal(cartTotal - item.price * item.quantity + item.price * quantity);
    }
  };

  const proceedToPayment = async () => {
    try {
      const response = await axios.post(
        "http://147.93.106.149:3001/api/cart/create",
        {
          lines: cartItems.map((item) => ({
            merchandiseId: item.id,
            quantity: item.packQuantity,
            price: item.price,
          })),
        }
      );
      if (response.data && response.data.checkoutUrl) {
        console.log('Redirecting to Shopify checkout');
        window.location.href = response.data.checkoutUrl;
      } else {
        alert("Error creating cart or fetching checkout URL.");
      }
    } catch (err) {
      console.error("Error proceeding to payment:", err);
      alert("There was an error with the checkout process.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        cartTotal,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        proceedToPayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };