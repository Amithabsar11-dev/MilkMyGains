import React, { useState,useRef,useEffect } from 'react';
import './home.css';
import MilkMyGain from './MilkMyGains';
import { Canvas } from '@react-three/fiber';
import Card1 from './assets/Card1.png';
import Card2 from './assets/Card2.png';
import Card3 from './assets/Card3.png';
import MilkMygains from './assets/MilkMyGains.png';
import Eyestar from './assets/Eyestar.svg';
import Signal from './assets/signal.svg';
import Star from './assets/Star.svg';
import Eye from './assets/eye.svg';
import Drop from './assets/drop.svg';
import Protein from './assets/protein.png';
import Milk from './assets/grains.png';

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
                        Transforming Vegetarian Nutrition: Accessible, High-<br />
                        Protein Solutions for an Active Lifestyle
                    </p>
                </div>
                <a className='link-to-know' href='#'>KNOW MORE</a>
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
