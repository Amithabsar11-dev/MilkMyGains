import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./cartContext";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";
import Logo from "./assets/Logo.png";
import Cart from "./assets/cart.svg";
import CartPanel from "./CartPanel";
import StarTop from "./assets/startop.svg";
import AltLogo from "./assets/logo-blue.svg";
import BlackLogo from "./assets/black-logo.svg";
import FaqStar from "./assets/bluestar-shipping.svg";
import ProductCart from "./assets/product-cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { cartQuantity } = useContext(CartContext);
  const [cartPanelOpen, setCartPanelOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Create navigate function
  const targetProductId = "gid://shopify/Product/7528878702676";

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);

    // Add body class based on the page route
    const body = document.body;
    if (location.pathname === "/faq") {
      body.classList.add("faq-page");
      body.classList.remove("product-page", "contact-page");
    } else if (location.pathname === "/contact") {
      body.classList.add("contact-page");
      body.classList.remove("faq-page", "product-page");
    } else if (location.pathname === "/terms") {
      body.classList.add("terms-page");
      body.classList.remove("faq-page", "product-page");
    } else if (location.pathname === "/shipping") {
      body.classList.add("shipping-page");
      body.classList.remove("faq-page", "product-page");
    } else if (location.pathname === "/refund") {
      body.classList.add("shipping-page");
      body.classList.remove("faq-page", "product-page");
    } else if (location.pathname === "/privacy") {
      body.classList.add("privacy-page");
      body.classList.remove("faq-page", "product-page");
    } else if (location.pathname.startsWith("/product/")) {
      body.classList.add("product-page");
      body.classList.remove("faq-page", "contact-page");
    } else {
      body.classList.remove(
        "faq-page",
        "contact-page",
        "product-page",
        "terms-page"
      );
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      body.classList.remove(
        "faq-page",
        "contact-page",
        "product-page",
        "shipping-page",
        "terms-page",
        "privacy-page"
      );
    };
  }, [location.pathname]);

  useEffect(() => {
    setIsNavOpen(false); // Close the toggler when route changes
  }, [location.pathname]);

  const whiteBgPages = [
    "/faq",
    "/contact",
    "/product",
    "/terms",
    "/shipping",
    "/privacy",
    "/refund",
  ];
  const isWhiteBg =
    ["/faq", "/contact", "/terms", "/shipping", "/privacy", "/refund"].includes(
      location.pathname
    ) || location.pathname.startsWith("/product/");

  // Check if the current page is FAQ, Contact, or Product/Paneer
  const isFaqOrContact =
    location.pathname === "/faq" ||
    location.pathname === "/contact" ||
    location.pathname === "/terms" ||
    location.pathname === "/shipping" ||
    location.pathname === "/privacy" ||
    location.pathname === "/refund";
  const isProductPaneer = location.pathname.startsWith("/product/");

  // Show free shipping on all pages except the product/paneer page
  const showFreeShipping =
    !isProductPaneer && location.pathname.startsWith !== "/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://147.93.106.149:3001/api/products"
        );
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  // Filter to get only the product with the specific ID
  const product = products.find((p) => p.id === targetProductId);

  if (!product) {
    return <div>No product found</div>; // Show this if the product doesn't exist in the fetched data
  }

  const imageSrc = product.images.edges[0]?.node?.src;
  return (
    <header
      className={`header ${isWhiteBg ? "white-bg" : ""} ${
        isFaqOrContact ? "sandal-bg" : ""
      }`}
    >
      {showFreeShipping && (
        <>
          <div className="free-shipping">
            <img
              src={isFaqOrContact ? FaqStar : StarTop}
              className="star-top"
              alt="star"
            />
            <h1 className={`free-heading ${isFaqOrContact ? "blue-text" : ""}`}>
              FREE SHIPPING ON ORDERS ABOVE 500/-
            </h1>
            <img
              src={isFaqOrContact ? FaqStar : StarTop}
              className="star-top"
              alt="star"
            />
          </div>
          <hr
            className={`border-line ${isFaqOrContact ? "blue-border" : ""}`}
          />
        </>
      )}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-4">
            <Link to="/">
              <img
                src={
                  isProductPaneer ? BlackLogo : isFaqOrContact ? AltLogo : Logo
                }
                alt="Logo"
                className={`logo ${isWhiteBg ? "logo-dark" : ""}`}
              />
            </Link>
          </div>
          <div className="col-8 nav-style">
            <nav className="navbar">
              {!isDesktop && (
                <button
                  className={`navbar-toggler ${isNavOpen ? "open" : ""}`}
                  onClick={() => setIsNavOpen(!isNavOpen)}
                >
                  <div
                    className={`bar ${
                      location.pathname.startsWith("/product/")
                        ? "product-bar"
                        : isFaqOrContact
                        ? "faq-bar"
                        : ""
                    }`}
                  ></div>
                  <div
                    className={`bar ${
                      location.pathname.startsWith("/product/")
                        ? "product-bar"
                        : isFaqOrContact
                        ? "faq-bar"
                        : ""
                    }`}
                  ></div>
                  <div
                    className={`bar ${
                      location.pathname.startsWith("/product/")
                        ? "product-bar"
                        : isFaqOrContact
                        ? "faq-bar"
                        : ""
                    }`}
                  ></div>
                </button>
              )}
              <div
                className={`navbar-menu ${
                  isNavOpen || isDesktop ? "active" : ""
                }`}
              >
                {!isDesktop && isNavOpen && (
                  <Link to="/" className="menu-logo">
                    <img src={Logo} alt="Logo" className="mobile-logo" />
                  </Link>
                )}
                <div>
                  <ul className="navbar-nav">
                    <div>
                      <li className="content__item nav-item">
                        <a
                          className={`link link--elara ${
                            isWhiteBg ? "nav-dark" : ""
                          }`}
                          onClick={() => navigate(`/product/${product.handle}`)}
                        >
                          <span className="nav-fonts">Products</span>
                        </a>
                      </li>
                    </div>
                    <li className="content__item nav-item">
                      <a
                        className={`link link--elara ${
                          isWhiteBg ? "nav-dark" : ""
                        }`}
                        href="/about"
                      >
                        <span className="nav-fonts">About</span>
                      </a>
                    </li>
                    <li className="content__item nav-item">
                      <a
                        className={`link link--elara ${
                          isWhiteBg ? "nav-dark" : ""
                        }`}
                        href="/faq"
                      >
                        <span className="nav-fonts">Faq</span>
                      </a>
                    </li>
                    <li className="content__item nav-item">
                      <a
                        className={`link link--elara ${
                          isWhiteBg ? "nav-dark" : ""
                        }`}
                        href="/contact"
                      >
                        <span className="nav-fonts">Contact</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="icon-placement">
                <li style={{ listStyle: "none" }}>
                  <div style={{ position: "relative" }}>
                    <img
                      src={
                        location.pathname.startsWith("/product/")
                          ? ProductCart
                          : Cart
                      }
                      alt="cart"
                      className="cart-icon"
                      onClick={() => setCartPanelOpen(true)}
                    />
                    {cartQuantity > 0 && (
                      <span className="cartquantity">{cartQuantity}</span>
                    )}
                  </div>
                </li>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <CartPanel
        onClose={() => setCartPanelOpen(false)}
        isOpen={cartPanelOpen}
      />
    </header>
  );
};

export default Header;
