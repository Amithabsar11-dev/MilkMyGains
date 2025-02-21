import React from 'react';
import './terms.css';
import Copyright1 from "./assets/copyright1.svg";
import Milk from "./assets/Slice-3.svg";
import Copyrightline from './assets/Line 23.svg';

function Refund() {
    return (
        <><div className='terms-conditions'>
            <div className='terms-spacing mb-5'>
                <h1 className='terms-heading'>
                    Refund and Returns Policy
                </h1>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        1. No Returns After Purchase
                    </h3>
                    <p className='terms-para'>
                        Purchases made from the online store of milkmygains.com cannot be returned after purchase. We encourage customers to review their orders carefully before confirming.
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        2. Replacement for Damaged Products
                    </h3>
                    <p className='terms-para'>
                        We offer full replacement for products that are damaged during transit. To initiate a replacement:
                        <ul className='listing-terms'>
                            <li><span style={{ fontWeight: 600 }}> Notification Period:</span> Contact our customer support within <span style={{ fontWeight: 600 }}>2 hours</span> of receiving the product.</li>
                            <li><span style={{ fontWeight: 600 }}> Validation:</span> Our team will validate the damage through communication over email or phone.</li>
                            <li><span style={{ fontWeight: 600 }}> Processing:</span> Once validated, replacement orders are processed immediately.</li>
                        </ul>
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        3. Exchange Policy
                    </h3>
                    <p className='terms-para'>
                        milkmygains.com does not entertain exchanges after the order is successfully placed and payment is made by the buyer. Buyers are requested to place the order only if they agree with this term.
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        4. Cancellation & Refund Policy
                    </h3>
                    <p className='terms-para'>
                        Orders cannot be canceled, and refunds are not available once the order is successfully placed and processed by the payment gateway. Refund requests will only be considered in the following cases:
                        <ul className='listing-terms'>
                            <li><span style={{ fontWeight: 600 }}> Prepaid Orders:</span>  If the order is prepaid and the shipping location is not serviced by our partner courier companies.</li>
                            <li><span style={{ fontWeight: 600 }}> Processing Time:</span> From the date of written confirmation of refund to the customer, the amount will be refunded within the next <span style={{ fontWeight: 600 }}>7-10 business days</span> to the customer’s original mode of payment.</li>
                        </ul>
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        5. Non-Refundable Situations
                    </h3>
                    <p className='terms-para'>
                        No refunds will be given in the following cases:
                        <ul className='listing-terms'>
                            <li><span style={{ fontWeight: 600 }}> Incorrect or Insufficient Address:</span> Provided by the customer.</li>
                            <li><span style={{ fontWeight: 600 }}> Non-Availability:</span> Recipient not available at the mentioned address.</li>
                            <li><span style={{ fontWeight: 600 }}> Refusal to Accept:</span> Products refused at the time of delivery.</li>
                            <li><span style={{ fontWeight: 600 }}> Force Majeure Events:</span> Unforeseen circumstances beyond our control.</li>
                        </ul>
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        6. Contact Information
                    </h3>
                    <p className='terms-para'>
                        For any queries or concerns regarding our Refund and Returns Policy, please contact us at:
                        <ul className='listing-terms'>
                            <li><span style={{ fontWeight: 600 }}> Email:</span> customercare@milkmygains.com</li>
                            <li><span style={{ fontWeight: 600 }}> Address:</span> Bangalore, India: 560041</li>
                        </ul>
                    </p>
                </div>
            </div>
            <div className="proteins-container pt-5 pb-5">
                <div className="milk-pic-container">
                    <img src={Milk} className="milk-image2" alt="milk-pic" />
                </div>
                <div className="signup-container">
                    <h1 className="signup-heading">SIGNUP TO OUR NEWSLETTER</h1>
                    <div>
                        <input
                            type="email"
                            placeholder="YOUR EMAIL"
                            className="email-placing" />
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
        </div>
            <div className="footers mb-3">
                <p className="copyright-text">Copyright © 2025. All rights reserved</p>
            </div></>
    )
}

export default Refund