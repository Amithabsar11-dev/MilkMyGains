import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";
import Cow from "./assets/cow.svg";
import Protein from "./assets/protein.svg";
import Farm from "./assets/farm.svg";
import Chemical from "./assets/chemical.svg";
import { useContext } from "react";
import { CartContext } from "./cartContext";
import Words from "./assets/words.svg";

const ProductDetails = () => {
  const { handle } = useParams(); // Extract the product handle from the URL
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [packQuantity, setPackQuantity] = useState(1); // Default pack quantity
  const [purchaseOption, setPurchaseOption] = useState("oneTime"); // Default: One Time Purchase
  const [cartVisible, setCartVisible] = useState(false);
  const [error, setError] = useState("");
  const [faqContent, setFaqContent] = useState(null);
  const [nutritionalHighlights, setNutritionalHighlights] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [accordionContent, setAccordionContent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    review_title: "",
    review_body: "",
    reviewer_name: "",
    reviewer_email: "",
    rating: 0,
  });
  const {
    cartItems,
    cartQuantity,
    cartTotal,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    proceedToPayment,
  } = useContext(CartContext);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/product/${handle}`
        );
        console.log("Full Response:", response.data);

        setProduct(response.data);

        // Automatically select the first available variant
        const firstAvailableVariant = response.data.variants.edges.find(
          ({ node }) => node.availableForSale
        )?.node;
        setSelectedVariant(firstAvailableVariant || null);

        // Extract FAQ content from metafields
        const metafields = response.data.metafields || [];
        const faqMetafield = metafields.find(
          (metafield) =>
            metafield.key === "list" && metafield.namespace === "faq"
        );
        if (faqMetafield) {
          setFaqContent(faqMetafield.value);
        }

        // Extract Nutritional Highlights from metafields
        const nutritionalHighlightsMetafield = metafields.find(
          (metafield) =>
            metafield.key === "highlights" &&
            metafield.namespace === "nutritional"
        );
        if (nutritionalHighlightsMetafield) {
          setNutritionalHighlights(nutritionalHighlightsMetafield.value);
        }

        // Extract Graph Data from metafields
        const graphDataMetafield = metafields.find(
          (metafield) =>
            metafield.key === "chart" && metafield.namespace === "graph"
        );
        if (graphDataMetafield) {
          setGraphData(graphDataMetafield.value);
        }

        // Extract Comparison Data from metafields
        const comparisonDataMetafield = metafields.find(
          (metafield) =>
            metafield.key === "comparison" && metafield.namespace === "product"
        );
        if (comparisonDataMetafield) {
          setComparisonData(comparisonDataMetafield.value);
        }

        // Extract Ingredients from metafields
        const ingredientsMetafield = metafields.find(
          (metafield) =>
            metafield.key === "ingredients" && metafield.namespace === "product"
        );
        if (ingredientsMetafield) {
          const ingredientsData = JSON.parse(ingredientsMetafield.value);
          setIngredients(ingredientsData);
        }

        const accordionContentMetafield = metafields.find(
          (metafield) =>
            metafield.key === "accordion_content" && metafield.namespace === "new"
        );
        if (accordionContentMetafield) {
          const accordionContentData = JSON.parse(accordionContentMetafield.value);
          setAccordionContent(accordionContentData);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/reviews/${handle}`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
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
    setPurchaseOption("oneTime");
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      const itemId = `${selectedVariant.id}-${packQuantity}`;
      const existingItem = cartItems.find(item => item.id === itemId);
      if (existingItem) {
        updateItemQuantity(itemId, existingItem.quantity + 1);
      } else {
        const item = {
          id: itemId,
          title: `${product.title} - Pack of ${packQuantity}`,
          price: purchaseOption === "subscribe"
            ? parseFloat(selectedVariant.priceV2.amount * packQuantity * 0.8)
            : parseFloat(selectedVariant.priceV2.amount * packQuantity),
          quantity: 1,
          image: images.edges[0]?.node.src,
          packQuantity: packQuantity,
          originalPackQuantity: packQuantity,
        };

        addItemToCart(item);
      }
      setCartVisible(true);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBuyNow = async () => {
    if (selectedVariant) {
      const item = {
        id: selectedVariant.id,
        title: product.title,
        price: purchaseOption === "subscribe"
          ? parseFloat(selectedVariant.priceV2.amount * packQuantity * 0.8)
          : parseFloat(selectedVariant.priceV2.amount * packQuantity),
        quantity: packQuantity,
        image: images.edges[0]?.node.src,
      };
      addItemToCart(item);
      proceedToPayment();
    }
  };
  const { title, description, images } = product;

  const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className={`accordion-section ${isOpen ? "open" : ""}`}>
        <div className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
          <span className="accordion-text">{title}</span>
          <span className="accordion-icon">{isOpen ? "-" : "+"}</span>
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
            <h4 className="quantity">Quantity</h4>
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
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="buy-now-button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>

        {cartVisible && (
          <div className="cart-panel">
            <div className="cart-items-wrapper">
              <button className="close-cart" onClick={toggleCart}>
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
                    <p>Quantity:
                      <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                      <button onClick={() => {
                        if (item.quantity > 1) {
                          updateItemQuantity(item.id, item.quantity - 1);
                        } else {
                          removeItemFromCart(item.id);
                        }
                      }}>-</button>
                      <br />
                      {item.quantity}
                    </p>
                    <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="checkout-option">
              <p>Total: ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
              <button className="checkout" onClick={proceedToPayment}>
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Metafields */}
      <div className="metafield-container">
        <div className="metafield-items">
          {faqContent?.map((item, index) => (
            <div key={index}>
              <h5 className="metafield-question">{item.question}</h5>
              <p className="metafield-answer">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Accordion Section */}
      <div className="accordion-container">
        <Accordion
          title="What, Who & How?"
          content={
            <div>
              {faqContent?.map((item, index) => (
                <div key={index}>
                  <h5>{item.question}</h5>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          }
        />
        <Accordion
          title="Nutritional Highlights"
          content={
            <div>
              <h4>{nutritionalHighlights?.title}</h4>
              <ul>
                {nutritionalHighlights?.summary.map((item, index) => (
                  <li key={index}>
                    {item.heading}: {item.subheading}
                  </li>
                ))}
              </ul>
            </div>
          }
        />
        <Accordion
          title="Graph"
          content={
            <div>
              <h4>{graphData?.heading}</h4>
              {graphData?.data.map((item, index) => (
                <div key={index}>
                  <p>
                    {item.label}: {item.percentage}%
                  </p>
                  <img src={item.image_url} alt={item.label} />
                </div>
              ))}
            </div>
          }
        />
        <Accordion
          title="Comparison"
          content={
            <div>
              <h4>{comparisonData?.title}</h4>
              <p>{comparisonData?.subheading}</p>
              <p>{comparisonData?.highlights}</p>
              <table>
                <thead>
                  <tr>
                    {comparisonData?.table.columns.map((col, index) => (
                      <th key={index}>
                        <img src={col.image} alt={col.name} />
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData?.table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{row.name}</td>
                      {row.values.map((value, valueIndex) => (
                        <td key={valueIndex}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
        <Accordion
          title="Ingredients"
          content={
            <div>
              <h4>{ingredients?.title}</h4>
              {ingredients?.details.map((item, index) => (
                <div key={index}>
                  <h5>{item.heading}</h5>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          }
        />
        <Accordion
          title="Reviews"
          content={
            reviews.length > 0 ? (
              <div>
                {reviews.map((review) => (
                  <div key={review.id}>
                    <h5>{review.title} - {review.rating} Stars</h5>
                    <p>{review.body}</p>
                    <p><strong>Reviewer:</strong> {review.reviewer.name}</p>
                    {review.pictures.map((picture, index) => (
                      <img key={index} className="review-image" src={picture.urls.original} alt="Review" />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews available for this product yet.</p>
            )
          }
        />
        <Accordion
          title="Accordion Content"
          content={
            <div>
              {accordionContent?.map((item, index) => (
                <div key={index}>
                  <h5>{item.question}</h5>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ProductDetails;