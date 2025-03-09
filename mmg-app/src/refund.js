import React, { useState, useEffect } from "react";
import "./terms.css";
import Copyright1 from "./assets/copyright1.svg";
import MilkTM from "./assets/Logo-TM-1.svg";
import Top from "./assets/Top.png";
import Copyrightline from "./assets/Line 23.svg";

function Refund() {
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

  const refundData = [
    {
      title: "1. No Returns After Purchase",
      content:
        "Purchases made from the online store of milkmygains.com cannot be returned after purchase. We encourage customers to review their orders carefully before confirming.",
    },
    {
      title: "2. Replacement for Damaged Products",
      content: (
        <div>
          We offer full replacement for products that are damaged during
          transit. To initiate a replacement:
          <ul className="listing-terms">
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}>
                {" "}
                Notification Period:
              </span>{" "}
              Contact our customer support within{" "}
              <span style={{ fontWeight: 600, color: "black" }}>
                2 hours
              </span>{" "}
              of receiving the product.
            </li>
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}>
                {" "}
                Validation:
              </span>{" "}
              Our team will validate the damage through communication over email
              or phone.
            </li>
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}>
                {" "}
                Processing:
              </span>{" "}
              Once validated, replacement orders are processed immediately.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Exchange Policy",
      content:
        "milkmygains.com does not entertain exchanges after the order is successfully placed and payment is made by the buyer. Buyers are requested to place the order only if they agree with this term.",
    },
    {
      title: "4. Cancellation & Refund Policy",
      content: (
        <div>
          Orders cannot be canceled, and refunds are not available once the
          order is successfully placed and processed by the payment gateway.
          Refund requests will only be considered in the following cases:
          <ul className="listing-terms">
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}>
                {" "}
                Prepaid Orders:
              </span>{" "}
              If the order is prepaid and the shipping location is not serviced
              by our partner courier companies.
            </li>
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}>
                {" "}
                Processing Time:
              </span>{" "}
              From the date of written confirmation of refund to the customer,
              the amount will be refunded within the next{" "}
              <span style={{ fontWeight: 600, color: "black" }}>
                7-10 business days
              </span>{" "}
              to the customer’s original mode of payment.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "5. Non-Refundable Situations",
      content: (
        <div>
          No refunds will be given in the following cases:
          <ul className="listing-terms">
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}>
                {" "}
                Incorrect or Insufficient Address:
              </span>{" "}
              Provided by the customer.
            </li>
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}>
                {" "}
                Non-Availability:
              </span>{" "}
              Recipient not available at the mentioned address.
            </li>
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}>
                {" "}
                Refusal to Accept:
              </span>{" "}
              Products refused at the time of delivery.
            </li>
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}>
                {" "}
                Force Majeure Events:
              </span>{" "}
              Unforeseen circumstances beyond our control.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "6. Contact Information",
      content: (
        <div>
          For any queries or concerns regarding our Refund and Returns Policy,
          please contact us at:
          <ul className="listing-terms">
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}> Email:</span>{" "}
              customercare@milkmygains.com
            </li>
            <li className="terms-height">
              <span style={{ fontWeight: 600, color: "black" }}> Phone:</span>{" "}
              +91-9663696025
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="terms-conditions">
        <div className="terms-spacing mb-5">
          <h1 className="terms-heading">Refund and Returns Policy</h1>
          {refundData.map((section, index) => (
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

export default Refund;
