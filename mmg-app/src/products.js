import React, { useEffect, useState } from "react";
import axios from "axios";
import "./products.css";

const ProductDisplay = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/product");
        console.log("Product data fetched:", response.data); // Debug fetched product
        setProduct(response.data);

        // Automatically select the first available variant
        const firstAvailableVariant = response.data.variants.edges.find(
          ({ node }) => node.availableForSale
        )?.node;

        if (firstAvailableVariant) {
          console.log("First available variant:", firstAvailableVariant); // Debug first available variant
          setSelectedVariant(firstAvailableVariant);
          setQuantity(1); // Set initial quantity to 1
        } else {
          console.error("No variants available for sale.");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product data");
      }
    };

    fetchProduct();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, description, images, variants } = product;

  // Handle variant selection change
  const handleVariantChange = (e) => {
    const variantId = e.target.value;
    const variant = variants.edges.find(({ node }) => node.id === variantId).node;

    console.log("Variant selected:", variant); // Debug selected variant
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity to 1 when switching variants
  };

  // Handle quantity change
  const handleQuantityChange = (delta) => {
    if (!selectedVariant) return;

    const maxAvailable = selectedVariant.quantityAvailable;
    const newQuantity = quantity + delta;

    console.log("Current quantity:", quantity); // Debug current quantity
    console.log("Delta:", delta); // Debug quantity delta
    console.log("Max available:", maxAvailable); // Debug max available quantity

    // Update quantity only within valid range
    if (newQuantity >= 1 && newQuantity <= maxAvailable) {
      console.log("Updated quantity:", newQuantity); // Debug updated quantity
      setQuantity(newQuantity);
    }
  };

  // Calculate total price based on quantity
  const totalPrice = (selectedVariant?.priceV2.amount * quantity).toFixed(2);

  // Toggle cart visibility
  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="product-container">
      <div className={`content ${cartVisible ? "blur-content" : ""}`}>
        <div className="product">
          {/* Left: Product Image */}
          {images && images.edges.length > 0 && (
            <img
              src={images.edges[0].node.src}
              alt={images.edges[0].node.altText || "Product Image"}
              className="product-image"
            />
          )}

          {/* Right: Product Details */}
          <div className="product-details">
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{ __html: description }} />

            {/* Variants */}
            <div className="variants">
              <label htmlFor="variant-select">Select Variant:</label>
              <select
                id="variant-select"
                value={selectedVariant?.id || ""}
                onChange={handleVariantChange}
              >
                {variants.edges.map(({ node }) => (
                  <option key={node.id} value={node.id}>
                    {node.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <p className="price">Price: ${selectedVariant?.priceV2.amount}</p>

            {/* Quantity Selector */}
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

            {/* Total Price */}
            <p className="total-price">Total: ${totalPrice}</p>

            {/* Add to Cart Button */}
            <button
              className="add-to-cart"
              onClick={toggleCart}
              disabled={!selectedVariant?.availableForSale}
            >
              Add to Cart
            </button>
          </div>
        </div>
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
            <button className="checkout">Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
