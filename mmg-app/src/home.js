import React, { useState } from 'react';
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
    const images = [MilkMygains];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div>
            {/* Image Slider Section */}
            <div className="slider-container text-center" style={{height:"100vh"}}>
                <button className="arrow left" onClick={prevImage}>&lt;</button>
                <Canvas>
                    <MilkMyGain />
                </Canvas>
                <button className="arrow right" onClick={nextImage}>&gt;</button>
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
                    <p className='main-para'>Transforming Vegetarian Nutrition: Accessible, High-<br />Protein Solutions for an Active Lifestyle</p>
                </div>
                <a className='link-to-know' href='#'>KNOW MORE</a>
            </div>

            {/* Cards Section */}
            <section className="card-section d-flex justify-content-between ">
                <div className="card w-25">
                    <div className="card-inner">
                        <div className="card-front">
                            <img src={Card1} alt="card" className="card-image" />
                            <h3>TRANSPARENCY <br /> IN EVERY DROP</h3>
                        </div>
                        <div className="card-back">
                            <p>Content for Card 1.</p>
                        </div>
                    </div>
                </div>

                <div className="card w-25">
                    <div className="card-inner">
                        <div className="card-front">
                            <img src={Card2} alt="card" className="card-image" />
                            <h3>BREAKING THE <br /> PROTEIN MYTH</h3>
                        </div>
                        <div className="card-back">
                            <p>Content for Card 2.</p>
                        </div>
                    </div>
                </div>

                <div className="card w-25">
                    <div className="card-inner">
                        <div className="card-front">
                            <img src={Card3} alt="card" className="card-image" />
                            <h3>UNLOCKING NEW <br /> POSSIBILITIES</h3>
                        </div>
                        <div className="card-back">
                            <p>Content for Card 3.</p>
                        </div>
                    </div>
                </div>
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
