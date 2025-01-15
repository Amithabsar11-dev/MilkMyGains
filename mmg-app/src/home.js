import React, { useState, useRef, useEffect } from 'react';
import './home.css';
import MilkMyGain from './MilkMyGains';
import { Canvas } from '@react-three/fiber';
import Card1 from './assets/Card1.png';
import Card2 from './assets/Card2.png';
import Card3 from './assets/Card3.png';
import MilkMygains from './assets/MilkMyGains.png';
import Eyestar from './assets/eyediamond.svg';
import Signal from './assets/shopicon.svg';
import Star from './assets/staricon.svg';
import Eye from './assets/eyeicon.svg';
import Drop from './assets/dropicon.svg';
import Protein from './assets/protein.png';
import Milk from './assets/grains.png';
import MilkBg from './assets/Vector (1).png';
import MilkBg1 from './assets/Vector (2).png';
import MilkBg2 from './assets/Vector (3).png';
import MilkBg3 from './assets/Vector (4).png';
import OrderButton from './assets/paneerorder.svg';
import OrderButton1 from './assets/milk.svg';
import OrderButton2 from './assets/yogart.svg';
import OrderButton3 from './assets/icecream.svg';
import Words from './assets/words.svg';
import ProteinCap from './assets/protein-cap.svg';

const Home = () => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = (e) => {
    if (scrolling) return;
    setScrolling(true);

    const direction = e.deltaY > 0 ? 'down' : 'up';

    if (direction === 'down') {
      window.scrollBy(0, window.innerHeight);  // Scroll to next section
    } else {
      window.scrollBy(0, -window.innerHeight);  // Scroll to previous section
    }

    // Reset scrolling state after a short delay to prevent continuous scrolling
    setTimeout(() => {
      setScrolling(false);
    }, 1000);  // 1 second delay
  };

  const [scrollIndex, setScrollIndex] = useState(0); // Track the current index
  const scrollRef = useRef(null); // Ref to the scroll container

  const handleScrolls = () => {
    const container = scrollRef.current;
    const scrollPosition = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const cardWidth = container.children[0].offsetWidth;

    // Check if the user has scrolled to the right to show the next card
    if (scrollPosition + containerWidth >= cardWidth * (scrollIndex + 1)) {
      setScrollIndex((prevIndex) => Math.min(prevIndex + 1, 5)); // Only up to 6 cards
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    container.addEventListener('scroll', handleScrolls);
    return () => {
      container.removeEventListener('scroll', handleScrolls);
    };
  }, [scrollIndex]);


  return (
    <div className='home-container'>
      {/* Image Slider Section */}
      <div
        className="slider-container text-center"
        style={{ height: '100vh' }}
        onWheel={handleScroll}  // Add onWheel event to detect scroll
      >
        <img src={MilkBg} alt='milk-bg' className='milkbg' />
        <img src={MilkBg1} alt='milk-bg1' className='milkbg1' />
        <img src={MilkBg2} alt='milk-bg2' className='milkbg2' />
        <img src={MilkBg3} alt='milk-bg3' className='milkbg3' />
        <div className='order-buttons'>
          <img src={OrderButton} alt='order-button' className='paneer-button' />
          <img src={OrderButton1} alt='order-button' className='milk-button' />
          <img src={OrderButton2} alt='order-button' className='yogart-button' />
          <img src={OrderButton3} alt='order-button' className='icecream-button' />
        </div>

        <Canvas>
          <MilkMyGain />
        </Canvas>
      </div>
      {/* Change the Paradigm */}
      <div className='container-paradigm'>
        <div className='icon-paradigm'>
          <img src={Star} alt="Star" className='star-icon' />
          <img src={Eyestar} alt="Diamond" className='diamond-icon' />
          <img src={Eye} alt="Eye" className='eye-icon' />
          <img src={Signal} alt="Shop" className='shop-icon' />
          <img src={Drop} alt="Drop" className='drop-icon' />
        </div>
        <div className='paradigm-heading'>
          <h1 className='main-heading'>CHANGING THE <br />PARADIGM</h1>
        </div>
        <div className='paradigm-para'>
          <p className='main-para'>
            Transforming Vegetarian Nutrition: <br />Accessible, High-Protein Solutions for an<br /> Active Lifestyle

          </p>
        </div>
        {/* <a className='link-to-know' href='#'>KNOW MORE</a> */}
      </div>

      {/* Cards Section */}
      <section className="card-section" ref={scrollRef}>
        {[...Array(6)].map((_, index) => {
          const cardContent = index < 3 ? `Card ${index + 1}` : `Card ${index - 2}`;
          const cardImage = index === 0 ? Card1 : index === 1 ? Card2 : index === 2 ? Card3 : index === 3 ? Card1 : index === 4 ? Card2 : Card3;
          return (
            <div className="card" key={index} style={{ opacity: index <= scrollIndex ? 1 : 1 }}>
              <div className="card-inner">
                <div className="card-front">
                  <img src={cardImage} alt={`card-${index}`} className="card-image" />
                  <h3>{cardContent}</h3>
                </div>
                <div className="card-back">
                  <p>Content for {cardContent}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Pure Protein Zero */}
      <div className='container-pure'>
        <div className='row row-pure'>
          <div className='col-6'>
            <h1 className='crafted-pure'>crafted with a purpose: it’s<br /> high in protein, low in fat,<br /> and low in calories—without<br /> compromising on taste.</h1>
            <img src={Words} alt='words' className='words' />
          </div>
          <div className='col-6'>
            <img src={ProteinCap} alt='protein-cap' className='protein-cap' />
            <h1 className='pure-heading'>PURE<br /> PROTEIN.<br /> ZERO<br /> COMPRO<br />MISE.</h1>
          </div>
        </div>
      </div>

      {/* Proteins Section */}
      <div className='proteins-heading'>
        <img src={Protein} className='protein-image' alt='protein-pic' />
      </div>

      {/* Milk Section */}
      <div className='milk-heading'>
        <img src={Milk} className='milk-image' alt='milk-pic' />
      </div>
    </div>
  );
};

export default Home;
