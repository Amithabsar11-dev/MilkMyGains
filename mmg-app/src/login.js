import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MilkTM from "./assets/Logo-TM-1.svg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        formData
      );
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/profile"); // Redirect to profile
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data);
      alert("Invalid email or password.");
    }
  };

  return (
    <>
      <div className="contact-color">
        <div className="contact-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
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
      </div>
      <div className="footers mb-3">
        <p className="copyright-text">Copyright © 2025. All rights reserved</p>
      </div>
    </>
  );
};

export default Login;
