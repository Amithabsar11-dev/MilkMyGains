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
import Cards from './cards.js';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloadEnabled, setIsPreloadEnabled] = useState(true);
  const location = useLocation();

  // Handle preloading logic for the home page
  useEffect(() => {
    const shouldShowPreload = location.pathname === '/'; // Only show preload on home page

    if (shouldShowPreload) {
      const timer = setTimeout(() => setIsLoaded(true), 6000);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true); // Skip preload if not on home page
    }
  }, [location.pathname, isPreloadEnabled]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsPreloadEnabled(mediaQuery.matches);

    const listener = (event) => {
      setIsPreloadEnabled(event.matches);
    };

    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return (
    <CartProvider>
      <div className="">
        {isPreloadEnabled && !isLoaded && (
          <div className="preload-wrapper">
            <Preload />
          </div>
        )}
        <div className={`home-wrapper ${isLoaded ? 'visible' : ''}`}>
            <Header />
            <Routes>
              <Route path="/" element={<Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/product/:handle" element={<ProductDetails />} />
              <Route path="/faq" element={<FAQ isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
              <Route path="/about" element={<About isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
              <Route path="/contact" element={<Contact isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
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
