import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";
import Cow from "./assets/cow.svg";
import Protein from "./assets/protein.svg";
import Farm from "./assets/farm.svg";
import Chemical from "./assets/chemical.svg";

const ProductDetails = () => {
  const { handle } = useParams(); // Extract the product handle from the URL
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [packQuantity, setPackQuantity] = useState(1); // Default pack quantity
  const [purchaseOption, setPurchaseOption] = useState("oneTime"); // Default: One Time Purchase
  const [cartVisible, setCartVisible] = useState(false);
  const [error, setError] = useState("");
  const [faqContent, setFaqContent] = useState(null);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/product/${handle}`
        ); 
        console.log("Full Response:", response.data); // Log the full response
        console.log("Metafields:", response.data.metafields); // Log the metafields
  
        // Access the metafields data
        const metafields = response.data.metafields;
        if (metafields && metafields.length > 0) {
          const firstMetafield = metafields[0];
          console.log("First Metafield:", firstMetafield);
          console.log("First Metafield Value:", firstMetafield.value);
        }
  
        // Add some additional logging to see where the metafields data is being reset
        console.log('Metafields before setting product:', response.data.metafields);
  
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
      const response = await axios.post(
        "http://localhost:3001/api/cart/create",
        {
          lines: cartItems,
        }
      );

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

  const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className={`accordion-section ${isOpen ? "open" : ""}`}>
        <div className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
          <span className="accordion-text">{title}</span>
          <span className="accordion-icon">{isOpen ? "" : "+"}</span>
        </div>
        {isOpen && (
          <div className="accordion-content">
            <span className="accordion-close" onClick={() => setIsOpen(false)}>
              ×
            </span>
            {content}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="product-details-page">
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
              <span className="price">
                ₹{(selectedVariant?.priceV2.amount * packQuantity).toFixed(2)}
              </span>
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
                <span className="price">
                  ₹
                  {(
                    selectedVariant?.priceV2.amount *
                    packQuantity *
                    0.8
                  ).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* <p className="price">
          Total: ₹{totalPrice}
        </p> */}

          <div className="feature-icons">
            <div className="feature-item">
              <img src={Cow} alt="Pure Cow Milk" />
              <p className="text-family">Pure Cow Milk</p>
            </div>
            <div className="feature-item">
              <img src={Chemical} alt="No Chemicals" />
              <p className="text-family">
                No Chemicals/ <br />
                Preservatives
              </p>
            </div>
            <div className="feature-item">
              <img src={Farm} alt="Farm Fresh" />
              <p className="text-family">Farm-Fresh Sourced</p>
            </div>
            <div className="feature-item">
              <img src={Protein} alt="High Protein" />
              <p className="text-family">High Protein</p>
            </div>
          </div>

          <div className="button-row">
            <button
              className="add-to-cart-button"
              disabled={!selectedVariant?.availableForSale}
              onClick={toggleCart}
            >
              Add to Cart
            </button>
            <button className="buy-now-button" onClick={proceedToPayment}>
              Buy Now
            </button>
          </div>
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
      {/* Accordion Section */}
      <div className="accordion-container">
        <Accordion
          title="What, Who & How?"
          content={
            <p className="accordian-para">
              Detailed information about what, who, and how to use the product.
            </p>
          }
        />
        <Accordion
          title="Nutritional Highlights"
          content={<p className="accordian-para">Here are the nutritional highlights of the product.</p>}
        />
        <Accordion
          title="Ingredients"
          content={<p className="accordian-para">List of ingredients and their description goes here.</p>}
        />
        <Accordion
          title="Ratings & Reviews"
          content={<p className="accordian-para">Ratings and reviews by customers.</p>}
        />
        <Accordion
          title="Comparison"
          content={<p className="accordian-para">Comparison with similar products goes here.</p>}
        />
        {/* FAQ Accordion Section */}
        {/* {faqContent && faqContent.length > 0 && (
          <Accordion
            title="Frequently Asked Questions"
            content={
              <div className="faq-content">
                {faqContent.map((faqItem, index) => (
                  <div key={index}>
                    <strong>{faqItem[0]}</strong>
                    <p>{faqItem[1]}</p>
                  </div>
                ))}
              </div>
            }
          />
        )} */}
      </div>
    </div>
  );
};

export default ProductDetails;
