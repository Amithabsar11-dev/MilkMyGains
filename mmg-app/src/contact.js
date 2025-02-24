import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import "./contact.css";
import Protein from "./assets/protein.png";
import MilkTM from './assets/Logo-TM.svg';
import Copyright1 from "./assets/copyright1.svg";
import Copyrightline from './assets/Line 23.svg';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [sentMessage, setSentMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message, phone } = formData;

        if (!name || !email || !message) {
            alert("Please fill in all fields");
            return;
        }

        const contactParams = {
            from_name: name,
            from_email: email,
            phone: phone,
            message: message
        };

        emailjs.send("service_xglpe44", "template_mf4k8pw", contactParams, "J-9fHZ30TkAO86pTS")
            .then(response => {
                setResponseMessage("Message sent successfully!");
                setSentMessage("Thank you for contacting us.");
                setFormData({ name: '', phone: '', email: '', message: '' });

                const thankYouParams = {
                    to_name: name,
                    to_email: email
                };

                return emailjs.send("service_xglpe44", "template_ij70yii", thankYouParams, "J-9fHZ30TkAO86pTS");
            })
            .then(response => {
                console.log("Thank You email sent successfully!", response);
            })
            .catch(error => {
                console.error("Error sending email:", error);
                setResponseMessage("Failed to send message.");
            });
    };

    return (
        <><>
            <div className='contact-color'>
                <div className="contact-container">
                    <h2 className="title">CONTACT</h2>
                    <p className="email">
                        <strong>
                            <a href="mailto:CUSTOMERCARE@MILKMYGAINS.COM">CUSTOMERCARE@MILKMYGAINS.COM</a>
                        </strong>
                    </p>
                    <p className="phone"><strong>CUSTOMER CARE +91 9663696025</strong></p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <div className="input-field">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required />
                            </div>
                            <div className="input-field">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="input-field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                required />
                        </div>
                        <button className="Subscribe-button-contact" type="submit">SEND</button>
                    </form>

                    {responseMessage && (
                        <div className="response-message">
                            {responseMessage}
                        </div>
                    )}
                    {sentMessage && (
                        <div className="sent-message">
                            {sentMessage}
                        </div>
                    )}
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
            </div></>
            <div className="footers mb-3">
                <p className="copyright-text">Copyright © 2025. All rights reserved</p>
            </div>

        </>
    );
};

export default ContactForm;
