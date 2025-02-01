import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./home.css";
import Cards from "./cards";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import MilkMyGain from "./MilkMyGains";
import { Canvas } from "@react-three/fiber";
import Card1 from "./assets/Card1.png";
import Card2 from "./assets/Card2.png";
import Card3 from "./assets/Card3.png";
import MilkMygains from "./assets/MilkMyGains.png";
import Eyestar from "./assets/eyediamond.svg";
import Signal from "./assets/shopicon.svg";
import Star from "./assets/staricon.svg";
import Eye from "./assets/eyeicon.svg";
import Drop from "./assets/dropicon.svg";
import Protein from "./assets/protein.png";
import Milk from "./assets/milkmylogo.svg";
import MilkBg from "./assets/Vector (1).png";
import MilkBg1 from "./assets/Vector (2).png";
import MilkBg2 from "./assets/Vector (3).png";
import MilkBg3 from "./assets/Vector (4).png";
import OrderButton from "./assets/paneerorder.svg";
import OrderButton1 from "./assets/milk.svg";
import OrderButton2 from "./assets/yogart.svg";
import OrderButton3 from "./assets/icecream.svg";
import Order1Button from "./assets/paneer-button.svg";
import Order2Button from "./assets/milk-button.svg";
import Order3Button from "./assets/yogart-button.svg";
import Order4Button from "./assets/icecream-button.svg";
import Words from "./assets/words.svg";
import ProteinCap from "./assets/protein-cap.svg";
import Weightlift from "./assets/body builder.svg";
import ProteinSlogan from "./assets/protein-slogan.svg";
import Raisingprotein from "./assets/high-protein.svg";
import Paneericon from "./assets/Panner-icon.svg";
import Proteins from "./assets/meat.svg";
import Whey from "./assets/powder.svg";
import Energybar from "./assets/ricebag.svg";
import Palakpaneer from "./assets/paneercubes.svg";
import Vegbowl from "./assets/vegbowl.svg";
import Recepiesbutton from "./assets/recepiesbutton.svg";
import Stickers from "./assets/Stickers.svg";
import Arrowpoint from "./assets/arrowpoint.svg";
import Copyright1 from "./assets/copyright1.svg";
import TransparencyIcon from "./assets/transparency.svg";
import MythIcon from "./assets/myth.svg";
import PossibilitiesIcon from "./assets/unlockmilk.svg";
import Object from "./assets/OBJECTS.svg";
// import { useNavigate } from "react-router-dom";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    image: TransparencyIcon,
    text: "TRANSPARENCY IN EVERY DROP",
    backText: "We ensure the highest quality standards.",
  },
  {
    image: MythIcon,
    text: "PURE INGREDIENTS, PURE JOY",
    backText: "Only natural, no additives!",
  },
  {
    image: PossibilitiesIcon,
    text: "NATURE'S GOODNESS, BOTTLED",
    backText: "Packed with essential nutrients.",
  },
  {
    image: TransparencyIcon,
    text: "SUSTAINABLY SOURCED, ETHICALLY MADE",
    backText: "Our process is 100% eco-friendly.",
  },
  {
    image: MythIcon,
    text: "CRAFTED FOR YOUR WELL-BEING",
    backText: "Supporting a healthier lifestyle.",
  },
  {
    image: PossibilitiesIcon,
    text: "EXPERIENCE THE DIFFERENCE",
    backText: "Taste the purity in every sip.",
  },
];

const Home = ({ setIsLoaded }) => {
  const [currentModel, setCurrentModel] = useState("/mmg1.glb");
  const [isNext, setIsNext] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  // const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("paneer");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const getButtonImage = (button) => {
    if (button === activeButton) {
      return button === "paneer"
        ? OrderButton
        : button === "milk"
        ? Order2Button
        : button === "yogart"
        ? Order2Button
        : Order4Button;
    } else {
      return button === "paneer"
        ? Order1Button
        : button === "milk"
        ? OrderButton1
        : button === "yogart"
        ? OrderButton2
        : OrderButton3;
    }
  };

  const handleModelChange = (modelPath, button, direction) => {
    console.log("Switching model to:", modelPath);
    setCurrentModel(modelPath);
    setActiveButton(button);
    setIsNext(direction === "next");
  };

  useEffect(() => {
    console.log("Current Model Path:", currentModel);
  }, [currentModel]);

  const handleScroll = (e) => {
    if (scrolling) return;
    setScrolling(true);

    const direction = e.deltaY > 0 ? "down" : "up";

    if (direction === "down") {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    } else {
      window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
    }
    setTimeout(() => {
      setScrolling(false);
    }, 1000);
  };

  //Card Animation
  const stickySectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!setIsLoaded) return;
    const stickySection = stickySectionRef.current;
    const cards = cardsRef.current;
    const totalCards = cards.length;
  
    // Dynamically adjust the sticky height to match the number of cards
    const stickyHeight = window.innerHeight * (5 + totalCards * 0.2);
  
    const scrollTrigger = ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyHeight}px`,
      pin: true,
      scroller: ".home-wrapper",
      scrub: 2,
      onUpdate: (self) => {
        positionCards(self.progress);
      },
      onLeave: () => {
        gsap.to(stickySection, { opacity: 1, duration: 0.3 });
      },
      onEnterBack: () => {
        gsap.to(stickySection, { opacity: 1, duration: 0.3 });
      }
    });
  
    const getRadius = () => {
      return window.innerWidth < 900 ? window.innerWidth * 7 : window.innerWidth * 2;
    };
  
    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;
  
    function positionCards(progress = 0) {
      const radius = getRadius();
      const totalTravel = 1 + totalCards / 5;
  
      // Ensure the last card stops at the center
      const adjustedProgress = (progress * totalTravel - 0.4) * 0.85; 
  
      cards.forEach((card, i) => {
        const normalizedProgress = (totalCards - 1 - i) / totalCards;
        const cardProgress = normalizedProgress + adjustedProgress;
  
        // Clamp progress so last card doesn't overshoot
        const clampedProgress = Math.min(Math.max(cardProgress, 0), 1); 
  
        const angle = startAngle + arcAngle * clampedProgress;
  
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotation = (angle - Math.PI / 2) * (180 / Math.PI);
  
        gsap.set(card, {
          x: x,
          y: -y + radius,
          rotation: -rotation,
          transformOrigin: "center center",
          opacity: clampedProgress > 1 || clampedProgress < -0.1 ? 0 : 1,
        });
      });
    }
  
    positionCards(0);
  
    return () => {
      scrollTrigger.kill();
      ScrollTrigger.killAll();
    };
  }, [setIsLoaded]);
  

  useEffect(() => {
    if (!setIsLoaded) return;
    const words = document.querySelectorAll(".main-heading span");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container-paradigm",
        start: "top 80%",
        end: "bottom top",
        once: false,
        scroller: ".home-wrapper",
        toggleActions: "restart none none reset",
      },
      onComplete: () => {
        setIsLoaded(true);
      },
    });

    // Animate each word
    words.forEach((word, index) => {
      tl.to(
        word,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: index * 0.3,
        },
        "<"
      );
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [setIsLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      const containerPure = document.querySelector(".container-pure");
      const scrollTop = window.scrollY;

      // Apply a bending effect to .container-pure based on scroll
      if (scrollTop > 0) {
        const bendEffect = Math.min(scrollTop / 10, 50); // Control bend strength
        containerPure.style.backgroundPosition = `center ${bendEffect}px`;
        containerPure.style.backgroundSize = `cover ${100 + bendEffect}%`; // Slight scaling
      } else {
        containerPure.style.backgroundPosition = "center top";
        containerPure.style.backgroundSize = "cover";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [scrollIndex, setScrollIndex] = useState(0); // Track the current index
  const scrollRef = useRef(null); // Ref to the scroll container

  // Testing Animation

  console.log("ScrollTrigger initialized");

  // Table Animation
  useEffect(() => {
    if (!setIsLoaded) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".animation-container",
        start: "top 80%", // Start when 80% of the section is in view
        end: "bottom 20%", // End when 20% is still visible
        toggleActions: "restart none none reset",
        scroller: ".home-wrapper",
      },
      onComplete: () => setIsLoaded(true),
    });

    // Step 1: Show "RAISING THE BAR" at the center
    tl.fromTo(
      ".raising, .bar",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    )

      // Step 2: Move "RAISING" left & "THE BAR" right
      .to(".raising", { x: "-65px", duration: 1, ease: "power2.out" }, "-=0.5")
      .to(".bar", { x: "215px", duration: 1, ease: "power2.out" }, "-=1")

      // Step 3: Show "HIGH PROTEINS LOW CALORIES" with zoom effect
      .fromTo(
        ".middle-text",
        { opacity: 0, scale: 0.5, fontWeight: 400 },
        {
          opacity: 1,
          scale: 1.1,
          fontWeight: 900,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.1,
        }
      );

    // Step 4: Animate comparison table columns
    gsap.fromTo(
      ".comparison-column",
      { opacity: 0, x: "100%" },
      {
        opacity: 1,
        x: "0%",
        duration: 1,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".comparison-table",
          start: "top 85%",
          scroller: ".home-wrapper",
          toggleActions: "restart none none reset",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [setIsLoaded]);

  //pure protein animation
  useEffect(() => {
    const cap = document.querySelector(".protein-cap");

    gsap.fromTo(
      cap,
      { rotation: 0, x: 0 }, // Start with some offset
      {
        rotation: 1080, // One full circular motion
        duration: 2, // Faster at the start
        ease: "power4.out", // Slows down at the end
        x: 0, // Moves back smoothly
        scrollTrigger: {
          trigger: ".container-pure",
          start: "top 70%", // Starts when 70% of the section is in view
          end: "bottom 50%",
          scroller: ".home-wrapper",
          toggleActions: "restart none none reset", // Replays when re-entered
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!setIsLoaded) return;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".container-pure",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          scroller: ".home-wrapper",
        },
      })
      .to(".overlay-path", { attr: { d: paths.curve1 }, duration: 1 })
      .to(".overlay-path", { attr: { d: paths.curve2 }, duration: 1 });
  }, [setIsLoaded]);

  // Footer - background
  useEffect(() => {
    if (!setIsLoaded) return;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".proteins-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          scroller: ".home-wrapper",
        },
      })
      .to(".overlay-path1", { attr: { d: paths.curve1 }, duration: 1 })
      .to(".overlay-path1", { attr: { d: paths.curve2 }, duration: 1 });
  }, [setIsLoaded]);

  const paths = {
    start: "M 0 0 V 0 Q 50 0 100 0 V 0 Z", // Flat at the top
    curve1: "M 0 0 V 10 Q 50 20 100 10 V 0 Z", // Smaller curve
    curve2: "M 0 0 V 20 Q 50 30 100 20 V 0 Z", // Slightly larger curve
  };
  // Banner Animation Curve
  // useEffect(() => {
  //   if (!setIsLoaded) return;
  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".slider-container",
  //       start: "top bottom",
  //       end: "bottom top",
  //       scrub: 1,
  //       scroller: ".home-wrapper",
  //     },
  //   })
  //     .to(".overlay-path", { attr: { d: path1.curveBottom1 }, duration: 1 })
  //     .to(".overlay-path", { attr: { d: path1.curveBottom2 }, duration: 1 });
  // }, [setIsLoaded]);

  // const path1 = {
  //   startBottom: "M 0 100 V 100 Q 50 95 100 100 V 100 Z",
  //   curveBottom1: "M 0 100 V 95 Q 50 90 100 95 V 100 Z",
  //   curveBottom2: "M 0 100 V 90 Q 50 85 100 90 V 100 Z"
  // };

  return (
    <div className="home-container">
      <div
        className="slider-container text-center"
        style={{ height: "100vh" }}
        onWheel={handleScroll}
      >
        {/* <svg className="svg-overlay-bottom" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className="overlay-path" vectorEffect="non-scaling-stroke" d={paths.startBottom} />
        </svg> */}
        <img src={MilkBg} alt="milk-bg" className="milkbg" />
        <img src={MilkBg1} alt="milk-bg1" className="milkbg1" />
        <img src={MilkBg2} alt="milk-bg2" className="milkbg2" />
        <img src={MilkBg3} alt="milk-bg3" className="milkbg3" />
        <img src={Object} alt="object-order" className="object-order" />

        <div className="order-buttons">
          <img
            src={getButtonImage("paneer")}
            alt="order-button"
            className={`paneer-button ${
              activeButton === "paneer" ? "active" : ""
            }`}
            onClick={() => handleModelChange("/mmg1.glb", "paneer", "prev")}
          />
          <img
            src={getButtonImage("milk")}
            alt="order-button"
            className={`milk-button ${activeButton === "milk" ? "active" : ""}`}
            onClick={() => handleModelChange("/packet_1.glb", "milk", "next")}
          />
          <img
            src={getButtonImage("yogart")}
            alt="order-button"
            className={`yogart-button ${
              activeButton === "yogart" ? "active" : ""
            }`}
          />
          <img
            src={getButtonImage("icecream")}
            alt="order-button"
            className={`icecream-button ${
              activeButton === "icecream" ? "active" : ""
            }`}
          />
        </div>

        <Canvas key={currentModel}>
          <MilkMyGain modelPath={currentModel} />
        </Canvas>
      </div>

      {/* Change the Paradigm */}
      {/* <div className="container-paradigm">
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
        <div className="card-section">
          <div className="card1">
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={TransparencyIcon}
                  alt="Transparency"
                  className="card-icon"
                />
                <p className="card-text">TRANSPARENCY IN EVERY DROP</p>
              </div>
              <div className="card-back">
                <h1 className="back-heading">
                  Transparency
                  <br /> in every drop
                </h1>
                <p className="back-text">
                  No secrets, no surprises.
                  <br /> We’re upfront about every
                  <br /> ingredient and every process,
                  <br /> empowering you to make <br />
                  informed choices about your
                  <br /> nutrition.
                </p>
              </div>
            </div>
          </div>
          <div className="card2">
            <div className="card-inner">
              <div className="card-front">
                <img src={MythIcon} alt="Protein Myth" className="card-icon" />
                <p className="card-text">BREAKING THE PROTEIN MYTH</p>
              </div>
              <div className="card-back">
                <h1 className="back-heading">
                  Breaking the
                  <br /> Protein Myth
                </h1>
                <p className="back-text">
                  We’re challenging the belief
                  <br /> that dairy can’t be high in
                  <br /> protein and low in calories.
                  <br /> MilkMyGains transforms dairy <br />
                  into a nutritional powerhouse,
                  <br /> proving that high-quality
                  <br /> protein doesn’t have to come
                  <br /> with excess fat.
                </p>
              </div>
            </div>
          </div>

          <div className="card3">
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={PossibilitiesIcon}
                  alt="New Possibilities"
                  className="card-icon"
                />
                <p className="card-text">UNLOCKING NEW POSSIBILITIES</p>
              </div>
              <div className="card-back">
                <h1 className="back-heading">
                  Unlocking new
                  <br /> possibilities
                </h1>
                <p className="back-text">
                  By pushing the boundaries of
                  <br /> dairy science, we’ve crafted
                  <br /> products with exceptional
                  <br /> protein levels that were once
                  <br /> thought impossible. We’re
                  <br /> redefining what’s achievable
                  <br /> using only natural
                  <br /> ingredients.
                </p>
              </div>
            </div>
          </div>
        </div>
        <a className="link-to-know" href="#">
          KNOW MORE
        </a>
      </div> */}
      <div className="container-paradigm pt-5">
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
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="card"
              >
                <div className="card-inner">
                  {/* Front Side */}
                  <div className="card-front">
                    <div className="card-border">
                      <div className="card-img">
                        <img
                          src={card.image}
                          alt={card.text}
                          className="card-icon"
                        />
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
        <a className="link-to-know" href="#">
          KNOW MORE
        </a>
      </div>
      {/* Pure Protein Zero */}
      <div className="container-pure">
        <svg
          className="svg-overlay"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            className="overlay-path"
            vectorEffect="non-scaling-stroke"
            d={paths.start}
          />
        </svg>
        <div className="row row-pure">
          <div className="col-sm-6">
            <h1 className="crafted-pure">
              crafted with a purpose: it’s
              <br /> high in protein, low in fat,
              <br /> and low in calories—without
              <br /> compromising on taste.
            </h1>
            <img src={Words} alt="words" className="words" />
          </div>
          <div className="col-sm-6">
            <img src={ProteinCap} alt="protein-cap" className="protein-cap" />
            <h1 className="pure-heading">
              PURE
              <br /> PROTEIN.
              <br /> ZERO
              <br /> COMPRO
              <br />
              MISE.
            </h1>
          </div>
        </div>
      </div>
      {/* Power Of Protein */}
      <div className="power-wrapper">
        <div className="power-container bg-white">
          <div className="power-space">
            <h1 className="power-heading">
              THE POWER <br />
              OF PROTEIN
            </h1>
            <div className="row row-build">
              <div className="col-sm-6 build-text">
                <div className="build-container">
                  <h1 className="build">BUILD MUSCLE</h1>
                  <p className="build-para">
                    Protein builds muscle and bone,
                    <br />
                    supporting agility and resilience.
                    <br />
                    It’s essential for vitality and
                    <br />
                    longevity, fueling an active,
                    <br />
                    enduring lifestyle.
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <img
                  src={Weightlift}
                  className="weight-lift"
                  alt="weight-lift"
                />
              </div>
            </div>
            <img
              src={ProteinSlogan}
              className="protein-slogan"
              alt="protein-slogan"
            />
          </div>
        </div>

        {/* <div className="power-container1">
          <div className="power-space">
            <h1 className="power-heading">
              THE POWER <br />
              OF PROTEIN
            </h1>
            <div className="row row-build">
              <div className="col-sm-6 build-text">
                <div className="build-container">
                  <h1 className="build">BUILD MUSCLE</h1>
                  <p className="build-para">
                    Protein builds muscle and bone,<br />
                    supporting agility and resilience.<br />
                    It’s essential for vitality and<br />
                    longevity, fueling an active,<br />
                    enduring lifestyle.
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <img src={Weightlift} className="weight-lift" alt="weight-lift" />
              </div>
            </div>
            <img src={ProteinSlogan} className="protein-slogan" alt="protein-slogan" />
          </div>
        </div> */}

        {/* <div className="power-container2">
          <div className="power-space">
            <h1 className="power-heading">
              THE POWER <br />
              OF PROTEIN
            </h1>
            <div className="row row-build">
              <div className="col-sm-6 build-text">
                <div className="build-container">
                  <h1 className="build">BUILD MUSCLE</h1>
                  <p className="build-para">
                    Protein builds muscle and bone,<br />
                    supporting agility and resilience.<br />
                    It’s essential for vitality and<br />
                    longevity, fueling an active,<br />
                    enduring lifestyle.
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <img src={Weightlift} className="weight-lift" alt="weight-lift" />
              </div>
            </div>
            <img src={ProteinSlogan} className="protein-slogan" alt="protein-slogan" />
          </div>
        </div> */}
      </div>
      {/* Raising the star */}
      <div className="animation-container">
        <div className="text-wrapper">
          <h1 className="raising">RAISING</h1>
          <div className="middle-text">
            <span className="high">HIGH PROTEINS</span>
            <br />
            <span className="low">LOW CALORIES</span>
          </div>
          <h1 className="bar">THE BAR</h1>
        </div>
      </div>

      {/* Comparision Table */}
      <div className="comparison-table">
        <div className="comparison-column labels">
          <div className="label">PROTEIN</div>
          <div className="label">FAT</div>
          <div className="label">CALORIES</div>
          <div className="label">PRICE</div>
        </div>
        <div className="comparison-column highlighted">
          <div className="product">
            <img src={Paneericon} alt="Product 1" />
          </div>
          <div className="value">31G</div>
          <div className="value">5G</div>
          <div className="value">160</div>
          <div className="value">$</div>
        </div>
        <div className="comparison-column">
          <div className="icon">
            <img src={Proteins} alt="Product 2" />
          </div>
          <div className="value">18G</div>
          <div className="value">5G</div>
          <div className="value">160</div>
          <div className="value">₹</div>
        </div>
        <div className="comparison-column">
          <div className="icon">
            <img src={Whey} alt="Product 3" />
          </div>
          <div className="value">31G</div>
          <div className="value">5G</div>
          <div className="value">160</div>
          <div className="value">₹₹</div>
        </div>
        <div className="comparison-column">
          <div className="icon">
            <img src={Energybar} alt="Product 4" />
          </div>
          <div className="value">25G</div>
          <div className="value">5G</div>
          <div className="value">160</div>
          <div className="value">₹₹₹</div>
        </div>
        <div className="comparison-column">
          <div className="icon">
            <img src={Palakpaneer} alt="Product 5" />
          </div>
          <div className="value">37G</div>
          <div className="value">5G</div>
          <div className="value">160</div>
          <div className="value">₹₹₹₹</div>
        </div>
      </div>

      {/* Wholesome Section */}
      <div className="wholesome-container pt-5 pb-5">
        <div className="wholesome-heading">
          <h1 className="protein-packed">Protein-Packed Recipes You’ll Love</h1>
          <h1 className="wholesome-para">
            Wholesome <br />
            Recipes <br />
            for Your
            <br /> Gains
          </h1>
          <img src={Vegbowl} className="veg-bowl" alt="veg-bowl" />
          <img
            src={Recepiesbutton}
            className="recepies-button pt-5"
            alt="recepies-button"
          />
          <img src={Stickers} className="stickers" alt="stickers" />
          <p className="muscle-para">
            Protein builds muscle and
            <br /> bone, supporting agility
            <br /> and resilience.
          </p>
          <img src={Arrowpoint} className="arrow-point" alt="arrow-point" />
        </div>
      </div>
      {/* Proteins Section */}
      <div className="proteins-container pt-5 pb-5">
        <svg
          className="svg-overlay"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            className="overlay-path1"
            vectorEffect="non-scaling-stroke"
            d={paths.start}
          />
        </svg>
        <img src={Protein} className="protein-image" alt="protein-pic" />
        <div className="milk-pic-container">
          <img src={Milk} className="milk-image" alt="milk-pic" />
        </div>
        <div className="signup-container">
          <h1 className="signup-heading">SIGNUP TO OUR NEWSLETTER</h1>
          <div>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="email-placing"
            />
            <button type="button" className="subscribe">
              Subscribe
            </button>
          </div>
        </div>
        <div className="footers-column shop-footers mt-5">
          <ul className="footers-links">
            <li>SHOP</li>
            <li>ABOUT US</li>
            <li>FAQ</li>
            <li>BLOG</li>
            <li>CONTACT</li>
          </ul>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footers">
        <img src={Copyright1} className="copyright-image" alt="copyright-pic" />
      </div>
    </div>
  );
};

export default Home;
