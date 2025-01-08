import { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

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
      setCartItems([...cartItems]);
      setCartQuantity(cartQuantity - item.quantity + quantity);
      setCartTotal(cartTotal - item.price * item.quantity + item.price * quantity);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };