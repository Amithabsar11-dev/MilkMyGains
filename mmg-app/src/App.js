import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './products';
import ProductDetails from './ProductDetails';
import Header from './header';
import './App.css';
import Home from './home';
import Footer from './footer';
import Preload from './preload';
import { CartProvider } from './cartContext';

function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(true), 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <div className="app-wrapper">
        <div className={`preload-wrapper ${isTransitioning ? 'slide-out' : ''}`}>
          <Preload />
        </div>
        <div className={`home-wrapper ${isTransitioning ? 'slide-in' : ''}`}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/product/:handle" element={<ProductDetails />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;