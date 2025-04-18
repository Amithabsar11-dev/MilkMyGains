import React, { useState, useEffect } from "react";
import "./terms.css";
import Copyright1 from "./assets/copyright1.svg";
import MilkTM from "./assets/Logo-TM.svg";
import Top from "./assets/Top.png";
import Instagramheader from "./assets/instagram-header.svg";
import LinkedInheader from "./assets/linkedin-header.svg";
import Facebookheader from "./assets/facebook-header.svg";
import Copyrightline from "./assets/Line 23.svg";

function Shipping() {
  const [activeIndex, setActiveIndex] = useState(null); // State to track the active section
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / windowHeight) * 100;
      setScroll(scrolled);
    };

    const updateScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
  };

  const scrollToTop = () => {
    document.querySelector(".home-wrapper")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const shippingData = [
    {
      title: "1. Shipping Methods and Freshness Assurance",
      content:
        "We ensure your order is shipped using the fastest and most reliable logistics services. Our top priority is delivering products that are fresh, tasty, and secure throughout their journey!",
    },
    {
      title: "2. Delivery Areas",
      content:
        "Currently, we offer deliveries only within Bangalore. All pin codes in Bangalore are serviceable. We are working towards expanding our delivery network through quick commerce platforms to other cities soon!",
    },
    {
      title: "3. Delivery Charges",
      content: (
        <ul className="list-terms">
          <li className="terms-height">
            {" "}
            A delivery fee of{" "}
            <span style={{ fontWeight: 600, color: "black" }}>Rs.50</span> is
            applicable for all orders below{" "}
            <span style={{ fontWeight: 600, color: "black" }}>Rs.560.</span>
          </li>
          <li className="terms-height">
            {" "}
            Orders above{" "}
            <span style={{ fontWeight: 600, color: "black" }}>Rs.560</span>{" "}
            include{" "}
            <span style={{ fontWeight: 600, color: "black" }}>
              free delivery.
            </span>{" "}
            All prices are inclusive of taxes.
          </li>
        </ul>
      ),
    },
    {
      title: "4. Delivery Timeframes",
      content: (
        <ul className="list-terms">
          <li className="terms-height">
            <span style={{ fontWeight: 600, color: "black" }}>
              Orders placed before 12 PM:{" "}
            </span>
            Delivered{" "}
            <span style={{ fontWeight: 600, color: "black" }}>same day.</span>
          </li>
          <li className="terms-height">
            <span style={{ fontWeight: 600, color: "black" }}>
              Orders placed after 12 PM:{" "}
            </span>
            Delivered{" "}
            <span style={{ fontWeight: 600, color: "black" }}>
              the next day before 12 PM.
            </span>
          </li>
        </ul>
      ),
    },
    {
      title: "5. Subscription Orders",
      content: (
        <ul className="list-terms">
          <li className="terms-height">
            For customers who opt for subscription plans, deliveries will be
            made{" "}
            <span style={{ fontWeight: 600, color: "black" }}>
              fresh every Sunday
            </span>{" "}
            on a{" "}
            <span style={{ fontWeight: 600, color: "black" }}>
              weekly basis
            </span>{" "}
            for the{" "}
            <span style={{ fontWeight: 600, color: "black" }}>
              time frame chosen at the time of subscription.
            </span>{" "}
            This ensures you always have a consistent supply of fresh products
            as per your needs.
          </li>
        </ul>
      ),
    },
    {
      title: "6. Order Processing",
      content: (
        <ul className="list-terms">
          <li className="terms-height">
            {" "}
            All orders are processed immediately upon confirmation to ensure
            timely delivery.
          </li>
        </ul>
      ),
    },
    {
      title: "7. Shipping Restrictions",
      content: (
        <ul className="list-terms">
          <li className="terms-height">
            We currently{" "}
            <span style={{ fontWeight: 600, color: "black" }}>
              do not ship outside Bangalore.
            </span>
          </li>
          <li className="terms-height">
            Customers outside Bangalore can soon access our products via quick
            commerce platforms. Stay tuned for updates!
          </li>
        </ul>
      ),
    },
    {
      title: "8. Lost or Damaged Packages",
      content: (
        <ul className="list-terms">
          <li className="terms-height">
            While we take every precaution to ensure your products are delivered
            in perfect condition, if your order arrives damaged or is missing,
            please contact our customer support at{" "}
            <a
              className="mail-mailto"
              href="mailto:CUSTOMERCARE@MILKMYGAINS.COM"
            >
              CUSTOMERCARE@MILKMYGAINS.COM
            </a>{" "}
            within 24 hours of receiving your order. We will address the issue
            promptly.
          </li>
        </ul>
      ),
    },
  ];

  return (
    <>
      <div className="terms-conditions">
        <div className="terms-spacing mb-5">
          <h1 className="terms-heading">Shipping Policy</h1>
          {shippingData.map((section, index) => (
            <div className="conditions" key={index}>
              <h3
                className="terms-title"
                onClick={() => window.innerWidth < 500 && toggleSection(index)}
              >
                {section.title}
                {window.innerWidth < 500 && (
                  <span className="plus-icon">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                )}
              </h3>
              {(window.innerWidth < 500 ? activeIndex === index : true) && (
                <div className="terms-para">{section.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Scroll to Top Button */}
      <div className="top">
        <img
          src={Top}
          className="top-image"
          onClick={() => scrollToTop()}
          alt="Back to top"
        />
      </div>
      <div className="proteins-container pt-5 pb-5">
        <div className="milk-pic-container">
          <img src={MilkTM} className="milk-image2" alt="milk-pic" />
        </div>
        <div className="signup-container">
          <h1 className="signup-heading">SIGNUP TO OUR NEWSLETTER</h1>
          <div>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="email-placing"
            />
            <button className="Subscribe-button">Subscribe</button>
          </div>
        </div>
        {/* <div className="social-media-containers-2">
          <img src={LinkedInheader} className="linked-in" alt="" />
          <img src={Facebookheader} className="facebook" alt="" />
          <img src={Instagramheader} className="instagram" alt="" />
        </div> */}
        <div className="footers-column shop-footers mt-5">
          <div className="footer-column-links">
            <ul className="footers-links">
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/product/milk-my-gains-sample-product"
                >
                  SHOP
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/about"
                >
                  ABOUT US
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/faq"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/contact"
                >
                  CONTACT
                </a>
              </li>
            </ul>
            <ul className="footer-links-1">
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/shipping"
                >
                  SHIPPING
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/refund"
                >
                  REFUND & RETURNS
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/terms"
                >
                  TERMS & CONDITIONS
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/privacy"
                >
                  PRIVACY POLICY
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footers mb-3">
        <p className="copyright-text">Copyright © 2025. All rights reserved</p>
      </div>
    </>
  );
}

export default Shipping;
