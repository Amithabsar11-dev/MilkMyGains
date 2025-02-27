import { createContext, useState, useEffect } from 'react';
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = sessionStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(() => {
    const savedCartTotal = sessionStorage.getItem('cartTotal');
    return savedCartTotal ? JSON.parse(savedCartTotal) : 0;
  });

  useEffect(() => {
    // Save cart items to session storage whenever cartItems changes
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    sessionStorage.setItem('cartTotal', JSON.stringify(cartTotal));

    // Calculate cart quantity based on cart items
    const newCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(newCartQuantity);
  }, [cartItems, cartTotal]);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        return [...prevItems]; // Return a new array reference
      } else {
        return [...prevItems, item]; // Add new item
      }
    });
    // Removed setCartQuantity from here
    setCartTotal((prevTotal) => prevTotal + item.price * item.quantity);
  };
 
  const removeItemFromCart = (id) => {
    const itemIndex = cartItems.findIndex((i) => i.id === id);
    if (itemIndex !== -1) {
      const item = cartItems[itemIndex];
      cartItems.splice(itemIndex, 1);
      setCartItems([...cartItems]);
      setCartQuantity((prevQuantity) => prevQuantity - item.quantity);
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
      setCartQuantity((prevQuantity) => prevQuantity - item.quantity + quantity);
      setCartTotal(cartTotal - item.price * item.quantity + item.price * quantity);
    }
  };

  const proceedToPayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/cart/create",
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