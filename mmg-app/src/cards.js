import React, { useRef, useEffect } from 'react';
import TransparencyIcon from "./assets/transparency.svg";
import MythIcon from "./assets/myth.svg";
import PossibilitiesIcon from "./assets/unlockmilk.svg";
import './cards.css';
import Lenis from '@studio-freight/lenis';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyestar from "./assets/eyediamond.svg";
import Signal from "./assets/shopicon.svg";
import Star from "./assets/staricon.svg";
import Eye from "./assets/eyeicon.svg";
import Drop from "./assets/dropicon.svg";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
    { image: TransparencyIcon, text: "TRANSPARENCY IN EVERY DROP", backText: "We ensure the highest quality standards." },
    { image: MythIcon, text: "PURE INGREDIENTS, PURE JOY", backText: "Only natural, no additives!" },
    { image: PossibilitiesIcon, text: "NATURE'S GOODNESS, BOTTLED", backText: "Packed with essential nutrients." },
    { image: TransparencyIcon, text: "SUSTAINABLY SOURCED, ETHICALLY MADE", backText: "Our process is 100% eco-friendly." },
    { image: MythIcon, text: "CRAFTED FOR YOUR WELL-BEING", backText: "Supporting a healthier lifestyle." },
    { image: PossibilitiesIcon, text: "EXPERIENCE THE DIFFERENCE", backText: "Taste the purity in every sip." },
];

const Cards = () => {
    const stickySectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const stickySection = stickySectionRef.current;
        const cards = cardsRef.current;
        const totalCards = cards.length;
        const stickyHeight = window.innerHeight * 7;

        const scrollTrigger = ScrollTrigger.create({
            trigger: stickySection,
            start: "top top",
            end: `+=${stickyHeight}px`,
            pin: true,
            scroller: ".home-wrapper",
            scrub: 1,
            onUpdate: (self) => {
                positionCards(self.progress);
            },
        });

        const getRadius = () => {
            return window.innerWidth < 900 ? window.innerWidth * 7 : window.innerWidth * 2;
        };

        const arcAngle = Math.PI * 0.4;
        const startAngle = Math.PI / 2 - arcAngle / 2;

        function positionCards(progress = 0) {
            const radius = getRadius();
            const totalTravel = 1 + totalCards / 7.5;
            const adjustedProgress = (progress * totalTravel - 1) * 0.75;

            cards.forEach((card, i) => {
                const normalizedProgress = (totalCards - 1 - i) / totalCards;
                const cardProgress = normalizedProgress + adjustedProgress;
                const angle = startAngle + arcAngle * cardProgress;

                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

                gsap.set(card, {
                    x: x,
                    y: -y + radius,
                    rotation: -rotation,
                    transformOrigin: "center center",
                    opacity: cardProgress > 1 || cardProgress < -0.1 ? 0 : 1,
                });
            });
        }

        positionCards(0);

        return () => {
            scrollTrigger.kill();
            ScrollTrigger.killAll();
        };
    }, []);

    useEffect(() => {
        const words = document.querySelectorAll('.main-heading span');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".container-paradigm",
                start: "top top",
                end: "bottom top",
                once: true
            }
        });

        // Animate each word
        words.forEach((word, index) => {
            tl.to(word, {
                opacity: 1,
                x: 0,
                duration: 0.3,
                delay: index * 0.1
            }, "<");
        });

        return () => {
            ScrollTrigger.killAll();
        };
    }, []);

    return (
        <>
            <div className='container-paradigm'>
                <div className="icon-paradigm">
                    <img src={Star} alt="Star" className="star-icon" />
                    <img src={Eyestar} alt="Diamond" className="diamond-icon" />
                    <img src={Eye} alt="Eye" className="eye-icon" />
                    <img src={Signal} alt="Shop" className="shop-icon" />
                    <img src={Drop} alt="Drop" className="drop-icon" />
                </div>
                <div className="paradigm-heading">
                    <h1 className="main-heading">
                        <span>CHANGING</span> <br />
                        <span>THE</span> <br />
                        <span>PARADIGM</span>
                    </h1>
                </div>
                <div className="paradigm-para">
                    <p className="main-para">
                        Transforming Vegetarian Nutrition: <br />
                        Accessible, High-Protein Solutions for an
                        <br /> Active Lifestyle
                    </p>
                </div>
                {/* <div className='steps'> */}
                <div ref={stickySectionRef} className="steps">
                    <div className="cards">
                        {cardData.map((card, index) => (
                                <div key={index} ref={(el) => (cardsRef.current[index] = el)} className="card">
                                    <div className="card-inner">
                                        {/* Front Side */}
                                        <div className="card-front">
                                            <div className='card-border'>
                                                <div className="card-img">
                                                    <img src={card.image} alt={card.text} className="card-icon" />
                                                </div>
                                                <div className="card-content">
                                                    <p className="card-text">{card.text}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Back Side */}
                                        <div className="card-back">
                                            <p className="back-text">{card.backText}</p>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
                <a className="link-to-know" href="#">KNOW MORE</a>
            </div>
        </>

    )
}

export default Cards;


