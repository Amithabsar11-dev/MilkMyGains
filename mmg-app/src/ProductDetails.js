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
import Words1 from "./assets/words1.svg";
import Raisingprotein from "./assets/high-protein.svg";
import MMGproduct from "./assets/mmg-product.svg";
import Paneerproduct from "./assets/paneer-product.svg";
import Icecreamproduct from "./assets/icrecream-product.svg";
import Milkproduct from "./assets/milk-product.svg";
import MMG from "./assets/MMG-image.svg";
import Paneericon from "./assets/Panner-icon.svg";
import Proteins from "./assets/meat.svg";
import Whey from "./assets/powder.svg";
import Energybar from "./assets/ricebag.svg";
import Palakpaneer from "./assets/paneercubes.svg";
import LiftSticker from "./assets/nutrition-sticker.svg";
import INGREDIENTS from "./assets/ingredients-list.svg";
import Nutrients from "./assets/nutrients-icon.svg";
import Stars from "./assets/stars.svg";
import Orangestars from "./assets/reviews-orange.svg";
import Activestar from "./assets/active-star.svg";
import Inactivestar from "./assets/inactive-star.svg";
import Milk from "./assets/Slice-3.svg";
import Copyright1 from "./assets/copyright1.svg";
import Graph from "./assets/graph.svg";
import Copyrightline from './assets/Line 23.svg';
import CartPanel from "./CartPanel";

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
        console.log("Comparison Data:", comparisonData);
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
            metafield.key === "accordion_content" &&
            metafield.namespace === "new"
        );
        if (accordionContentMetafield) {
          const accordionContentData = JSON.parse(
            accordionContentMetafield.value
          );
          setAccordionContent(accordionContentData);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/reviews/${handle}`
        );
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
      const existingItem = cartItems.find((item) => item.id === itemId);
      if (existingItem) {
        updateItemQuantity(itemId, existingItem.quantity + 1);
      } else {
        const item = {
          id: itemId,
          title: `${product.title} - Pack of ${packQuantity}`,
          price:
            purchaseOption === "subscribe"
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
        price:
          purchaseOption === "subscribe"
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
          <img src={MMG} alt="mmg-image" className="product-details-image" />
          <div className="product-lisiting-icon">
            <div className="product-icons-list">
              <img
                src={MMGproduct}
                className="mmg-product"
                alt="mmg-product-image"
              />
              <img
                src={Paneerproduct}
                className="paneer-product"
                alt="mmg-product-image"
              />
              <img
                src={Icecreamproduct}
                className="icecream-product"
                alt="mmg-product-image"
              />
              <img
                src={Milkproduct}
                className="milk-product"
                alt="mmg-product-image"
              />
            </div>
          </div>
        </div>

        <div className="product-details-right col-sm-6">
          <h1 className="details-title">
            HIGH PROTEIN <br />
            PANEER
          </h1>
          <hr className="horizontal-line"></hr>

          <div className="pack-selection">
            <h4 className="quantity">Quantity</h4>
            <div className="pack-buttons">
              <button
                className="Subscribe-button-pack"
                disabled={selectedVariant?.quantityAvailable < 1}
                onClick={() => handlePackSelection(1)}
              >
                Pack of 1
              </button>
              <button
                className="Subscribe-button-pack"
                disabled={selectedVariant?.quantityAvailable < 4}
                onClick={() => handlePackSelection(4)}
              >
                Pack of 4
              </button>
              <button
                className="Subscribe-button-pack"
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
            {/* {packQuantity > 1 && (
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
            )} */}
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
              className="Subscribe-button-cart"
              disabled={!selectedVariant?.availableForSale}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="Subscribe-button-buy" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>

        {cartVisible && (
          <div className="cart-panel">
            <div className="cart-items-wrapper">
              <h2 className="close-cart" onClick={toggleCart}>
                &times;
              </h2>
              <h2 className='cart-panel-heading'>Your Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</h2>
              {cartItems.map((item) => {
                const titleParts = item.title.split(" - "); // Splitting title at " - "
                const mainTitle = titleParts[0]; // First part of the title
                const extraInfo = titleParts[1] ? `(${titleParts[1]})` : ""; // Second part in parentheses if exists

                return (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.title || "Product Image"}
                      className="cart-image"
                    />
                    <div className="cart-details">
                      <div className='cart-selection'>
                        <h3 className='cart-title'>{mainTitle} {extraInfo}</h3>
                        <h2 className='remove-items' onClick={() => removeItemFromCart(item.id)}>&times;</h2>
                      </div>
                      <p className='qty-container'>
                        <div className="qty-buttons">
                          <p className='qty-quantity'>QTY: {item.quantity}</p>
                          <button className="circle-btn" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                          <button className="circle-btn" onClick={() => {
                            if (item.quantity > 1) {
                              updateItemQuantity(item.id, item.quantity - 1);
                            } else {
                              removeItemFromCart(item.id);
                            }
                          }}>-</button>
                        </div>
                        <p className='items-price'>₹{(item.price * item.quantity).toFixed(2)}</p>
                      </p>
                      {/* <button onClick={() => removeItemFromCart(item.id)}>Remove</button> */}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="checkout-option">
              <div className='checkout-total'>
                <p className='subtotal'>
                  SUB TOTAL
                </p>
                <p className='subtotal-amount'>
                  ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                </p>
              </div>
              <button className="checkout" onClick={proceedToPayment}>Proceed to Payment</button>
            </div>
          </div>
        )}
      </div>
      {/* Metafields */}
      <div className="metafield-container">
        <div className="metafield-total">
          <div className="metafield-items">
            <div className="metafield-QA">
              <h5 className="metafield-question">What it is?</h5>
              <p className="metafield-answer">
                Our high-protein paneer supports your active lifestyle with 31
                grams
                <br /> of protein per serving and just two natural ingredients.
                It’s clean,
                <br /> wholesome, and perfect for muscle growth, recovery, and
                weight
                <br /> management—low in fat, low in calories, and high in
                quality, without
                <br /> compromising on taste.
              </p>
            </div>
            <div className="metafield-QA">
              <h5 className="metafield-question">What it is?</h5>
              <p className="metafield-answer">
                Our high-protein paneer supports your active lifestyle with 31
                grams
                <br /> of protein per serving and just two natural ingredients.
                It’s clean,
                <br /> wholesome, and perfect for muscle growth, recovery, and
                weight
                <br /> management—low in fat, low in calories, and high in
                quality, without
                <br /> compromising on taste.
              </p>
            </div>
            <div className="metafield-QA">
              <h5 className="metafield-question">What it is?</h5>
              <p className="metafield-answer">
                Our high-protein paneer supports your active lifestyle with 31
                grams
                <br /> of protein per serving and just two natural ingredients.
                It’s clean,
                <br /> wholesome, and perfect for muscle growth, recovery, and
                weight
                <br /> management—low in fat, low in calories, and high in
                quality, without
                <br /> compromising on taste.
              </p>
            </div>
            <img src={Words1} alt="words" className="words-image" />
          </div>
        </div>
        <div className="metafield-ingredients">
          <div className="row ingredients-row">
            <img
              src={LiftSticker}
              className="nutrition-lift"
              alt="nutrition-lift"
            />
            <div className="col-sm-7 ingredients-first">
              <img
                src={Nutrients}
                className="nutrients-imaging"
                alt="nutrients-image"
              />
              <div className="ingredients-title-container">
                <h1 className="ingredients-title">Ingredients</h1>
                <p className="ingredients-para">
                  Made with pasteurized cow milk and lemon, our paneer is <br />
                  pure, natural, and free from additives or preservatives.
                  <br /> Simple ingredients for a healthier you!
                </p>
              </div>
              <div className="nutritional-space">
                <div className="nutritional-title-container">
                  <h1 className="nutritional-highlights">
                    Nutritional Highlights
                  </h1>
                  <div className="nutritional-items-total">
                    <div className="nutritional-items">
                      <h1 className="nutritional-energy">162 Kcal</h1>
                      <p className="energy-para">Energy</p>
                    </div>
                    <div className="nutritional-items1">
                      <h1 className="nutritional-energy">30.5g</h1>
                      <p className="energy-para">protein</p>
                    </div>
                    <div className="nutritional-items2">
                      <h1 className="nutritional-energy">4g</h1>
                      <p className="energy-para">Total fat</p>
                    </div>
                    <div className="nutritional-items3">
                      <h1 className="nutritional-energy">1g</h1>
                      <p className="energy-para">carbs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5" style={{ position: "relative" }}>
              <div className="ingredients-image">
                <img
                  src={INGREDIENTS}
                  alt="ingredients-list"
                  className="ingredients-list"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="reviews-container">
          <div className="row reviews-row">
            <div className="col-sm-6 spacing-reviews">
              <div className="review-spacing">
                <div className="review-title">
                  <img
                    src={Orangestars}
                    className="orange-star"
                    alt="orange-star"
                  />
                  <h1 className="review-heading">
                    loved <br /> by protein <br />
                    fans <br />
                    everywhere
                  </h1>
                  <img
                    src={Orangestars}
                    className="orange-star1"
                    alt="orange-star"
                  />
                </div>
                <p className="rating-para">overall rating</p>
                <div className="rating-review">
                  <div className="ratings-style">
                    <h1 className="rating-number">5</h1>
                  </div>
                  <div className="reviews-style">
                    <img src={Stars} className="star-5" alt="stars" />
                    <p className="reviews-40">40 Reviews</p>
                  </div>
                </div>
                <div className="review-button">
                  <button className="review-button-contact">
                    Write a review
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-6 reviews-space-pad">
              <div className="reviewer-section">
                <img src={Stars} className="star-4" alt="stars" />
                <p className="reviewer-days">2 days ago</p>
                <p className="reviewer-name">john joseph</p>
              </div>
              <div className="reviewer-title-container">
                <h3 className="reviewer-title">In Loveeee</h3>
                <p className="reviewer-para">
                  52 year old gent here, have used many different flavors of
                  EVOO
                  <br /> over the years and have to say this is in my top 5 list
                  for sure,
                  <br /> especially if you buy the bundles to get a better
                  price.
                </p>
                <hr className="horizontal-line1" />
              </div>
              <div className="reviewer-section">
                <img src={Stars} className="star-4" alt="stars" />
                <p className="reviewer-days1">2 days ago</p>
                <p className="reviewer-name1">john joseph</p>
              </div>
              <div className="reviewer-title-container">
                <h3 className="reviewer-title">Subtle & Natural</h3>
                <p className="reviewer-para">
                  52 year old gent here, have used many different flavors of
                  EVOO
                  <br /> over the years and have.
                </p>
                <hr className="horizontal-line1" />
              </div>
              <div className="reviewer-section">
                <img src={Stars} className="star-4" alt="stars" />
                <p className="reviewer-days2">2 days ago</p>
                <p className="reviewer-name2">john joseph</p>
              </div>
              <div className="reviewer-title-container">
                <h3 className="reviewer-title">Obsessed</h3>
                <p className="reviewer-para">
                  52 year old gent here, have used many different flavors of
                  EVOO
                  <br /> over the years and have to say this is in my top 5 list
                  for sure,
                  <br /> especially if you buy the bundles to get a better
                  price.
                </p>
                <hr className="horizontal-line1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raising the star */}
      <div className="animations-container">
        <div className="texting-wrapper-1">
          <h1 className="raising-1">RAISING</h1>
          <div className="middle-texting">
            <span className="high-proteins-1">HIGH PROTEINS</span>
            <br />
            <span className="low-proteins-1">LOW CALORIES</span>
          </div>
          <h1 className="bar-proteins-1">THE BAR</h1>
        </div>
      </div>
      {/* Comparision */}
      <div className="comparison-table">
        <div className="comparison-column labels">
          <div className="product-label">
            <img src={Paneericon} alt="Product 1" className="product1" />
          </div>
          <div className="label">PROTEINS</div>
          <div className="label">FAT</div>
          <div className="label">CALORIES</div>
          <div className="label">PRICE</div>
        </div>
        <div className="comparison-column highlighted">
          <img src={Activestar} className="active-star" alt="active star" />
          <div className="product product-highlight">
            <img src={Paneericon} alt="Product 1" />
          </div>
          <div className="value">31G</div>
          <div className="value">5G</div>
          <div className="value">160</div>
          <div className="value">$</div>
        </div>
        <div className="comparison-column">
          <img
            src={Inactivestar}
            className="inactive-star"
            alt="inactive star"
          />
          <div className="icon">
            <img src={Proteins} alt="Product 2" className="product2" />
          </div>
          <div className="value">18G</div>
          <div className="value">5G</div>
          <div className="value">160</div>
          <div className="value">₹</div>
        </div>
        <div className="comparison-column">
          <img
            src={Inactivestar}
            className="inactive-star"
            alt="inactive star"
          />
          <div className="icon">
            <img src={Whey} alt="Product 3" className="product3" />
          </div>
          <div className="value">31G</div>
          <div className="value">5G</div>
          <div className="value">160</div>
          <div className="value">₹₹</div>
        </div>
        <div className="comparison-column">
          <img
            src={Inactivestar}
            className="inactive-star"
            alt="inactive star"
          />
          <div className="icon">
            <img src={Energybar} alt="Product 4" className="product4" />
          </div>
          <div className="value">25G</div>
          <div className="value">5G</div>
          <div className="value">160</div>
          <div className="value">₹₹₹</div>
        </div>
        <div className="comparison-column">
          <img
            src={Inactivestar}
            className="inactive-star"
            alt="inactive star"
          />
          <div className="icon">
            <img src={Palakpaneer} alt="Product 5" className="product5" />
          </div>
          <div className="value">37G</div>
          <div className="value">5G</div>
          <div className="value">160</div>
          <div className="value">₹₹₹₹</div>
        </div>
      </div>
      {/* Protein-section */}
      <div className="proteins-container-1 pt-5 pb-5">
        <h1 className="high-protein-heading">
          Highest Protein-to-Calorie
          <br /> Ratio—75% Power
        </h1>
        <div className="milk-pic-container">
          <img src={Graph} className="graph-image" alt="graph" />
        </div>
        <div className="milk-pic-container">
          <img src={Milk} className="milk-image-product" alt="milk-pic" />
        </div>
        <div className="signup-container">
          <h1 className="signup-heading">SIGNUP TO OUR NEWSLETTER</h1>
          <div>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="email-placing"
            />
            <button class="Subscribe-button">Subscribe</button>
          </div>
        </div>
        <div className="footers-column shop-footers mt-5">
          <div className="footer-column-links">
            <ul className="footers-links">
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                 href="/product/milk-my-gains-sample-product"
                >SHOP</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/about"
                >ABOUT US</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/faq"
                >FAQ</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/contact"
                >CONTACT</a></li>
            </ul>
            <ul className="footer-links-1">
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/shipping"
                >SHIPPING</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/refund"
                >REFUND & RETURNS</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/terms"
                >TERMS & CONDITIONS</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/privacy"
                >PRIVACY POLICY</a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <div className="footers mb-3">
        <p className="copyright-text">Copyright © 2025. All rights reserved</p>
      </div>
    </div>
  );
};

export default ProductDetails;