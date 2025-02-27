import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransparencyIcon from "./assets/Transparancy-card.svg";
import MythIcon from "./assets/myth-card.svg";
import PossibilitiesIcon from "./assets/unlocking-card.svg";
import TransparencyIconline from "./assets/spring-transparancy.svg";
import MythIconline from "./assets/spring-break.svg";
import PossibilitiesIconline from "./assets/spring-unlock.svg";
import EyeCard from './assets/EyeCard.svg';
import EyeCardline from './assets/EyeCardline.svg';
import Sunback from './assets/Sunback.svg';
import SunIcon from './assets/SunIcon.svg';
import "./cards.css";
import Eyestar from "./assets/eyediamond.svg";
import Signal from "./assets/shopicon.svg";
import Star from "./assets/staricon.svg";
import Eye from "./assets/eyeicon.svg";
import Drop from "./assets/dropicon.svg";
import EyesightIcon from "./assets/EyesightIcon.svg";
import SunlookIcon from "./assets/SunlookIcon.svg";

gsap.registerPlugin(ScrollTrigger);

const Card = ({ setIsLoaded }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const circleRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    useEffect(() => {
      if (!setIsLoaded) return;
      gsap.to(circleRef.current, {
        rotation: -127,
        ease: "none",
        scrollTrigger: {
          trigger: ".parent",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          scroller: ".home-wrapper",
        },
      });
    }, [setIsLoaded]);

    return (
        <><div className="testing-section" style={{height:"100vh"}}>
            <h1>Hiii</h1>
        </div><div className="container-paradigm">
                <div className="icon-paradigm">
                    <img src={Star} alt="Star" className="star-icon" />
                    <img src={Eyestar} alt="Diamond" className="diamond-icon" />
                    <img src={Eye} alt="Eye" className="eye-icon" />
                    <img src={Signal} alt="Shop" className="shop-icon" />
                    <img src={Drop} alt="Drop" className="drop-icon" />
                </div>
                <div className="paradigm-heading">
                    <h1 className="main-heading">
                        <span>CHANGING</span>
                        <span> THE</span> <br />
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
                {isMobile ? (
                    <div className="mobile-cards-container">
                        <div className="mobile-cards">
                            <div className="mobile-carding1">
                                <div className="carding-inner">
                                    <div className="carding-front">
                                        <div className="carding-border">
                                            <img src={TransparencyIcon} alt="Transparency" className="carding-icon" />
                                            <p className="carding-text">TRANSPARENCY <br /> IN EVERY DROP</p>
                                        </div>
                                    </div>
                                    <div className="carding-back">
                                        <div className="carding-border1">
                                            <h1 className="backing-heading">Transparency<br /> in every drop</h1>
                                            <p className="backing-text">No secrets, no surprises. We’re upfront about every ingredient and every process, empowering you to make informed choices about your nutrition.</p>
                                            <img src={TransparencyIcon} alt="Transparency" className="carding-icon-image" />
                                            <img src={TransparencyIconline} alt="New Possibilities" className="carding-icon-line1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-carding2">
                                <div className="carding-inner">
                                    <div className="carding-front">
                                        <div className="carding-border">
                                            <img src={MythIcon} alt="Protein Myth" className="carding-icon" />
                                            <p className="carding-text">BREAKING THE<br /> PROTEIN MYTH</p>
                                        </div>
                                    </div>
                                    <div className="carding-back">
                                        <div className="carding-border1">
                                            <h1 className="backing-heading">Breaking the<br /> Protein Myth</h1>
                                            <p className="backing-text">We’re challenging the belief that dairy can’t be high in protein and low in calories. MilkMyGains transforms dairy into a nutritional powerhouse, proving that high-quality protein doesn’t have to come with excess fat.</p>
                                            <img src={MythIcon} alt="Protein Myth" className="carding-icon-image" />
                                            <img src={MythIconline} alt="New Possibilities" className="carding-icon-line2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-carding3">
                                <div className="carding-inner">
                                    <div className="carding-front">
                                        <div className="carding-border">
                                            <img src={PossibilitiesIcon} alt="New Possibilities" className="carding-icon1" />
                                            <p className="carding-text">UNLOCKING NEW <br /> POSSIBILITIES</p>
                                        </div>
                                    </div>
                                    <div className="carding-back">
                                        <div className="carding-border1">
                                            <h1 className="backing-heading">Unlocking new<br /> possibilities</h1>
                                            <p className="backing-text">By pushing the boundaries of dairy science, we’ve crafted products with exceptional protein levels that were once thought impossible. We’re redefining what’s achievable using only natural ingredients.</p>
                                            <img src={PossibilitiesIcon} alt="New Possibilities" className="carding-icon-image" />
                                            <img src={PossibilitiesIconline} alt="New Possibilities" className="carding-icon-line3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-carding1">
                                <div className="carding-inner">
                                    <div className="carding-front">
                                        <div className="carding-border-4">
                                            <img src={EyesightIcon} alt="EyeCard" className="carding-icon-4" />
                                            <p className="carding-text-4">Tracebility you <br />can trust </p>
                                        </div>
                                    </div>
                                    <div className="carding-back">
                                        <div className="carding-border1">
                                            <h1 className="backing-heading">Tracebility you <br />can trust </h1>
                                            <p className="backing-text">No We believe you have the<br /> right to know where your <br />food comes from. Our <br /> transparent supply chain lets you trace each <br />product from farm to<br /> table, providing peace of<br /> mind with every bite.</p>
                                            <img src={MythIcon} alt="EyeCard" className="carding-icon-image" />
                                            <img src={MythIconline} alt="eyecard-line" className="carding-icon-line1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-carding1">
                                <div className="carding-inner">
                                    <div className="carding-front">
                                        <div className="carding-border-4">
                                            <img src={SunlookIcon} alt="Protein Myth" className="carding-icon-4" />
                                            <p className="carding-text-4">QUALITY BEGINS<br /> AT SOURCE</p>
                                        </div>
                                    </div>
                                    <div className="carding-back">
                                        <div className="carding-border1">
                                            <h1 className="backing-heading">QUALITY BEGINS<br />AT SOURCE</h1>
                                            <p className="backing-text">Excellence is our standard <br />from start to finish. We<br /> source only the finest raw<br /> materials to ensure that<br /> every MilkMyGains product<br /> offers superior nutrition and<br /> taste.</p>
                                            <img src={Sunback} alt="Protein Myth" className="carding-icon-image" />
                                            <img src={TransparencyIconline} alt="New Possibilities" className="carding-icon-line5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="parent">
                        <div className="circle-container">
                            <div className="circle" ref={circleRef}>
                                {/* card-3 */}
                                <div className="box carding3" >
                                    <div className="carding-inner">
                                        <div className="carding-front">
                                            <div className="carding-border">
                                                <img src={PossibilitiesIcon} alt="New Possibilities" className="carding-icon1" />
                                                <p className="carding-text">UNLOCKING NEW <br /> POSSIBILITIES</p>
                                            </div>
                                        </div>
                                        <div className="carding-back">
                                            <div className="carding-border1">
                                                <h1 className="backing-heading">Unlocking new<br /> possibilities</h1>
                                                <p className="backing-text">By pushing the boundaries of dairy science, we’ve crafted products with exceptional protein levels that were once thought impossible. We’re redefining what’s achievable using only natural ingredients.</p>
                                                <img src={PossibilitiesIcon} alt="New Possibilities" className="carding-icon-image" />
                                                <img src={PossibilitiesIconline} alt="New Possibilities" className="carding-icon-line3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* card-4 */}
                                <div className="box carding4" >
                                    <div className="carding-inner">
                                        <div className="carding-front">
                                            <div className="carding-border-4">
                                                <img src={EyesightIcon} alt="EyeCard" className="carding-icon-4" />
                                                <p className="carding-text-4">Tracebility you <br />can trust </p>
                                            </div>
                                        </div>
                                        <div className="carding-back">
                                            <div className="carding-border1">
                                                <h1 className="backing-heading">Tracebility you <br />can trust </h1>
                                                <p className="backing-text">No We believe you have the<br /> right to know where your <br />food comes from. Our <br /> transparent supply chain lets you trace each <br />product from farm to<br /> table, providing peace of<br /> mind with every bite.</p>
                                                <img src={MythIcon} alt="EyeCard" className="carding-icon-image" />
                                                <img src={MythIconline} alt="eyecard-line" className="carding-icon-line1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* card-5 */}
                                <div className="box carding5" >
                                    <div className="carding-inner">
                                        <div className="carding-front">
                                            <div className="carding-border-4">
                                                <img src={SunlookIcon} alt="Protein Myth" className="carding-icon-4" />
                                                <p className="carding-text-4">QUALITY BEGINS<br /> AT SOURCE</p>
                                            </div>
                                        </div>
                                        <div className="carding-back">
                                            <div className="carding-border1">
                                                <h1 className="backing-heading">QUALITY BEGINS<br />AT SOURCE</h1>
                                                <p className="backing-text">Excellence is our standard <br />from start to finish. We<br /> source only the finest raw<br /> materials to ensure that<br /> every MilkMyGains product<br /> offers superior nutrition and<br /> taste.</p>
                                                <img src={Sunback} alt="Protein Myth" className="carding-icon-image" />
                                                <img src={TransparencyIconline} alt="New Possibilities" className="carding-icon-line5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* card-1 */}
                                <div className="box carding1" >
                                    <div className="carding-inner">
                                        <div className="carding-front">
                                            <div className="carding-border">
                                                <img src={TransparencyIcon} alt="Transparency" className="carding-icon" />
                                                <p className="carding-text">TRANSPARENCY <br /> IN EVERY DROP</p>
                                            </div>
                                        </div>
                                        <div className="carding-back">
                                            <div className="carding-border1">
                                                <h1 className="backing-heading">Transparency<br /> in every drop</h1>
                                                <p className="backing-text">No secrets, no surprises. We’re upfront about every ingredient and every process, empowering you to make informed choices about your nutrition.</p>
                                                <img src={TransparencyIcon} alt="Transparency" className="carding-icon-image" />
                                                <img src={TransparencyIconline} alt="New Possibilities" className="carding-icon-line1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* card-2 */}
                                <div className="box carding2">
                                    <div className="carding-inner">
                                        <div className="carding-front">
                                            <div className="carding-border">
                                                <img src={MythIcon} alt="Protein Myth" className="carding-icon" />
                                                <p className="carding-text">BREAKING THE<br /> PROTEIN MYTH</p>
                                            </div>
                                        </div>
                                        <div className="carding-back">
                                            <div className="carding-border1">
                                                <h1 className="backing-heading">Breaking the<br /> Protein Myth</h1>
                                                <p className="backing-text">We’re challenging the belief that dairy can’t be high in protein and low in calories. MilkMyGains transforms dairy into a nutritional powerhouse, proving that high-quality protein doesn’t have to come with excess fat.</p>
                                                <img src={MythIcon} alt="Protein Myth" className="carding-icon-image" />
                                                <img src={MythIconline} alt="New Possibilities" className="carding-icon-line2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="know-button-container">
                    <button class="know-button">KNOW MORE</button>
                </div>
            </div></>
    );
};

export default Card;
