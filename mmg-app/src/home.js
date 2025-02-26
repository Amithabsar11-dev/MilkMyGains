import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import "./home.css";
import "./cards.css";
import MilkMyGain from "./MilkMyGains";
import { Canvas } from "@react-three/fiber";
import Milk from "./assets/Slice-3.svg";
import MilkTM from './assets/Logo-TM.svg'
import MilkBg from "./assets/Vector (1).png";
import MilkBg1 from "./assets/Vector (2).png";
import MilkBg2 from "./assets/Vector (3).png";
import MilkBg3 from "./assets/Vector (4).png";
import OrderButton from "./assets/paneerorder.svg";
import Order2Button from "./assets/milk-button.svg";
import Order4Button from "./assets/icecream-button.svg";
import Weightlift from "./assets/body builder.svg";
import ProteinSlogan from "./assets/protein-slogan.svg";
import Paneericon from "./assets/Panner-icon.svg";
import Proteins from "./assets/meat.svg";
import Whey from "./assets/powder.svg";
import Energybar from "./assets/ricebag.svg";
import Palakpaneer from "./assets/paneercubes.svg";
import Vegbowl from "./assets/vegbowl.svg";
import Stickers from "./assets/Stickers.svg";
import Arrowpoint from "./assets/arrowpoint.svg";
import Copyright1 from "./assets/copyrights-reserved.svg";
import Protein from "./assets/protein.png";
import TransparencyIcon from "./assets/Transparancy-card.svg";
import MythIcon from "./assets/myth-card.svg";
import PossibilitiesIcon from "./assets/unlocking-card.svg";
import TransparencyIconline from "./assets/spring-transparancy.svg";
import MythIconline from "./assets/spring-break.svg";
import PossibilitiesIconline from "./assets/spring-unlock.svg";
import Eyestar from "./assets/eyediamond.svg";
import Signal from "./assets/shopicon.svg";
import Star from "./assets/staricon.svg";
import Eye from "./assets/eyeicon.svg";
import Drop from "./assets/dropicon.svg";
import Sunback from "./assets/Sunback.svg";
import EyesightIcon from "./assets/EyesightIcon.svg";
import SunlookIcon from "./assets/SunlookIcon.svg";
import Activestar from "./assets/active-star.svg";
import Inactivestar from "./assets/inactive-star.svg";
import Lean from "./assets/basketball.svg";
import Yoga from "./assets/yoga.svg";
import Orderbuttons from './assets/order-now-svg.svg'
import Milkblur from './assets/milk-blur.png'
import Yogartblur from './assets/yogart-blur.png'
import Icecreamblur from './assets/icecream-blur.png';
import Raisingfooter1 from './assets/raising-footer-icon-1.svg';
import Raisingfooter2 from './assets/raising-footer-icon-2.svg';
import Sample from './sample';
import Lottie from "lottie-react";
import paneerAnimation from "./assets/lottie/data-1.json";
import Copyrightline from './assets/Line 23.svg';

/* Pure Protein Section */
import ProteinCap from "./assets/protein-cap.svg";
import './text-anim.css';

/* Word Animation Section */
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const Home = ({ setIsLoaded, isLoaded }) => {
  const [currentModel, setCurrentModel] = useState("/mmg1.glb");
  const [isNext, setIsNext] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const [activeButton, setActiveButton] = useState("paneer");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [step, setStep] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(1);
  const [nextModel, setNextModel] = useState(null);
  const [isScalingUp, setIsScalingUp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const handlePaneerClick = () =>
    handleModelChange("/mmg1.glb", false);
  const handleMilkClick = () => handleModelChange("/packet_1.glb", true);
  const [scrollDirection, setScrollDirection] = useState(0);
  const homeWrapperRef = useRef(null);
  const mmgModelRef = useRef();
  const homeContainerRef = useRef();

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
        ? Milkblur
        : button === "milk"
          ? Milkblur
          : button === "yogart"
            ? Yogartblur
            : Icecreamblur;
    }
  };

  const path = {
    start: "M 0 100 V 100 Q 50 100 100 100 V 100 Z", // Flat path at the bottom
    curve1: "M 0 100 V 98 Q 50 90 100 98 V 100 Z", // Slight curve (subtle bulge)
    curve2: "M 0 100 V 95 Q 50 80 100 95 V 100 Z", // Even more subtle curve
  };

  // const path = {
  //   start: "M0,100 L100,100", // Initial flat path
  //   curve1: "M0,100 C30,90 70,90 100,100", // First smooth curve
  //   curve2: "M0,100 C50,80 50,80 100,100", // More pronounced bend
  // };


  // useEffect(() => {
  //   if (!setIsLoaded) return;
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: ".slider-container",
  //         start: "bottom bottom",
  //         end: "bottom+=200 bottom", // Increase the scroll range for a smoother transition
  //         scrub: 2, // Slightly increase scrub value for fluid motion
  //         scroller: ".home-wrapper",
  //       },
  //     })
  //     .to(".overlay-path", { attr: { d: path.curve1 }, duration: 1.5, ease: "power2.out" }) // Easing added
  //     .to(".overlay-path", { attr: { d: path.curve2 }, duration: 1.5, ease: "power2.out" }); // Easing added
  // }, [setIsLoaded]);

  // useEffect(() => {
  //   if (!setIsLoaded) return;
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: ".proteins-container",
  //         start: "top bottom",
  //         end: "bottom top",
  //         scrub: 2,
  //         scroller: ".home-wrapper",
  //       },
  //     })
  //     .to(".overlay-path1", { attr: { d: path.curve1 }, duration: 1.5, ease: "power2.out" })
  //     .to(".overlay-path1", { attr: { d: path.curve2 }, duration: 1.5, ease: "power2.out" });
  // }, [setIsLoaded]);


  // const path = {
  //   start: "M 0 0 V 0 Q 50 0 100 0 V 0 Z", // Flat at the top
  //   curve1: "M 0 0 V 10 Q 50 20 100 10 V 0 Z", // Smaller curve
  //   curve2: "M 0 0 V 20 Q 50 40 100 20 V 0 Z", // Larger curve, bends more in the middle
  // };



  const handleModelChange = (modelPath, next = true) => {
    if (currentModel !== modelPath && !isTransitioning) {
      setIsTransitioning(true);
      setIsScalingUp(false);
      setIsNext(next); // Set direction for smooth rotation

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentModel(modelPath);
          setTransitionProgress(0); // Ensure new model starts at scale 0

          setTimeout(() => {
            setIsScalingUp(true);
            gsap.to(
              {},
              {
                duration: 1,
                ease: "power2.out",
                onUpdate: function () {
                  setTransitionProgress(this.progress());
                },
                onComplete: () => setIsTransitioning(false),
              }
            );
          }, 100); // Delay ensures new model appears smoothly before old one disappears
        },
      });

      tl.to(
        {},
        {
          duration: 1,
          ease: "power2.inOut",
          onUpdate: function () {
            setTransitionProgress(1 - this.progress());
          },
        }
      );
    }
  };

  useEffect(() => {
    console.log("Current Model Path:", currentModel);
  }, [currentModel]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Fade In Effect 
  useEffect(() => {
    if (isLoaded) {
      gsap.to(mmgModelRef.current, { opacity: 1, duration: 1.5, ease: "power2.out" });
    } else {
      gsap.set(mmgModelRef.current, { opacity: 0 });
    }
  }, [isLoaded]);

  const handleScroll = (e) => {
    if (scrolling) return;
    setScrolling(true);

    const direction = e.deltaY > 0 ? "down" : "up";
    setScrollDirection(direction === "down" ? 1 : -1);

    if (direction === "down") {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    } else {
      window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
    }
    setTimeout(() => {
      setScrolling(false);
      setScrollDirection(0);
    }, 1000);
  };

  //pure protein animation
  useEffect(() => {
    const cap = document.querySelector(".protein-cap");

    gsap.fromTo(
      cap,
      { rotation: 0, x: 0 },
      {
        rotation: 1080,
        duration: 2,
        ease: "power4.out",
        x: 0,
        scrollTrigger: {
          trigger: ".container-pure",
          start: "top 70%",
          end: "bottom 50%",
          scroller: ".home-wrapper",
          toggleActions: "restart none none reset",
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

  const paths = {
    start: "M 0 0 V 0 Q 50 0 100 0 V 0 Z",
    curve1: "M 0 0 V 12 Q 50 30 100 12 V 0 Z",
    curve2: "M 0 0 V 25 Q 50 40 100 25 V 0 Z",
  };

  // Words Animation

  useEffect(() => {
    if (!setIsLoaded) return;
    Splitting();
    const fx1Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect1]"
      ),
    ];
    fx1Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");

      gsap.fromTo(
        chars,
        {
          "will-change": "opacity, transform",
          opacity: 0,
          scale: 0.6,
          rotationZ: () => gsap.utils.random(-20, 20),
        },
        {
          ease: "power4",
          opacity: 1,
          scale: 1,
          rotation: 0,
          stagger: 0.4,
          scrollTrigger: {
            trigger: title,
            scroller: ".home-wrapper",
            start: "center+=20% bottom",
            end: "+=50%",
            scrub: true,
          },
        }
      );
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setIsLoaded]);

  useEffect(() => {
    if (!setIsLoaded) return;
    Splitting();
    const fx18Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect18]"
      ),
    ];
    fx18Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");

      chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));

      gsap.fromTo(
        chars,
        {
          "will-change": "opacity, transform",
          opacity: 0.2,
          z: -800,
        },
        {
          ease: "back.out(1.2)",
          opacity: 1,
          z: 0,
          stagger: 0.04,
          scrollTrigger: {
            trigger: title,
            start: "top 60%",
            end: "top 20%",
            scroller: ".home-wrapper",
            scrub: 2,
          },
        }
      );
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setIsLoaded]);

  //Letters Animation
  useEffect(() => {
    if (!setIsLoaded) return;
    const letters = document.querySelectorAll(".letter-paneer");

    gsap.to(letters, {
      scrollTrigger: {
        trigger: ".container-pure",
        start: "top left",
        end: "bottom top",
        scrub: 1,
        scroller: ".home-wrapper",
      },
      ease: "power1.out",
      motionPath: {
        path: "#customPath",
        align: "#customPath",
        alignOrigin: [0.5, 0.5],
      },
      stagger: 0.01,
    });
  }, [setIsLoaded]);

  useEffect(() => {
    if (!setIsLoaded) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".animation-container",
        start: "top 80%", // Start animation when 80% of the section is in view
        end: "bottom 20%", // End when 20% is still visible
        scrub: 1, // Smooth scrolling effect
        toggleActions: "play none none reverse", // Play forward and reverse on scroll
        scroller: ".home-wrapper",
      },
      onComplete: () => setIsLoaded(true),
    });

    // Step 1: Fade in "RAISING" and "THE BAR"
    tl.fromTo(
      ".raising, .bar-1",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );

    // Step 2: Move "RAISING" left & "THE BAR" right
    tl.to(".raising", { x: "-150px", duration: 1, ease: "power2.out" }, "-=0.5");
    tl.to(".bar-1", { x: "160px", duration: 1, ease: "power2.out" }, "-=1");

    // Step 3: Show "HIGH PROTEINS LOW CALORIES" with zoom effect
    tl.fromTo(
      ".middle-text",
      { opacity: 0, scale: 0.5, fontWeight: 400 },
      {
        opacity: 1,
        scale: 1.1,
        fontWeight: 900,
        duration: 1,
        ease: "power2.out",
      }
    );

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [setIsLoaded]);

  // Footer - background

  //Card Animation
  const circleRef = useRef(null);

  useEffect(() => {
    if (!setIsLoaded) return;
    gsap.to(circleRef.current, {
      rotation: -127, // Adjust rotation range as needed
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

  //Wholesome sticker

  useEffect(() => {
    if (!setIsLoaded) return;
    gsap.to(".stickers", {
      rotation: 10,
      transformOrigin: "center",
      scrollTrigger: {
        trigger: ".wholesome-container",
        start: "top center",
        end: "bottom center",
        scrub: true,
        scroller: ".home-wrapper",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(".veg-bowl", {
      rotation: 20,
      scrollTrigger: {
        trigger: ".wholesome-container",
        start: "top center",
        end: "bottom center",
        scrub: true,
        scroller: ".home-wrapper",
      },
    });

    gsap.to(".wholesome-para", {
      y: "70",
      scrollTrigger: {
        trigger: ".wholesome-container",
        start: "top center",
        end: "bottom center",
        scrub: true,
        scroller: ".home-wrapper",
      },
    });
  }, [setIsLoaded]);


  //home Bg

  useEffect(() => {
    if (!setIsLoaded) return;
    gsap.utils.toArray('.lottie-animation, .milkbg1, .milkbg2, .milkbg3').forEach((element) => {
      gsap.fromTo(
        element,
        { y: 0 },
        {
          y: -200,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            scroller: ".home-wrapper",
            markers: false,
          },
        }
      );
    });
  }, [setIsLoaded]);

  //Words animation

  const textPathRefs = useRef([]);

  useEffect(() => {
    if (!setIsLoaded) return;

    gsap.registerPlugin(ScrollTrigger);

    const mainText = textPathRefs.current[0]; // Main Text
    const duplicateText = textPathRefs.current[1]; // Duplicate for looping

    if (!mainText || !duplicateText) return;

    const textLength = mainText.getComputedTextLength(); // Get text length dynamically

    console.log("Text Length:", textLength); // Debug log

    gsap.set([mainText, duplicateText], { attr: { startOffset: "0%" } });

    const scrollTrigger = ScrollTrigger.create({
      trigger: ".container-pure",
      start: "top top",
      end: "bottom top",
      scrub: true,
      scroller: ".home-wrapper",
      onUpdate: (self) => {
        const progress = self.progress * textLength;
        const offset = (progress % textLength); // Loop effect

        console.log("Start Offset:", offset); // Debug log for movement

        gsap.set(mainText, { attr: { startOffset: `${offset}` } });

        // Shift duplicate to appear as soon as the first starts disappearing
        gsap.set(duplicateText, { attr: { startOffset: `${offset - textLength}px` } });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [setIsLoaded]);

  return (
    <>
      <div className="home-container" ref={homeContainerRef}>
        <div
          className="slider-container text-center"
          style={{ height: "100vh" }}
          onWheel={handleScroll}
        >
          {/* <img src={MilkBg} alt="milk-bg" className="milkbg" />
          <img src={MilkBg1} alt="milk-bg1" className="milkbg1" />
          <img src={MilkBg2} alt="milk-bg2" className="milkbg2" />
          <img src={MilkBg3} alt="milk-bg3" className="milkbg3" /> */}
          <div className="lottie-animation">
            <Lottie id="lottie-anim" animationData={paneerAnimation} loop={true} />
          </div>
          {/* <div className="liquid-container">
            <svg
              className="liquid-circle"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 456.693 403.543"
            >
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="0.188"
                  y1="0.12"
                  x2="0.821"
                  y2="0.902"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stopColor="#fff" />
                  <stop offset="1" stopColor="#fff" />
                </linearGradient>
              </defs>
              <path
                id="Tracé_86"
                data-name="Tracé 86"
                d="M277.4,118.337C360.852,71.222,461.5,76.65,532.573,130.99c58.115,44.432,103.589,127.017,82.247,210.89C588.626,444.824,475.8,494.607,389.168,489.5c-78.527-4.627-130.937-54.085-151.841-73.812-27.112-25.585-75.222-70.986-73.811-134.97,1.063-48.2,29.742-84.784,44.287-103.336A229.741,229.741,0,0,1,277.4,118.337Z"
                transform="translate(-163.486 -86.316)"
                fill="url(#linear-gradient)"
              />
            </svg>
            <div className="liquid-text">
              ORDER <br /> NOW
            </div>
          </div> */}
          <div className="svg-order-button-container">
            <div className="svg-order-button">
              <img src={Orderbuttons} alt="order-button-svg" className="order-button-svg" />
            </div>
            <div className="liquid-text-container">
              <a className="liquid-text" href="/product/milk-my-gains-sample-product">ORDER <br />NOW</a>
            </div>
          </div>

          <div className="order-buttons">
            <img
              src={getButtonImage("paneer")}
              alt="paneer-button"
              className={`paneer-button ${currentModel === "/mmg1.glb" ? "active" : ""
                }`}
              onClick={() =>
                handleModelChange("/mmg1.glb", false)
              } // Prev
            />
            <img
              src={getButtonImage("milk")}
              alt="milk-button"
              className={`milk-button ${currentModel === "/packet_1.glb" ? "active" : ""
                }`}
            // onClick={() => handleModelChange("/packet_1.glb", true)} // Next
            />
            <img
              src={getButtonImage("yogart")}
              alt="order-button"
              className={`yogart-button ${activeButton === "yogart" ? "active" : ""
                }`}
            />
            <img
              src={getButtonImage("icecream")}
              alt="order-button"
              className={`icecream-button ${activeButton === "icecream" ? "active" : ""
                }`}
            />
          </div>
          <div className="mmg-model" ref={mmgModelRef} style={{ opacity: 0 }}>
            <Canvas key={currentModel}>
              <MilkMyGain
                modelPath={currentModel}
                transitionProgress={transitionProgress}
                isScalingUp={isScalingUp}
                setIsScalingUp={setIsScalingUp}
                isTransitioning={isTransitioning}
                scrollDirection={scrollDirection}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
                homeWrapperRef={homeWrapperRef}
              />
            </Canvas>
          </div>
          {/* <div className="lava-position">
            <Milklava />
          </div> */}
          {/* <div className="lava-position">
            <MilkSplash />
          </div> */}
          <svg
            className="svg-overlay-bottom"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              className="overlay-path"
              vectorEffect="non-scaling-stroke"
              d={path.start} // Initial flat path at the bottom
              fill="none"
            />
          </svg>
        </div>
      </div>
      {/* Card Section */}
      <div className="container-paradigm">
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
        {
          isMobile ? (
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
                  <div className="box carding3" style={{ transform: "rotate(294deg) translateX(55vw) rotate(109deg)" }}>
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
                  <div className="box carding1" style={{ transform: "rotate(-19deg) translateX(59vw) rotate(103deg) translateY(18vw)" }}>
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
                  <div className="box carding2" style={{ transform: "rotate(30deg) translateX(44vw) rotate(97deg) translateY(11vw)" }}>
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
                  {/* card- sample */}
                  {/* <div className="box carding1" style={{ transform: "rotate(228deg) translateX(67vw) rotate(90deg)" }}>
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
                  </div> */}
                  {/* card-1 */}
                  <div className="box carding1" style={{ transform: "rotate(228deg) translateX(67vw) rotate(90deg)" }}>
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
                  <div className="box carding2" style={{ transform: "rotate(262deg) translateX(74vw) rotate(98deg) translateY(10vw)" }}>
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
          )
        }
        <div className="know-button-container">
          <button class="know-button">KNOW MORE</button>
        </div>
      </div>
      {/* Pure Protein Zero */}
      <div className="container-pure">
        {/* <svg
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
        </svg> */}
        <div className="row row-pure">
          <div className="col-sm-6">
            <h1 className="crafted-pure">
              crafted with a purpose: it’s
              <br /> high in protein, low in fat,
              <br /> and low in calories—without
              <br /> compromising on taste.
            </h1>
            {/* <img src={Words} alt="words" className=" words" /> */}
            <div className="svg-container">
              <svg width="681" height="543" viewBox="0 -90 720 543" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" id="curve" d="M0.5 174.001C79 -95.4996 332.5 -7.99936 349 155.5C365.5 319 452 337.501 578.5 337.501C705 337.501 692.5 480.334 654 542.501" />
                <text>
                  <textPath ref={(el) => (textPathRefs.current[0] = el)} className="text-path" startOffset="0%" href="#curve">
                    paneer that works as hard as you do paneer that works as hard as you do &nbsp;
                  </textPath>
                  <textPath ref={(el) => (textPathRefs.current[1] = el)} className="text-path duplicate-text" startOffset="100%" href="#curve">
                    paneer that works as hard as you do paneer that works as hard as you do &nbsp;
                  </textPath>
                </text>
              </svg>
            </div>

            {/* <div className="motion-text">
              {[
                "P A N E E R",
                "T H A T",
                "W O R K S",
                "A S",
                "H A R D",
                "A S",
                "Y O U",
                "D O",
              ].map((word, index) => (
                <span className="word-paneer" key={index}>
                  {word.split("").map((char, i) => (
                    <span className="letter-paneer" key={i}>
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div> */}

            {/* <svg id="motionPath" width="250" height="300" viewBox="0 0 200 300">
              <g transform="scale(-1, 1) translate(-500, 0)">
                <path
                  id="customPath"
                  fill="none"
                  stroke="transparent"
                  strokeWidth="2"
                  d="M20,300 C50,200 150,100 250,200 S400,300 500,100"
                />
              </g>
            </svg> */}
          </div>
          <div className="col-sm-6">
            <img src={ProteinCap} alt="protein-cap" className="protein-cap" />
            {
              isMobile ? (
                <div class="content-protein">
                  <h1
                    className="pure-heading"
                  >
                    PURE
                    <br /> PROTEIN.
                    <br /> ZERO
                    <br /> COMPRO-
                    <br />
                    MISE.
                  </h1>
                </div>
              ) : (
                <div class="content">
                  <h1
                    className="pure-heading content__title"
                    data-splitting
                    data-effect18
                  >
                    PURE
                    <br /> PROTEIN.
                    <br /> ZERO
                    <br /> COMPRO-
                    <br />
                    MISE.
                  </h1>
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* Power Of Protein*/}
      <div className="power-wrapper">
        <div className="power-container bg-white">
          <h1 className="power-space-heading">THE POWER OF<br /> PROTEIN</h1>
          <div className="power-space-width">
            <div className="power-space">
              <div className="row row-build">
                <div className="col-sm-6 build-text">
                  {
                    isMobile ? (
                      <div className="content-power">
                        <h1
                          className="power-heading"
                        >
                          BUILD
                          MUSCLE
                        </h1>
                      </div>
                    ) : (
                      <div className="content">
                        <h1
                          className="power-heading content__title content__title--small"
                          data-splitting
                          data-effect1
                        >
                          BUILD MUSCLE
                        </h1>
                      </div>
                    )
                  }
                  <div className="build-container">
                    {/* <div className="star-container">
                    <img src={Starbuild} className="star-build" />
                    <h1 className="build">BUILD MUSCLE</h1>
                  </div> */}
                    <p className="build-para">
                      Protein builds muscle <br />
                      and bone, supporting <br />
                      agility and resilience. <br />
                      It’s essential for <br />
                      vitality and longevity,
                      <br />
                      fueling an active,
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
            </div>
          </div>
        </div>

        <div className="power-container1">
          <div className="power-space-width">
            <div className="power-space1">
              <div className="row row-build">
                <div className="col-sm-6 build-text">
                  {
                    isMobile ? (
                      <div className="content-power">
                        <h1
                          className="power-heading"
                        >
                          STAY LEAN
                        </h1>
                      </div>
                    ) : (
                      <div className="content">
                        <h1
                          className="power-heading content__title content__title--small"
                          data-splitting
                          data-effect1
                        >
                          STAY LEAN
                        </h1>
                      </div>
                    )
                  }
                  <div className="build-container build-para-align">
                    {/* <div className="star-container">
                    <img src={Starbuild} className="star-build" />
                    <h1 className="build">STAY LEAN</h1>
                  </div> */}
                    <p className="build-para">
                      Protein aids fat loss by increasing
                      fullness and boosting metabolism. It
                      requires more energy to digest than carbs
                      or fats, making it doubly effective for
                      fat loss. The most satiating
                      macronutrient that supports a lean and
                      healthier body composition.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <img
                    src={Lean}
                    className="weight-lift1"
                    alt="weight-lift"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="power-container2">
          <div className="power-space-width">
            <div className="power-space2">
              <div className="row row-build">
                <div className="col-sm-6 build-text">
                  {
                    isMobile ? (
                      <div className="content-power">
                        <h1
                          className="power-heading"
                        >ENHANCE BEAUTY
                        </h1>
                      </div>
                    ) : (
                      <div className="content">
                        <h1
                          className="power-heading content__title content__title--small"
                          data-splitting
                          data-effect1
                        >
                          ENHANCE BEAUTY
                        </h1>
                      </div>
                    )
                  }
                  <div className="build-container build-para-align">
                    {/* <div className="star-container">
                    <img src={Starbuild} className="star-build" />
                    <h1 className="build">ENHANCE BEAUTY</h1>
                  </div> */}
                    <p className="build-para">
                      A high-protein diet nourishes skin,
                      strengthens nails, and promotes vibrant
                     hair, enhancing beauty from within and
                       contributing to a radiant, healthy
                      appearance.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <img
                    src={Yoga}
                    className="weight-lift3"
                    alt="weight-lift"
                  />
                </div>
              </div>
              <div className="build-para-container">
                <img
                  src={ProteinSlogan}
                  className="protein-slogan"
                  alt="protein-slogan"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raising the star */}
      {
        isMobile ? (
          <div className="animations-container">
            <div className="texting-wrapper-1">
              <h1 className="raising-1">RAISING</h1>
              <div className="middle-texting">
                <span className="high-proteins-1">HIGH PROTEINS</span>
                <br />
                <span className="low-proteins-1">LOW CALORIES</span>
              </div>
              <h1 className="bar-proteins-1">THE BAR</h1>
            </div>
          </div>
        ) : (
          <div className="animation-container">
            <div className="text-wrapper">
              <h1 className="raising">RAISING</h1>
              <div className="middle-text">
                <span className="high">HIGH PROTEIN</span>
                <br />
                <span className="low">LOW CALORIES</span>
              </div>
              <h1 className="bar-1">THE BAR</h1>
            </div>
          </div>
        )
      }
      {/* Comparision Table */}
      <Sample />

      {/* Table Icon */}
      <div className="table-icons">
        <img src={Raisingfooter1} className="raising-footer-1" alt="raising-footer" />
        <img src={Raisingfooter2} className="raising-footer-2" alt="raising-footer" />
        <img src={Raisingfooter2} className="raising-footer-2" alt="raising-footer" />
        <img src={Raisingfooter2} className="raising-footer-2" alt="raising-footer" />
      </div>

      {/* <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>
                <div className="empty-space"></div>
              </th>
              <th><img src={Paneericon} alt="Paneer" /></th>
              <th><img src={Palakpaneer} alt="Palak Paneer" /></th>
              <th><img src={Proteins} alt="Proteins" /></th>
              <th><img src={Energybar} alt="Energy Bar" /></th>
              <th><img src={Whey} alt="Whey" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PROTEIN</td>
              <td>31G</td>
              <td>18G</td>
              <td>31G</td>
              <td>25G</td>
              <td>37G</td>
            </tr>
            <tr>
              <td>FAT</td>
              <td>5G</td>
              <td>5G</td>
              <td>5G</td>
              <td>5G</td>
              <td>5G</td>
            </tr>
            <tr>
              <td>CALORIES</td>
              <td>160</td>
              <td>160</td>
              <td>160</td>
              <td>160</td>
              <td>160</td>
            </tr>
            <tr>
              <td>PRICE</td>
              <td>$</td>
              <td>₹</td>
              <td>₹₹</td>
              <td>₹₹₹</td>
              <td>₹₹₹₹</td>
            </tr>
          </tbody>
        </table>
      </div> */}


      {/* Wholesome Section */}
      <div className="wholesome-container pb-5">
        <div className="wholesome-heading">
          <h1 className="protein-packed">Protein-Packed Recipes You’ll Love</h1>
          <div>
            <h1 className="wholesome-para">
              Wholesome <br />
              Recipes <br />
              for Your <br /> Gains
            </h1>
          </div>
          <img src={Vegbowl} className="veg-bowl" alt="veg-bowl" />
          <div className="subscribe-container">
            <button className="Subscribe-button1">
              More Recipes On The Blog
            </button>
          </div>
          <img src={Stickers} className="stickers" alt="stickers" />
          <p className="muscle-para">
            Protein builds muscle and <br /> bone, supporting agility <br /> and
            resilience.
          </p>
          <img src={Arrowpoint} className="arrow-point" alt="arrow-point" />
        </div>
      </div>

      {/* Proteins Section */}
      <div className="proteins-container-1 pt-5 pb-5">
        {/* <svg
          className="svg-overlay"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            className="overlay-path1"
            vectorEffect="non-scaling-stroke"
            d={path.start}
          />
        </svg> */}
        <div className="milk-pic-container">
          <img src={Protein} className="protein-image" alt="protein-pic" />
        </div>
        <div className="milk-pic-container">
          <img src={MilkTM} className="milk-image" alt="milk-pic" />
        </div>
        <div className="signup-container">
          <h1 className="signup-heading">SIGNUP TO OUR NEWSLETTER</h1>
          <div>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="email-placing"
            />
            <button class="Subscribe-button">Subscribe</button>
          </div>
        </div>
        <div className="footers-column shop-footers mt-5">
          <div className="footer-column-links">
            <ul className="footers-links">
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/product/milk-my-gains-sample-product"
                >SHOP</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/about"
                >ABOUT US</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/faq"
                >FAQ</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/contact"
                >CONTACT</a></li>
            </ul>
            <ul className="footer-links-1">
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/shipping"
                >SHIPPING</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/refund"
                >REFUND & RETURNS</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/terms"
                >TERMS & CONDITIONS</a></li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/privacy"
                >PRIVACY POLICY</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footers mb-3">
        <p className="copyright-text">Copyright © 2025. All rights reserved</p>
      </div>
    </>
  );
};

export default Home;
