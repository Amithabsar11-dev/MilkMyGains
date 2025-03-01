import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetails.css";
import Cow from "./assets/pure-cow.svg";
import Protein from "./assets/protein.svg";
import Farm from "./assets/farm.svg";
import Chemical from "./assets/chemical.svg";
import { useContext } from "react";
import { CartContext } from "./cartContext";
import Words1 from "./assets/paneer-text.svg";
import Milkbanner from "./assets/Vector (1).png";
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
import FilledStar from "./assets/Star 1.svg"; // Replace with actual path
import EmptyStar from "./assets/Star 5.svg"; // Replace with actual path
import moment from "moment";
import HalfStar from './assets/Frame 215.svg';
import { gsap } from "gsap";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import Sample from './sample';
import Copyrightline from './assets/Line 23.svg';
import CartPanel from "./CartPanel";
import MilkTM from "./assets/Logo-TM-1.svg";
import "./App.css";

const ProductDetails = ({ setIsLoaded, isLoaded }) => {
  const { handle } = useParams(); // Extract the product handle from the URL
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [packQuantity, setPackQuantity] = useState(1); // Default pack quantity
  const [purchaseOption, setPurchaseOption] = useState("oneTime"); // Default: One Time Purchase
  const [cartVisible, setCartVisible] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState("100g");
  const [error, setError] = useState("");
  const [faqContent, setFaqContent] = useState(null);
  const [nutritionalHighlights, setNutritionalHighlights] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [ingredients, setIngredients] = useState(null);
  const [accordionContent, setAccordionContent] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroupStart, setPageGroupStart] = useState(1); // Controls the first page in the row
  const reviewsPerPage = 3;
  const pagesPerRow = 3; // How many page numbers to show at a time
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

  //Graph
  const data = [
    { value: 76, text: "76%\nCALORIES\nFROM\nPROTEIN", icon: "🏃‍♂️", color: "#E74C3C" },
    { value: 24, text: "24%\nCALORIES\nFROM\nPROTEIN", icon: "🥗", color: "#FFFFFF" },
    { value: 72, text: "72%\nCALORIES\nFROM\nPROTEIN", icon: "🍗", color: "#FFFFFF" },
    { value: 26, text: "26%\nCALORIES\nFROM\nPROTEIN", icon: "🍫", color: "#FFFFFF" },
    { value: 71, text: "71%\nCALORIES\nFROM\nPROTEIN", icon: "🍼", color: "#FFFFFF" },
  ];


  //Table 

  const tableContainerRef = useRef(null);
  const scrollRightRef = useRef(null);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    const scrollRight = scrollRightRef.current;

    // ✅ Ensure elements exist before adding event listeners
    if (!tableContainer || !scrollRight) return;

    const handleScroll = () => {
      if (tableContainer.scrollLeft > 0) {
        scrollRight.style.display = "none";
      } else {
        scrollRight.style.display = "block";
      }

      const totalTableWidth = tableContainer.scrollWidth;
      const tableViewport = tableContainer.clientWidth;

      if (tableContainer.scrollLeft >= totalTableWidth - tableViewport) {
        tableContainer.classList.add("table-end");
      } else {
        tableContainer.classList.remove("table-end");
      }
    };

    const handleScrollRight = () => {
      const column = tableContainer.querySelector(".cd-table-column");
      if (!column) return;

      const columnWidth = column.offsetWidth;
      tableContainer.scrollBy({ left: columnWidth, behavior: "smooth" });
      scrollRight.style.display = "none";
    };

    tableContainer.addEventListener("scroll", handleScroll);
    scrollRight.addEventListener("click", handleScrollRight);

    return () => {
      tableContainer.removeEventListener("scroll", handleScroll);
      scrollRight.removeEventListener("click", handleScrollRight);
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://147.93.106.149:3001/api/product/${handle}`
        );
        console.log("Full Response:", response.data);

        setProduct(response.data);

        // Automatically select the first available variant
        const packOfOneVariant = response.data.variants.edges.find(
          ({ node }) => node.title.toLowerCase().includes("pack of 1") && node.availableForSale
        )?.node;

        setSelectedVariant(packOfOneVariant || null);

        // Set the default main image to the pack of 1 variant image
        if (packOfOneVariant && packOfOneVariant.image) {
          setMainImage(packOfOneVariant.image.src);
        }

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
          `http://147.93.106.149:3001/api/reviews/${handle}`
        );
        const sortedReviews = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [handle]);

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
    if (variant.image) {
      setMainImage(variant.image.src); // Update the main image based on the selected variant
    }
  };


  useEffect(() => {
    if (!setIsLoaded) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".animations-container",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        toggleActions: "play none none reverse",
        scroller: ".home-wrapper",
      },
      onComplete: () => setIsLoaded(true),
    });

    // Step 1: Fade in "RAISING" and "THE BAR"
    tl.fromTo(
      ".raising, .bar-1",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );

    // Step 2: Move "RAISING" left & "THE BAR" right
    tl.to(".raising", { x: "-150px", duration: 1, ease: "power2.out" }, "-=0.5");
    tl.to(".bar-1", { x: "160px", duration: 1, ease: "power2.out" }, "-=1");

    // Step 3: Show "HIGH PROTEINS LOW CALORIES" with zoom effect
    tl.fromTo(
      ".middle-text",
      { opacity: 0, scale: 0.5, fontWeight: 400 },
      {
        opacity: 1,
        scale: 1.1,
        fontWeight: 900,
        duration: 1,
        ease: "power2.out",
      }
    );

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [setIsLoaded]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : "0.0";

  // Pagination logic
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  // Page Numbers Display Logic
  const lastPageInRow = Math.min(pageGroupStart + pagesPerRow - 1, totalPages);
  const pageNumbers = [];
  for (let i = pageGroupStart; i <= lastPageInRow; i++) {
    pageNumbers.push(i);
  }

  // Function to render stars based on average rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Get full stars count
    const hasHalfStar = rating % 1 >= 0.5; // Check if there’s a half star

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<img key={i} src={FilledStar} className="staring-icon" alt="star" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<img key={i} src={HalfStar} className="staring-icon" alt="star" />);
      } else {
        stars.push(<img key={i} src={EmptyStar} className="staring-icon" alt="star" />);
      }
    }
    return stars;
  };


  const handlePackSelection = (quantity) => {
    if (!selectedWeight) return;

    setPackQuantity(quantity);

    const variant = product.variants.edges.find(({ node }) =>
      node.title.toLowerCase().includes(`pack of ${quantity}`) &&
      node.title.toLowerCase().includes(selectedWeight)
    )?.node;

    setSelectedVariant(variant || null);
    setIsActive(!isActive);
  };

  const handleWeightSelection = (weight) => {
    setSelectedWeight(weight);
    setPackQuantity(1); // Reset to Pack of 1 when weight changes

    const variant = product.variants.edges.find(({ node }) =>
      node.title.toLowerCase().includes(`pack of 1`) &&
      node.title.toLowerCase().includes(weight)
    )?.node;

    setSelectedVariant(variant || null); // Set the default variant based on the new weight
  };


  const totalPrice = selectedVariant
    ? parseFloat(selectedVariant.priceV2.amount).toFixed(2) // Use the price directly
    : 0;


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
          price: purchaseOption === "subscribe"
            ? parseFloat(selectedVariant.priceV2.amount * 0.8) // Use the price of the variant directly for subscription
            : parseFloat(selectedVariant.priceV2.amount), // Use the price of the variant directly
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
      proceedToPayment();
    }
  };
  const { title, description, images } = product;

  // const Accordion = ({ title, content }) => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   return (
  //     <div className={`accordion-section ${isOpen ? "open" : ""}`}>
  //       <div className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
  //         <span className="accordion-text">{title}</span>
  //         <span className="accordion-icon">{isOpen ? "-" : "+"}</span>
  //       </div>
  //       {isOpen && (
  //         <div className="accordion-content">
  //           <span className="accordion-close" onClick={() => setIsOpen(false)}>
  //             ×
  //           </span>
  //           {content}
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-details-left col-sm-6">
          <div className="main-product-background">
            <div className="image-banner">
              <img src={Milkbanner} alt="" className="milking-banner" />
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={selectedVariant?.image?.altText || "Product Image"}
                  className="product-details-image"
                />
              ) : (
                <div className="placeholder">No Image Available</div>
              )}
            </div>
          </div>
          <div className="product-listing-icon">
            <div className="product-icons-list">
              {product?.variants.edges
                .filter(
                  ({ node }) =>
                    (node.title.toLowerCase().includes("pack of 1") ||
                      node.title.toLowerCase().includes("pack of 4") ||
                      node.title.toLowerCase().includes("pack of 6")) &&
                    node.title.toLowerCase().includes("100g") // Ensure only 100g variants
                )
                .map((variant, index) => (
                  <div key={index} onClick={() => handleVariantClick(variant.node)}>
                    {variant.node.image && variant.node.image.src ? (
                      <img
                        src={variant.node.image.src}
                        alt={variant.node.image.altText || "Variant Image"}
                        className="image-variant"
                      />
                    ) : (
                      <p>No Image Available</p>
                    )}
                  </div>
                ))}
            </div>
          </div>

        </div>
        <div className="product-details-right col-sm-6">
          <h1 className="details-title">
            {title}
          </h1>
          <hr className="horizontal-line"></hr>
          <div className="amount-selection">
            <h4 className="quantity">Weight</h4>
            <div className="weight-buttons">
              <button
                className={`Subscribe-button-pack ${selectedWeight === "100g" ? "active" : ""}`}
                onClick={() => handleWeightSelection("100g")}
              >
                100g
              </button>
              <button
                className={`Subscribe-button-pack ${selectedWeight === "200g" ? "active" : ""}`}
                onClick={() => handleWeightSelection("200g")}
              >
                200g
              </button>
            </div>
          </div>
          <hr className="horizontal-line"></hr>

          <div className="pack-selection">
            <h4 className="quantity">Quantity</h4>
            <div className="pack-buttons">
              <button
                className={`Subscribe-button-pack ${packQuantity === 1 ? "active" : ""}`}
                disabled={!selectedWeight || selectedVariant?.quantityAvailable < 1}
                onClick={() => handlePackSelection(1)}
              >
                Pack of 1
              </button>
              <button
                className={`Subscribe-button-pack ${packQuantity === 4 ? "active" : ""}`}
                disabled={!selectedWeight || selectedVariant?.quantityAvailable < 4}
                onClick={() => handlePackSelection(4)}
              >
                Pack of 4
              </button>
              <button
                className={`Subscribe-button-pack ${packQuantity === 6 ? "active" : ""}`}
                disabled={!selectedWeight || selectedVariant?.quantityAvailable < 6}
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
                ₹{totalPrice}
              </span>
            </div>
            {packQuantity > 1 && (
              <div className="purchase-option-row">
                <label style={{ opacity: 0.5, cursor: "not-allowed" }}>
                  <input
                    type="radio"
                    value="subscribe"
                    checked={purchaseOption === "subscribe"}
                    disabled
                  />
                  <span>Subscribe and Save</span>
                </label>
                <span className="price">
                  ₹{(totalPrice * 0.8).toFixed(2)}
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
          <CartPanel onClose={toggleCart} isOpen={cartVisible} />
        )}
      </div>
      {/* {product.variants.edges.map((variant, index) => {
        const image = variant.node.image; // Extract the image object
        console.log("Full Variant Data:", variant.node);
        console.log("Variant Image Data:", variant.node.image ? variant.node.image.src : "No image found");
        return (
          <div key={index}>
            {image && image.src ? ( // Check if image and image.src exist
              <img src={image.src} alt={image.altText || 'Variant Image'} />
            ) : (
              <p>No image available</p> // Fallback if no image is available
            )}
            <p>{variant.node.title}</p>
            <p>Price: {variant.node.priceV2.amount} {variant.node.priceV2.currencyCode}</p>
          </div>
        );
      })} */}
      {/* Metafields */}
      <div className="metafield-container">
        <div className="metafield-total">
          <div className="metafield-items">
            <div className="metafield-QA">
              {faqContent?.map((item, index) => (
                <div key={index}>
                  <h5 className="metafield-question">{item.question}</h5>
                  <p className="metafield-answer">{item.answer}</p>
                </div>
              ))}
            </div>
            {/* <div className="metafield-QA">
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
            </div> */}
            {/* <div className="metafield-QA">
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
            </div> */}
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
                <h1 className="ingredients-title">{nutritionalHighlights.accordion.title}</h1>
                <p className="ingredients-para">
                  {nutritionalHighlights.accordion.content}
                </p>
              </div>
              <div className="nutritional-space">
                <div className="nutritional-title-container">
                  <h1 className="nutritional-highlights">
                    {nutritionalHighlights.title}
                  </h1>
                  {nutritionalHighlights && (
                    <div className="nutritional-items-total">
                      {nutritionalHighlights.summary.map((item, index) => (
                        <div key={index} className={`nutritional-items${index === 0 ? "" : index + 1}`}>
                          <h1 className="nutritional-energy">{item.subheading}</h1>
                          <p className="energy-para">{item.heading}</p>
                        </div>
                      ))}
                    </div>
                  )}

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
        {/* <div>
          {reviews.map((review) => (
            <div key={review.id}>
              <h5>
                {review.title} - {review.rating} Stars
              </h5>
              <p>{review.body}</p>
              <p>
                <strong>Reviewer:</strong> {review.reviewer.name}
              </p>
              {review.pictures.map((picture, index) => (
                <img
                  key={index}
                  className="review-image"
                  src={picture.urls.original}
                  alt="Review"
                />
              ))}
            </div>
          ))}
        </div> */}
        {/* Review section */}
        <div className="reviews-container">
          <div className="row reviews-row">
            {/* Left Section */}
            <div className="col-sm-6 spacing-reviews">
              <div className="review-spacing">
                <div className="review-title">
                  <img src={Orangestars} className="orange-star" alt="orange-star" />
                  <h1 className="review-heading">
                    loved <br /> by protein <br />
                    fans <br />
                    everywhere
                  </h1>
                  <img src={Orangestars} className="orange-star1" alt="orange-star" />
                </div>
                <p className="rating-para">overall rating</p>
                <div className="rating-review">
                  <div className="ratings-style">
                    <h1 className="rating-number">{averageRating}</h1>
                  </div>
                  <div className="reviews-style">
                    <div className="star-5">{renderStars(averageRating)}</div>
                    {/* <img src={Stars} className="star-5" alt="stars" /> */}
                    <p className="reviews-40">{reviews.length} Reviews</p>
                  </div>
                </div>
                <div className="review-button">
                  <button className="review-button-contact">Write a review</button>
                </div>
              </div>
            </div>

            {/* Right Section - Reviews List */}
            <div className="col-sm-6 reviews-space-pad">
              {currentReviews.map((review, index) => (
                <div key={index}>
                  <div className="reviewer-section">
                    {/* Display Star Rating */}
                    <div className="star-rating">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src={i < review.rating ? FilledStar : EmptyStar}
                          className="staring-icon"
                          alt="star"
                        />
                      ))}
                    </div>

                    {/* Display Relative Time */}
                    <p className="reviewer-days">{moment(review.created_at).fromNow()}</p>

                    <p className="reviewer-name">{review.reviewer.name}</p>
                  </div>

                  <div className="reviewer-title-container">
                    <h3 className="reviewer-title">{review.title || "No Title"}</h3>
                    <p className="reviewer-para">{review.body}</p>
                    <hr className="horizontal-line1" />
                  </div>
                </div>
              ))}

              {/* Pagination Controls */}
              <div className="pagination">
                {pageGroupStart > 1 && (
                  <button
                    className="prev-button"
                    onClick={() => {
                      setPageGroupStart(pageGroupStart - 1);
                      setCurrentPage(pageGroupStart - 1);
                    }}
                  >
                    ←
                  </button>
                )}

                {pageNumbers.map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`page-number ${pageNum === currentPage ? "active" : ""}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                {lastPageInRow < totalPages && (
                  <button
                    className="next-button"
                    onClick={() => {
                      setPageGroupStart(pageGroupStart + 1);
                      setCurrentPage(pageGroupStart + 1);
                    }}
                  >
                    →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raising the star */}
      {/* {
        isMobile ? (
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
        ) : (
          <div className="animations-container">
            <div className="text-wrapper">
              <h1 className="raising">RAISING</h1>
              <div className="middle-text">
                <span className="high">HIGH PROTEIN</span>
                <br />
                <span className="low">LOW CALORIES</span>
              </div>
              <h1 className="bar-1">THE BAR</h1>
            </div>
          </div>
        )
      } */}
      <div className="animations-container">
        <div className="texting-wrapper-1">
          <h1 className="raising-1">RAISING</h1>
          <div className="middle-texting">
            <span className="high-proteins-1">HIGH PROTEIN</span>
            <br />
            <span className="low-proteins-1">LOW CALORIES</span>
          </div>
          <h1 className="bar-proteins-1">THE BAR</h1>
        </div>
      </div>
      {/* Comparision */}
      {/* <div className="comparison-table">
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
      </div> */}
      <section id="cd-table">
        <header className="cd-table-column">
          <div className='icon-height'>
            <img src={Paneericon} className='paneer-icon-active-hidden' alt='' />
          </div>
          <ul className="set-list-active">
            {comparisonData?.table.rows.map((row, rowIndex) => (
              <li key={rowIndex}>{row.name}</li>
            ))}
          </ul>
        </header>

        <div className="cd-table-container" ref={tableContainerRef}>
          <div className="cd-table-wrapper">
            {comparisonData?.table.columns.map((col, colIndex) => (
              <div
                key={colIndex}
                className={`cd-table-column ${colIndex === 0 ? 'column-active' : 'border-column'}`}
              >
                <div className='icon-height'>
                  <img
                    src={colIndex === 0 ? Activestar : Inactivestar}
                    className={colIndex === 0 ? "active-star" : "inactive-star"}
                    alt={colIndex === 0 ? "active star" : "inactive star"}
                  />
                  <img
                    src={col.image}
                    className={`paneer-icon-active 
              ${colIndex === 0 ? "paneer-active-image-1" : ""} 
              ${colIndex === 3 ? "paneer-active-image-2" : ""}`}
                    alt={col.name}
                  />
                </div>
                <ul className="set-list">
                  {comparisonData?.table.rows.map((row, rowIndex) => (
                    <li key={rowIndex}>{row.values[colIndex]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>


        <em className="cd-scroll-right" ref={scrollRightRef}></em>
      </section>

      {/* Protein-section */}
      <div className="proteins-container-1 pt-5 pb-5">
        <h1 className="high-protein-heading">
          {graphData?.heading}
        </h1>
        <div className="milk-pic-container">
          <img src={Graph} className="graph-image" alt="graph" />
        </div>
        {/* <div className="chart-container">
          {data.map((item, index) => (
            <div key={index} className="bar-wrapper">
              <div className="icongraph">{item.icon}</div>
              <div className="bargraph">
                <div className="bar-fill" style={{ height: `${item.value}vh`, backgroundColor: item.color }}></div>
                <span className="bar-text">{item.text.split("\n").map((line, i) => <div key={i}>{line}</div>)}</span>
              </div>
            </div>
          ))}
        </div> */}
        <div className="milk-pic-container">
          <img src={MilkTM} className="milk-image-product" alt="milk-pic" />
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