import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";

const ProductDetails = () => {
  const { handle } = useParams(); // Extract the product handle from the URL
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [packQuantity, setPackQuantity] = useState(1); // Default pack quantity
  const [purchaseOption, setPurchaseOption] = useState("oneTime"); // Default: One Time Purchase
  const [cartVisible, setCartVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/product/${handle}`
        );

        setProduct(response.data);

        // Automatically select the first available variant
        const firstAvailableVariant = response.data.variants.edges.find(
          ({ node }) => node.availableForSale
        )?.node;
        setSelectedVariant(firstAvailableVariant || null);
        setPackQuantity(1); // Default to Pack of 1
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [handle]);

  const totalPrice =
    purchaseOption === "subscribe"
      ? selectedVariant
        ? (selectedVariant.priceV2.amount * packQuantity * 0.8).toFixed(2) 
        : 0
      : selectedVariant
      ? (selectedVariant.priceV2.amount * packQuantity).toFixed(2)
      : 0;

  const handlePackSelection = (quantity) => {
    setPackQuantity(quantity);

    // Reset purchase option to "One Time Purchase"
    setPurchaseOption("oneTime");
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const proceedToPayment = async () => {
    if (!selectedVariant) {
      alert("No product selected.");
      return;
    }
  
    const cartItems = [
      {
        merchandiseId: selectedVariant.id,
        quantity: packQuantity,
        purchaseOption,
        price: totalPrice, // Pass the total price (discounted price)
      },
    ];
  
    try {
      const response = await axios.post("http://localhost:3001/api/cart/create", {
        lines: cartItems,
      });
  
      if (response.data && response.data.checkoutUrl) {
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
      <div className="product-details-left col-sm-6">
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

      <div className="product-details-right col-sm-6">
        <h1 className="details-title">{title}</h1>
        <hr className="horizontal-line"></hr>

        <div className="pack-selection">
          <h4 className="quantity">Quantity:</h4>
          <div className="pack-buttons">
            <button
              className="pack-button"
              disabled={selectedVariant?.quantityAvailable < 1}
              onClick={() => handlePackSelection(1)}
            >
              Pack of 1
            </button>
            <button
              className="pack-button"
              disabled={selectedVariant?.quantityAvailable < 4}
              onClick={() => handlePackSelection(4)}
            >
              Pack of 4
            </button>
            <button
              className="pack-button"
              disabled={selectedVariant?.quantityAvailable < 6}
              onClick={() => handlePackSelection(6)}
            >
              Pack of 6
            </button>
          </div>
        </div>
        <hr className="horizontal-line"></hr>

        <div className="purchase-options">
          <div className="purchase-option-row">
            <label>
              <input
                type="radio"
                value="oneTime"
                checked={purchaseOption === "oneTime"}
                onChange={() => setPurchaseOption("oneTime")}
              />
              <span>One Time Purchase</span>
            </label>
            <span className="price">₹{(selectedVariant?.priceV2.amount * packQuantity).toFixed(2)}</span>
          </div>
          {packQuantity > 1 && (
            <div className="purchase-option-row">
              <label>
                <input
                  type="radio"
                  value="subscribe"
                  checked={purchaseOption === "subscribe"}
                  onChange={() => setPurchaseOption("subscribe")}
                />
                <span>Subscribe and Save</span>
              </label>
              <span className="price">₹{(selectedVariant?.priceV2.amount * packQuantity * 0.8).toFixed(2)}</span>
            </div>
          )}
        </div>

        <p className="price">
          Total: ₹{totalPrice}
        </p>

        <button
          className="add-to-cart-button"
          disabled={!selectedVariant?.availableForSale}
          onClick={toggleCart}
        >
          Add to Cart
        </button>
      </div>

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
              <p>Price: ₹{totalPrice}</p>
              <p>Quantity: {packQuantity}</p>
              <p>Purchase Option: {purchaseOption}</p>
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
