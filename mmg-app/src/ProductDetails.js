import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";

const ProductDetails = () => {
  const { handle } = useParams(); // Extract the product handle from the URL
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartVisible, setCartVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/product/${handle}`
        );
        console.log("Fetched product:", response.data); // Debug fetched product

        setProduct(response.data);

        // Automatically select the first available variant
        const firstAvailableVariant = response.data.variants.edges.find(
          ({ node }) => node.availableForSale
        )?.node;
        setSelectedVariant(firstAvailableVariant || null);
        setQuantity(1); // Set initial quantity to 1
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [handle]);

  const handleQuantityChange = (delta) => {
    if (!selectedVariant) return;

    const maxAvailable = selectedVariant.quantityAvailable;
    const newQuantity = quantity + delta;

    // Update quantity only within valid range
    if (newQuantity >= 1 && newQuantity <= maxAvailable) {
      setQuantity(newQuantity);
    }
  };

  const totalPrice = selectedVariant
    ? (selectedVariant.priceV2.amount * quantity).toFixed(2)
    : 0;

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  // Create cart and proceed to checkout
  const proceedToPayment = async () => {
    if (!selectedVariant) {
      alert("No product selected.");
      return;
    }

    const cartItems = [
      {
        merchandiseId: selectedVariant.id,
        quantity: quantity,
      },
    ];

    console.log("Cart items being sent:", cartItems); 

    try {
      // Send request to backend to create a cart and generate the checkout URL
      const response = await axios.post("http://localhost:3001/api/cart/create", {
        lines: cartItems,
      });

      console.log("Response from backend:", response.data);

      if (response.data && response.data.checkoutUrl) {
        // Redirect to the Shopify checkout page
        window.location.href = response.data.checkoutUrl;
      } else {
        alert("Error creating cart or fetching checkout URL.");
      }
    } catch (err) {
      console.error("Error proceeding to payment:", err);
      alert("There was an error with the checkout process.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, description, images, variants } = product;

  return (
    <div className="product-details-container">
      <div className="product-details-left">
        {images.edges[0]?.node.src ? (
          <img
            src={images.edges[0].node.src}
            alt={images.edges[0].node.altText || "Product Image"}
            className="product-details-image"
          />
        ) : (
          <div className="placeholder">No Image Available</div>
        )}
      </div>

      <div className="product-details-right">
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>

        <div className="variant-selection">
          <label>Select Variant:</label>
          <select
            value={selectedVariant?.id || ""}
            onChange={(e) => {
              const variant = variants.edges.find(
                ({ node }) => node.id === e.target.value
              )?.node;
              setSelectedVariant(variant);
              setQuantity(1); // Reset quantity when changing variant
            }}
          >
            {variants.edges.map(({ node }) => (
              <option key={node.id} value={node.id}>
                {node.title}
              </option>
            ))}
          </select>
        </div>

        <div className="quantity-control">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1} // Disable if quantity is 1 or less
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= selectedVariant?.quantityAvailable} // Disable if quantity exceeds available stock
          >
            +
          </button>
        </div>

        <p className="price">
          Price: ${selectedVariant?.priceV2.amount} (Total: ${totalPrice})
        </p>

        <button
          className="add-to-cart-button"
          disabled={!selectedVariant?.availableForSale}
          onClick={toggleCart}
        >
          Add to Cart
        </button>
      </div>

      {/* Cart Panel */}
      {cartVisible && (
        <div className="cart-panel">
          <button className="close-cart" onClick={toggleCart}>
            &times;
          </button>
          <h2>Cart</h2>
          <div className="cart-item">
            <img
              src={images.edges[0].node.src}
              alt={images.edges[0].node.altText || "Product Image"}
              className="cart-image"
            />
            <div className="cart-details">
              <h3>{title}</h3>
              <p>Variant: {selectedVariant?.title}</p>
              <p>Price: ${selectedVariant?.priceV2.amount}</p>
              <div className="quantity">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= selectedVariant?.quantityAvailable}
                >
                  +
                </button>
              </div>
              <p>Total: ${totalPrice}</p>
            </div>
          </div>
          <div className="checkout-option">
            <button className="checkout" onClick={proceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
