import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // ✅ Load cart from localStorage on first render
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // ✅ Update totals & save to localStorage whenever cart changes
  useEffect(() => {
    const newCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const newCartTotal = cartItems.reduce((total, item) => total + item.discountedPrice * item.quantity, 0); // ✅ Use discountedPrice

    setCartQuantity(newCartQuantity);
    setCartTotal(newCartTotal);

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add item to cart (Fixes price issue)
  const addItemToCart = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                packQuantity: (i.quantity + item.quantity) * i.originalPackQuantity,
              }
            : i
        );
      }
      return [...prevCart, { ...item, packQuantity: item.quantity * item.originalPackQuantity }];
    });
  };

  // ✅ Update item quantity (Fixes price calculation)
  const updateItemQuantity = (id, quantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              packQuantity: quantity * item.originalPackQuantity,
            }
          : item
      )
    );
  };

  // ✅ Remove item from cart
  const removeItemFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // ✅ Proceed to Payment (Corrects price & quantity)
  const proceedToPayment = async () => {
    try {
      const response = await axios.post("http://147.93.106.149:3001/api/cart/create", {
        lines: cartItems.map((item) => ({
          merchandiseId: item.id,
          quantity: item.packQuantity, // ✅ Use correct pack quantity
          price: item.discountedPrice, // ✅ Use correct discounted price
        })),
      });

      if (response.data && response.data.checkoutUrl) {
        console.log("Redirecting to Shopify checkout");
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
