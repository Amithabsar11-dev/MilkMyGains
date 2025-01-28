import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloadEnabled, setIsPreloadEnabled] = useState(true);

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

  useEffect(() => {
    if (isPreloadEnabled) {
      const timer = setTimeout(() => setIsLoaded(true), 4000);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [isPreloadEnabled]);

  return (
    <CartProvider>
      <div className="app-wrapper">
        {/* Preload only appears on screens wider than 768px */}
        {isPreloadEnabled && !isLoaded  && (
          <div className="preload-wrapper">
            <Preload />
          </div>
        )}

        {/* Ensure the home page always renders */}
        <div className={`home-wrapper ${isLoaded ? 'visible' : ''}`}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/product/:handle" element={<ProductDetails />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Router>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
