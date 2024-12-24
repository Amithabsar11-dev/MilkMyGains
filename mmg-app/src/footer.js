import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer pt-5 row">
      <div className="footer-column mt-5 col-4">
        <h1 className='signup'>SIGN UP TO NEWSLETTER</h1>
        <input
          type="email"
          placeholder="Enter your email"
          className="footer-input"
        />
        <button className="footer-button">Subscribe</button>
      </div>
      <div className="footer-column shop-footer mt-5 col-4">
        <ul className="footer-links">
          <li>Shop</li>
          <li>About us</li>
          <li>FAQ</li>
          <li>Meet in Marco</li>
        </ul>
      </div>
      <div className="footer-column mt-5 col-4">
        <ul className="footer-links">
          <li>Search</li>
          <li>Terms & Conditions</li>
          <li>Accessibility Statement</li>
          <li>Questions</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
