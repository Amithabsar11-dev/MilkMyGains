import React, { useState, useEffect } from "react";
import "./terms.css";
import Copyright1 from "./assets/copyright1.svg";
import MilkTM from "./assets/Logo-TM-1.svg";
import Top from "./assets/Top.png";
import Copyrightline from "./assets/Line 23.svg";

function Terms() {
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

  const termsData = [
    {
      title: "1. Introduction",
      content:
        "Welcome to milkmygains.com, operated by Athletude LLP. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our website.",
    },
    {
      title: "2. Company Information",
      content: (
        <ul className="list-terms">
          <li className="terms-height">
            {" "}
            <span style={{ fontWeight: 600, color: "black" }}>Name:</span>{" "}
            Athletude LLP
          </li>
          <li className="terms-height">
            {" "}
            <span style={{ fontWeight: 600, color: "black" }}>
              Address:
            </span>{" "}
            47/30, 33rd A Cross, 11th Main, 4th T Block, Jayanagar, Bangalore –
            560041, India.
          </li>
          <li className="terms-height">
            {" "}
            <span style={{ fontWeight: 600, color: "black" }}>
              Contact Email:
            </span>{" "}
            customercare@milkmygains.com
          </li>
          <li className="terms-height">
            {" "}
            <span style={{ fontWeight: 600, color: "black" }}>
              Contact Number:
            </span>{" "}
            +91 9663696025
          </li>
        </ul>
      ),
    },
    {
      title: "3. Eligibility",
      content:
        "By using this website, you represent that you are at least 18 years old or accessing the site under the supervision of a parent or guardian. You agree to use the website for lawful purposes only.",
    },
    {
      title: "4. Account Registration",
      content:
        "To access certain features of our website, you may be required to register an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
    },
    {
      title: "5. Products and Services",
      content:
        "We offer high-protein paneer designed to support an active lifestyle. While we strive for accuracy, we do not warrant that product descriptions or other content on the website are accurate, complete, reliable, current, or error-free. All products are subject to availability, and we reserve the right to limit quantities or discontinue products without notice.",
    },
    {
      title: "6. Pricing and Payment",
      content: (
        <ul className="list-terms">
          <li className="terms-height">
            {" "}
            <span style={{ fontWeight: 600, color: "black" }}>Pricing: </span>
            All prices listed on the website are in Indian Rupees and are
            inclusive of applicable taxes.
          </li>
          <li className="terms-height">
            <span style={{ fontWeight: 600, color: "black" }}>
              Payment Methods:
            </span>{" "}
            We accept payments through credit/debit cards, net banking, UPI, and
            other digital payment methods.
          </li>
          <li className="terms-height">
            {" "}
            <span style={{ fontWeight: 600, color: "black" }}>
              Pricing Errors:
            </span>{" "}
            In the event of a pricing error, we reserve the right to cancel any
            orders placed at the incorrect price and refund the amount paid.
          </li>
        </ul>
      ),
    },
    {
      title: "7. Order Acceptance and Cancellation",
      content:
        "We reserve the right to accept or reject any order placed through the website. Once an order is placed and payment is confirmed, cancellations are not permitted. If we are unable to fulfill your order, we will notify you and process a full refund.",
    },
    {
      title: "8. Shipping and Delivery",
      content: (
        <div>
          <p>
            Our shipping and delivery policies are outlined in our{" "}
            <a className="shipping-link" href="/shipping">
              Shipping Policy
            </a>
            . Please review it for detailed information.
          </p>
        </div>
      ),
    },
    {
      title: "9. Returns and Refunds",
      content: (
        <div>
          <p>
            For information on returns and refunds, please refer to our{" "}
            <a className="shipping-link" href="/refund">
              Refund and Returns Policy
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      title: "10. Intellectual Property",
      content:
        "All content on this website, including text, graphics, logos, images, and software, is the property of Athletude LLP and is protected by applicable intellectual property laws. Unauthorized use of any content from this website is prohibited.",
    },
    {
      title: "11. User Conduct",
      content:
        "You agree not to use the website in a manner that could damage, disable, overburden, or impair the site or interfere with any other party’s use of the website. You are prohibited from violating or attempting to violate the security of the website.",
    },
    {
      title: "12. Limitation of Liability",
      content:
        "To the fullest extent permitted by law, Athletude LLP shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or products. Our total liability to you for any damages arising from or related to your use of the website or products shall not exceed the amount paid by you for the product(s) in question.",
    },
    {
      title: "13. Indemnification",
      content:
        "To the fullest extent permitted by law, Athletude LLP shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or products. Our total liability to you for any damages arising from or related to your use of the website or products shall not exceed the amount paid by you for the product(s) in question.",
    },
    {
      title: "14. Governing Law",
      content:
        "These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, India.",
    },
    {
      title: "15. Changes to Terms and Conditions",
      content:
        "We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the website following any changes constitutes acceptance of the new Terms.",
    },
    {
      title: "16. Contact Information",
      content: (
        <div>
          <p className="terms-para">
            For any queries regarding these Terms and Conditions, please contact
            us at:
          </p>
          <ul className="list-terms">
            <li className="mail-terms terms-height">
              {" "}
              <span style={{ fontWeight: 600, color: "black" }}>
                Email:{" "}
              </span>{" "}
              customercare@milkmygains.com
            </li>
            <li className="mail-terms terms-height">
              <span style={{ fontWeight: 600, color: "black" }}>Phone:</span>{" "}
              +91 9663696025
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
          <h1 className="terms-heading">TERMS AND CONDITIONS</h1>
          {termsData.map((section, index) => (
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

export default Terms;
