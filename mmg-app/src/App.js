import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './products';
import Header from './header';
import './App.css';
import Home from './home';
import Footer from './footer';
import Preload from './preload';

function App() {
  return (
    // <Preload />
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
