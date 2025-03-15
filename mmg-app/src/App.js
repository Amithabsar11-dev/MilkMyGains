import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProductPage from './products';
import ProductDetails from './ProductDetails';
import Header from './header';
import './App.css';
import Home from './home';
import Footer from './footer';
import Preload from './preload';
import FAQ from './faq.js';
import About from './About.js';
import { CartProvider } from './cartContext';
import Contact from './contact.js';
import Terms from './terms.js';
import Cards from './cards.js';
import Shipping from './shipping.js';
import Privacy from './privacy.js';
import Refund from './refund.js';
import Textanim from './text-anim.js';
import Sample from './sample.js';
import Textanimation from './textanimation.js';
import Raising from './raising.js';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloadEnabled, setIsPreloadEnabled] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const shouldShowPreload = location.pathname === '/';
    setIsPreloadEnabled(shouldShowPreload);
  
    if (!shouldShowPreload) {
      setIsLoaded(true); // Ensure non-home pages are always visible
    }
  }, [location.pathname]);
  
  useEffect(() => {
    if (isPreloadEnabled) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 6000);
      return () => clearTimeout(timer);  // ✅ Cleanup timer to avoid memory leaks
    }
  }, [isPreloadEnabled]);
  

  return (
    <CartProvider>
      <div className="">
        {isPreloadEnabled && !isLoaded && (
          <div className="preload-wrapper">
            <Preload />
          </div>
        )}
        <div className={`home-wrapper ${isLoaded? 'visible' : ''}`}>
          <Header />
          <Routes>
            <Route path="/" element={<Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/products" element={<ProductPage isLoaded={isLoaded} setIsLoaded={setIsLoaded}/>} />
            <Route path="/product/:handle" element={<ProductDetails isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/faq" element={<FAQ isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/about" element={<About isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/contact" element={<Contact isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/terms" element={<Terms isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/shipping" element={<Shipping isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/privacy" element={<Privacy isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/refund" element={<Refund isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/cards" element={<Cards isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/text" element={<Textanim isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/textanimation" element={<Textanimation isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/raising" element={<Raising isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;