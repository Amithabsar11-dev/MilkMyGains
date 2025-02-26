import React from 'react';
import './terms.css';
import Copyright1 from "./assets/copyright1.svg";
import MilkTM from './assets/Logo-TM.svg';
import Copyrightline from './assets/Line 23.svg';

function Privacy() {
    return (
        <><div className='terms-conditions'>
            <div className='terms-spacing mb-5'>
                <h1 className='terms-heading'>
                    Privacy Policy
                </h1>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        1. Introduction
                    </h3>
                    <p className='terms-para'>
                        At Milk My Gains, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or make a purchase.
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        2. Information We Collect
                    </h3>
                    <p className='terms-para'>
                        We collect the following personal information from you:
                        <ul className='listing-terms'>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Personal Identification Information:</span> Name, address, email, and phone number.</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Payment Information:</span> Credit/debit card details and other payment-related information.</li>
                        </ul>
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        3. How We Use Your Information
                    </h3>
                    <p className='terms-para'>
                        The information we collect is used for:
                        <ul className='listing-terms'>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Order Processing:</span> To process and fulfill your orders, including subscriptions.</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Customer Support:</span> To contact you regarding your orders or respond to your inquiries.</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Marketing Communications:</span> To send you promotional materials, newsletters, and other communications (with your consent).</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Service Improvement:</span> To enhance our website, products, and services based on your feedback and interactions.</li>
                        </ul>
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        4. Information Sharing and Disclosure
                    </h3>
                    <p className='terms-para'>
                        We do not rent, sell, or share your personal information with other people or non-affiliated entities without your consent, except in the following circumstances:
                        <ul className='listing-terms'>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Service Providers:</span> Payment processors and delivery partners may have access to your information to facilitate payments and deliveries.</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Third-Party Vendors and Contractors:</span> We may engage third-party vendors and contractors to perform certain support services; they may have limited access to your information.</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Legal Requirements:</span> We may disclose your information to government authorities in response to subpoenas, court orders, or other legal processes; to establish or exercise legal rights; to defend against legal claims; or as otherwise required by law.</li>
                        </ul>
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        5. Data Security
                    </h3>
                    <p className='terms-para'>
                        We do not rent, sell, or share your personal information with other people or non-affiliated entities without your consent, except in the following circumstances:
                        <ul className='listing-terms'>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Service Providers:</span> Payment processors and delivery partners may have access to your information to facilitate payments and deliveries.</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Third-Party Vendors and Contractors:</span> We may engage third-party vendors and contractors to perform certain support services; they may have limited access to your information.</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Legal Requirements:</span> We may disclose your information to government authorities in response to subpoenas, court orders, or other legal processes; to establish or exercise legal rights; to defend against legal claims; or as otherwise required by law.</li>
                        </ul>
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        6. Cookies and Tracking Technologies
                    </h3>
                    <p className='terms-para'>
                        We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can manage your cookie preferences through your browser settings.
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        7. Your Rights
                    </h3>
                    <p className='terms-para'>
                        You have the right to:
                        <ul className='listing-terms'>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Access:</span> Request a copy of the personal information we hold about you.</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Correction:</span> Request corrections to any inaccurate or incomplete data.</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Deletion:</span> Request the deletion of your personal information, subject to legal and contractual obligations.</li>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Opt-Out:</span> Unsubscribe from marketing communications at any time by following the unsubscribe link in our emails or contacting us directly.</li>
                        </ul>
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        8. Policy Updates
                    </h3>
                    <p className='terms-para'>
                        We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new policy on our website with the updated effective date.
                    </p>
                </div>
                <div className='conditions'>
                    <h3 className='terms-title'>
                        9. Contact Us
                    </h3>
                    <p className='terms-para'>
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                        <ul className='listing-terms'>
                            <li className='terms-height'><span style={{ fontWeight: 600, color:"black" }}> Email:</span> customercare@milkmygains.com</li>
                            <li className='terms-height'><span style={{ fontWeight: 600 , color:"black"}}> Address:</span> Bangalore, India: 560041</li>
                        </ul>
                    </p>
                </div>
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
                {/* <img src={Copyrightline} className="copyright-image" alt="copyright-pic" /> */}
                {/* <hr></hr> */}
                <p className="copyright-text">Copyright © 2025. All rights reserved</p>
            </div></>
    )
}

export default Privacy