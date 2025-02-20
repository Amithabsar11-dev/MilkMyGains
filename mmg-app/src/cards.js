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

gsap.registerPlugin(ScrollTrigger);

const Card = ({ setIsLoaded }) => {
    const circleRef = useRef(null);

    useEffect(() => {
        if (!setIsLoaded) return;
        gsap.to(circleRef.current, {
            rotation: -187, 
            ease: "none",
            scrollTrigger: {
                trigger: ".parent",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                scroller: ".home-wrapper"
            }
        });
    }, [setIsLoaded]);

    return (
        <div>
            <div className="parent">
                <div className="circle-container">
                    <div className="circle" ref={circleRef}>
                        {/* card-3 */}
                        <div className="box carding3" style={{ transform: "rotate(-4deg) translateX(59vw) rotate(101deg) translateY(21vw)" }}>
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
                        <div className="box carding1" style={{ transform: "rotate(54deg) translateX(44vw) rotate(90deg) translateY(11vw)" }}>
                            <div className="carding-inner">
                                <div className="carding-front">
                                    <div className="carding-border">
                                        <img src={MythIcon} alt="EyeCard" className="carding-icon" />
                                        <p className="carding-text">Tracebility you <br />can trust </p>
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
                        <div className="box carding2" style={{ transform: "rotate(120deg) translateX(33vw) rotate(67deg) translateY(-7vw)" }}>
                            <div className="carding-inner">
                                <div className="carding-front">
                                    <div className="carding-border">
                                        <img src={PossibilitiesIcon} alt="Protein Myth" className="carding-icon" />
                                        <p className="carding-text">QUALITY BEGINS<br /> AT SOURCE</p>
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
                        <div className="box carding1" style={{ transform: "rotate(264deg) translateX(63vw) rotate(96deg)" }}>
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
                        <div className="box carding2" style={{ transform: "rotate(303deg) translateX(52vw) rotate(111deg)" }}>
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
        </div>
    );
};

export default Card;
