// import React, { useState, useEffect } from "react";
// import Eyestar from "./assets/eyediamond1.svg";
// import Signal from "./assets/shopicon1.svg";
// import Star from "./assets/staricon1.svg";
// import Eye from "./assets/eyeicon1.svg";
// import Drop from "./assets/dropicon1.svg";
// import Eyestar1 from "./assets/eyediamond.svg";
// import Signal1 from "./assets/shopicon.svg";
// import Star1 from "./assets/staricon.svg";
// import Eye1 from "./assets/eyeicon.svg";
// import Drop1 from "./assets/dropicon.svg";
// import TransparencyIcon from "./assets/transparency.svg";
// import MythIcon from "./assets/myth.svg";
// import PossibilitiesIcon from "./assets/unlockmilk.svg";
// import Protein from "./assets/protein.png";
// import Milk from "./assets/milkmylogo.svg";
// import Copyright1 from './assets/copyright1.svg';
// import Weightlift from "./assets/body builder.svg";
// import Lean from "./assets/basketball.svg";
// import Yoga from "./assets/yoga.svg";
// import './About.css';

// const cards = [
//     {
//         id: 1,
//         title: "Build Muscle",
//         content:
//             "Protein builds muscle and bone, supporting agility and resilience. It’s essential for vitality and longevity, fueling an active, enduring lifestyle.",
//         image: Weightlift,
//         number: "01",
//     },
//     {
//         id: 2,
//         title: "Stay Lean",
//         content:
//             "Protein boosts metabolism and keeps you feeling full, aiding in weight management and fat loss.",
//         image: Lean,
//         number: "02",
//     },
//     {
//         id: 3,
//         title: "Enhance Beauty",
//         content:
//             "A high-protein diet nourishes skin, strengthens nails, and promotes vibrant hair, contributing to a radiant appearance.",
//         image: Yoga,
//         number: "03",
//     },
// ];


// function About() {
//     const [activeCard, setActiveCard] = useState(1);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 768);
//         };
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const handleCardClick = (id) => {
//         if (!isMobile) {
//             setActiveCard(activeCard === id ? null : id);
//         }
//     };
//     return (
//         <div className='about-container'>
//             <div className='about-protein'>
//                 <div className="icon-paradigm">
//                     <img src={Star} alt="Star" className="star-icon" />
//                     <img src={Eyestar} alt="Diamond" className="diamond-icon" />
//                     <img src={Eye} alt="Eye" className="eye-icon" />
//                     <img src={Signal} alt="Shop" className="shop-icon" />
//                     <img src={Drop} alt="Drop" className="drop-icon" />
//                 </div>
//                 <div className='about-lifestyle'>
//                     <h1 className='about-heading'>PROTEIN FOR <br /> EVERY LIFESTYLE</h1>
//                     <p className='about-para'>MilkMyGains is a quest for high-quality, vegetarian protein to fuel an active<br /> lifestyle. Faced with limited options, we’re here to bridge India’s protein <br />gap, naturally and accessibly. More than a solution, it’s a mission to<br /> transform lives, one high-protein bite at a time.</p>
//                 </div>
//                 <div className='about-power'>
//                     <h1 className='about-header'>THE POWER OF<br /> PROTEIN</h1>
//                     <div className="card-container">
//                         {cards.map((card) => (
//                             <div
//                                 key={card.id}
//                                 className={`card ${isMobile || activeCard === card.id ? "active" : ""}`}
//                                 onClick={() => handleCardClick(card.id)}
//                             >
//                                 <h2 className="card-title">{card.title}</h2>
//                                 {(isMobile || activeCard === card.id) && (
//                                     <div className="card-content">
//                                         <div className="text-section">
//                                             <p className="card-text">{card.content}</p>
//                                         </div>
//                                         <div className="image-section">
//                                             <img className="card-image" src={card.image} alt={card.title} />
//                                             <span className="card-number">{card.number}</span>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className='about-challenge'>
//                 <h2 className='about-subheading'>CHALLENGING THE NORMS WITH</h2>
//                 <h1 className='about-nutrition'>PURE, POWERFUL <br /> NUTRITION</h1>
//                 <p className='about-para1'>In an industry dominated by carb-heavy, fat-laden dairy products,<br /> we’re here to rewrite the rules. Our approach isn’t about compromise; it’s about<br /> transformation. We are here to redefine<br /> nutrition for modern high-performance living.</p>
//             </div>
//             <div className="card-section">
//                 <div className="card1">
//                     <div className="card-inner">
//                         <div className="card-front">
//                             <img src={TransparencyIcon} alt="Transparency" className="card-icon" />
//                             <p className="card-text">TRANSPARENCY IN EVERY DROP</p>
//                         </div>
//                         <div className="card-back">
//                             <h1 className="back-heading">Transparency<br /> in every drop</h1>
//                             <p className="back-text">No secrets, no surprises.<br /> We’re upfront about every<br /> ingredient and every process,<br /> empowering you to make <br />informed choices about your<br /> nutrition.</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="card2">
//                     <div className="card-inner">
//                         <div className="card-front">
//                             <img src={MythIcon} alt="Protein Myth" className="card-icon" />
//                             <p className="card-text">BREAKING THE PROTEIN MYTH</p>
//                         </div>
//                         <div className="card-back">
//                             <h1 className="back-heading">Breaking the<br /> Protein Myth</h1>
//                             <p className="back-text">We’re challenging the belief<br /> that dairy can’t be high in<br /> protein and low in calories.<br /> MilkMyGains transforms dairy <br />into a nutritional powerhouse,<br /> proving that high-quality<br /> protein doesn’t have to come<br /> with excess fat.</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="card3">
//                     <div className="card-inner">
//                         <div className="card-front">
//                             <img src={PossibilitiesIcon} alt="New Possibilities" className="card-icon" />
//                             <p className="card-text">UNLOCKING NEW POSSIBILITIES</p>
//                         </div>
//                         <div className="card-back">
//                             <h1 className="back-heading">Unlocking new<br /> possibilities</h1>
//                             <p className="back-text">By pushing the boundaries of<br /> dairy science, we’ve crafted<br /> products with exceptional<br /> protein levels that were once<br /> thought impossible. We’re<br /> redefining what’s achievable<br /> using only natural<br /> ingredients.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='icon-container'>
//                 <div className="icon-paradigm">
//                     <img src={Star1} alt="Star" className="star-icon" />
//                     <img src={Eyestar1} alt="Diamond" className="diamond-icon" />
//                     <img src={Eye1} alt="Eye" className="eye-icon" />
//                     <img src={Signal1} alt="Shop" className="shop-icon" />
//                     <img src={Drop1} alt="Drop" className="drop-icon" />
//                 </div>
//             </div>
//             <div className='about-join-container'>
//                 <div className='about-join'>
//                     <h1 className='about-heading'>JOIN THE <br />MOVEMENT</h1>
//                     <p className='about-para'>MilkMyGains is more than a brand; it’s a mission to transform the way we see<br /> nutrition and active living. Each product is an invitation to embrace a high-protein,<br /> active lifestyle—one where quality, transparency, and innovation fuel your journey.<br /> Together, let’s change the paradigm of nutrition and redefine what it means to fuel<br /> your gains—naturally, powerfully, and purposefully.</p>
//                     <div className='protein-pic-container'>
//                         <img src={Protein} className="protein-image1" alt="protein-pic" />
//                     </div>
//                     <div className='milk-pic-container'>
//                         <img src={Milk} className="milk-image1" alt="milk-pic" />
//                     </div>
//                     <div className="signup-container">
//                         <h1 className="signup-heading">SIGNUP TO OUR NEWSLETTER</h1>
//                         <div>
//                             <input type="email" placeholder="YOUR EMAIL" className="email-placing" />
//                             <button type="button" className="subscribe">Subscribe</button>
//                         </div>
//                     </div>
//                     <div className="footers-column shop-footers mt-5">
//                         <ul className="footers-links">
//                             <li>SHOP</li>
//                             <li>ABOUT US</li>
//                             <li>FAQ</li>
//                             <li>BLOG</li>
//                             <li>CONTACT</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>x
//             {/* Footer Section */}
//             <div className="footers">
//                 <img src={Copyright1} className="copyright-image" alt="copyright-pic" />
//             </div>
//         </div>
//     )
// }

// export default About