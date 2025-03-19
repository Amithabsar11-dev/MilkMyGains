import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import "./home.css";
import "./cards.css";
import { Link } from "react-router-dom";
import MilkMyGain from "./MilkMyGains";
import { Canvas } from "@react-three/fiber";
import MilkTM from "./assets/Logo-TM-1.svg";
import MMGimage from "./assets/MMG-image.svg";
import OrderButton from "./assets/paneerorder.svg";
import Order2Button from "./assets/milk-button.svg";
import Order4Button from "./assets/icecream-button.svg";
import ProteinSlogan from "./assets/protein-slogan.svg";
import Vegbowl from "./assets/vegbowl.svg";
import Stickers from "./assets/Stickers.svg";
import Arrowpoint from "./assets/arrowpoint.svg";
import TransparencyIcon from "./assets/Transparancy-card.svg";
import MythIcon from "./assets/myth-card.svg";
import PossibilitiesIcon from "./assets/unlocking-card.svg";
import TransparencyIconline from "./assets/spring-transparancy.svg";
import MythIconline from "./assets/spring-break.svg";
import PossibilitiesIconline from "./assets/spring-unlock.svg";
import Sunback from "./assets/Sunback.svg";
import EyesightIcon from "./assets/EyesightIcon.svg";
import SunlookIcon from "./assets/SunlookIcon.svg";
import Orderbuttons from "./assets/order-now-svg.svg";
import Milkblur from "./assets/milk-1.svg";
import Yogartblur from "./assets/yoghurt.svg";
import Icecreamblur from "./assets/ice-cream (3).svg";
import Raisingfooter1 from "./assets/raising-footer-icon-1.svg";
import Raisingfooter2 from "./assets/raising-footer-icon-2.svg";
import Sample from "./sample";
import Lottie from "lottie-react";
import paneerAnimation from "./assets/lottie/data-1.json";
import "./cards.css";
import Footeranimation from "./assets/Home-footer.gif";
import Weightliftanimation from "./assets/Weight-lift.gif";
import Yogaanimation from "./assets/Yoga.gif";
import Basketballanimation from "./assets/BasketBall.gif";
import LeftArrowIcon from "./assets/CaretCircleRight-1.svg"; // Your left arrow SVG
import RightArrowIcon from "./assets/CaretCircleRight.svg";
import Instagramheader from "./assets/instagram-header.svg";
import LinkedInheader from "./assets/linked-in-icon.svg";
import Facebookheader from "./assets/facebook-header.svg";
import { useNavigate } from "react-router-dom";

/* Pure Protein Section */
import ProteinCap from "./assets/protein-cap.svg";
import "./text-anim.css";

/* Word Animation Section */
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const Home = ({ setIsLoaded, isLoaded }) => {
  const [currentModel, setCurrentModel] = useState("/mmg1.glb");
  const navigate = useNavigate();
  const [isNext, setIsNext] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const [viewBox, setViewBox] = useState("0 -90 720 543");
  const [activeButton, setActiveButton] = useState("paneer");
  const [isMobile, setIsMobile] = useState(false);
  const [step, setStep] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(1);
  const [nextModel, setNextModel] = useState(null);
  const [isScalingUp, setIsScalingUp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // const handlePaneerClick = () => handleModelChange("/mmg1.glb", false);
  // const handleMilkClick = () => handleModelChange("/packet_1.glb", true);
  const [scrollDirection, setScrollDirection] = useState(0);
  const homeWrapperRef = useRef(null);
  const mmgModelRef = useRef();
  const mobileCardsRef = useRef(null);
  const mobileCardsContainerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const homeContainerRef = useRef();
  const animationRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" }); // Force top scroll after navigation
    }, 50); // Small delay to ensure the page has rendered
  }, []);

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

  useEffect(() => {
    const updateViewBox = () => {
      const width = window.innerWidth;

      if (width >= 1700 && width <= 2200) {
        setViewBox("0 -90 910 543");
      } else if (width < 768) {
        setViewBox("40 -60 910 543");
      } else {
        setViewBox("0 -90 720 543");
      }
    };

    updateViewBox(); // Set initial value
    window.addEventListener("resize", updateViewBox);
    return () => window.removeEventListener("resize", updateViewBox);
  }, []);

  useEffect(() => {
    if (isLoaded) return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded]);

  useEffect(() => {
    if (mobileCardsContainerRef.current) {
      const firstCard =
        mobileCardsContainerRef.current.querySelector(".mobile-carding1");
      if (firstCard) {
        setCardWidth(firstCard.offsetWidth + 70); // Card width + gap
      }
    }
  }, []);

  const scrollToCard = (index) => {
    if (mobileCardsContainerRef.current) {
      const scrollAmount = index * cardWidth;
      mobileCardsContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < 4) {
      // Assuming 6 cards (adjust if needed)
      scrollToCard(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    }
  };

  //Fade In Effect
  useEffect(() => {
    if (isLoaded) {
      gsap.to(mmgModelRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      });
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

  // Pure protein animation
  useEffect(() => {
    const cap = document.querySelector(".protein-cap");

    const animation = gsap.fromTo(
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

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill(); // Cleanup ScrollTrigger
      }
    };
  }, []);

  // Overlay path animation
  useEffect(() => {
    if (!setIsLoaded) return;

    const timeline = gsap
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

    return () => {
      timeline.scrollTrigger.kill(); // Cleanup ScrollTrigger
    };
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

      const animation = gsap.fromTo(
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

      return () => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill(); // Cleanup ScrollTrigger
        }
      };
    });
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

      const animation = gsap.fromTo(
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

      return () => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill(); // Cleanup ScrollTrigger
        }
      };
    });
  }, [setIsLoaded]);

  // useEffect(() => {
  //   if (!setIsLoaded) return;

  //   let ctx = gsap.context(() => {
  //     const highProtein = document.querySelector(".high-proteins-1");
  //     const lowCalories = document.querySelector(".low-proteins-1");

  //     gsap.fromTo(
  //       highProtein,
  //       { x: -100, opacity: 0 },
  //       {
  //         x: 0,
  //         opacity: 1,
  //         duration: 1.2,
  //         ease: "power4.out",
  //         scrollTrigger: {
  //           trigger: ".middle-texting",
  //           start: "top 80%", // Adjusted for better timing
  //           end: "top 50%",
  //           scroller: ".home-wrapper",
  //           toggleActions: "play none none reverse",
  //         },
  //       }
  //     );

  //     gsap.fromTo(
  //       lowCalories,
  //       { x: 100, opacity: 0 },
  //       {
  //         x: 0,
  //         opacity: 1,
  //         duration: 1.2,
  //         ease: "power4.out",
  //         scrollTrigger: {
  //           trigger: ".middle-texting",
  //           start: "top 80%",
  //           end: "top 50%",
  //           scroller: ".home-wrapper",
  //           toggleActions: "play none none reverse",
  //         },
  //       }
  //     );
  //   });

  //   return () => ctx.revert(); // Cleanup on unmount
  //   return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  // }, [setIsLoaded]);

  useEffect(() => {
    if (!setIsLoaded) return;

    const isMobile = window.innerWidth < 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".animation-container",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        toggleActions: "play none none reverse",
        scroller: ".home-wrapper",
      },
      onComplete: () => setIsLoaded(true),
    });

    if (isMobile) {
      // Keep "RAISING" and "THE BAR" in the same line
      gsap.set(".raising, .bar-1", { x: 0, opacity: 1 });

      // Move "HIGH PROTEIN" from left to center
      tl.fromTo(
        ".high",
        { x: "-150%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      // Move "LOW CALORIES" from right to center
      tl.fromTo(
        ".low",
        { x: "150%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1.5, ease: "power2.out" },
        "-=1.2" // Overlapping animation for smooth effect
      );
    } else {
      // Existing Desktop Animation
      tl.fromTo(
        ".raising, .bar-1",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );

      tl.to(
        ".raising",
        { x: "-150px", duration: 1, ease: "power2.out" },
        "-=0.5"
      );
      tl.to(".bar-1", { x: "160px", duration: 1, ease: "power2.out" }, "-=1");

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
    }

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [setIsLoaded]);

  // Footer - background

  // Card Animation
  const circleRef = useRef(null);

  useEffect(() => {
    if (!setIsLoaded) return;
    const animation = gsap.to(circleRef.current, {
      rotation: -170, // Adjust rotation range as needed
      ease: "none",
      scrollTrigger: {
        trigger: ".parent",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        scroller: ".home-wrapper",
      },
    });

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill(); // Cleanup ScrollTrigger
      }
    };
  }, [setIsLoaded]);

  // Wholesome sticker
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

    gsap.fromTo(
      ".veg-bowl",
      { x: "100vw", rotation: 0 },
      {
        x: 0,
        rotation: -300,
        scrollTrigger: {
          trigger: ".wholesome-container",
          start: "top 90%",
          end: "bottom center",
          scrub: true,
          scroller: ".home-wrapper",
        },
      }
    );

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

  // Home Background
  useEffect(() => {
    if (!setIsLoaded) return;
    gsap.utils
      .toArray(".lottie-animation, .milkbg1, .milkbg2, .milkbg3")
      .forEach((element) => {
        gsap.fromTo(
          element,
          { y: 0 },
          {
            y: -200,
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              scroller: ".home-wrapper",
              markers: false,
            },
          }
        );
      });
  }, [setIsLoaded]);

  // Words animation
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
        const offset = progress % textLength; // Loop effect

        console.log("Start Offset:", offset); // Debug log for movement

        gsap.set(mainText, { attr: { startOffset: `${offset}` } });

        // Shift duplicate to appear as soon as the first starts disappearing
        gsap.set(duplicateText, {
          attr: { startOffset: `${offset - textLength}px` },
        });
      },
    });

    return () => {
      scrollTrigger.kill(); // Cleanup ScrollTrigger
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
          <div className="lottie-animation">
            <Lottie
              id="lottie-anim"
              animationData={paneerAnimation}
              loop={true}
            />
          </div>
          <div className="svg-order-button-container">
            <div className="svg-order-button">
              <img
                src={Orderbuttons}
                alt="order-button-svg"
                className="order-button-svg"
              />
            </div>
            <div className="liquid-text-container">
              <a
                className="liquid-text"
                href="/product/milk-my-gains-sample-product"
              >
                ORDER <br />
                NOW
              </a>
            </div>
          </div>

          <div className="order-buttons">
            <Link to="/product/milk-my-gains-sample-product">
              <img
                src={MMGimage}
                className="paneer-button-active"
                alt="Milk My Gains Sample"
              />
            </Link>
            <div className="button-soon">
              <img
                src={getButtonImage("milk")}
                alt="milk-button"
                className={`milk-button ${
                  currentModel === "/packet_1.glb" ? "active" : ""
                }`}
              />
              <h3 className="coming-soon">
                coming <br />
                soon
              </h3>
            </div>
            <div className="button-soon">
              <img
                src={getButtonImage("yogart")}
                alt="order-button"
                className={`yogart-button ${
                  activeButton === "yogart" ? "active" : ""
                }`}
              />
              <h3 className="coming-soon">
                coming <br />
                soon
              </h3>
            </div>
            <div className="button-soon">
              <img
                src={getButtonImage("icecream")}
                alt="order-button"
                className={`icecream-button ${
                  activeButton === "icecream" ? "active" : ""
                }`}
              />
              <h3 className="coming-soon">
                coming <br />
                soon
              </h3>
            </div>
          </div>
          <div className="mmg-model" ref={mmgModelRef} style={{ opacity: 0 }}>
            <Canvas key={currentModel} gl={{ antialias: true }} dpr={[1, 2]}>
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
        <div className="paradigm-heading">
          <h1 className="main-heading">
            <span>CHANGING</span>
            <span> THE</span> <br />
            <span>PARADIGM</span>
          </h1>
        </div>
        <div className="paradigm-para">
          {window.innerWidth < 768 ? (
            <p className="main-para">
              Healthy Living should be effortless - and delicious. Our protein
              packed solutions deliver on taste and convenience for every
              lifestyle.
            </p>
          ) : (
            <p className="main-para">
              Healthy Living should be effortless - and delicious.
              <br />
              Our protein packed solutions deliver
              <br /> on taste and convenience for every lifestyle.
            </p>
          )}
        </div>
        {window.innerWidth < 768 ? (
          <div className="carousel-container">
            <button
              className="arrow left"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <img src={LeftArrowIcon} alt="Previous" />
            </button>
            <div
              className="mobile-cards-container"
              ref={mobileCardsContainerRef}
            >
              <div className="mobile-cards" ref={mobileCardsRef}>
                <div className="mobile-carding2">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border">
                        <img
                          src={MythIcon}
                          alt="Protein Myth"
                          className="carding-icon"
                        />
                        <p className="carding-text">
                          BREAKING THE
                          <br /> PROTEIN MYTH
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          Breaking the
                          <br /> Protein Myth
                        </h1>
                        <p className="backing-text">
                          We’re challenging the belief that dairy can’t be high
                          in protein and low in calories. MilkMyGains transforms
                          dairy into a nutritional powerhouse, proving that
                          high-quality protein doesn’t have to come with excess
                          fat.
                        </p>
                        <img
                          src={MythIcon}
                          alt="Protein Myth"
                          className="carding-icon-image"
                        />
                        <img
                          src={MythIconline}
                          alt="New Possibilities"
                          className="carding-icon-line2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobile-carding3">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border">
                        <img
                          src={PossibilitiesIcon}
                          alt="New Possibilities"
                          className="carding-icon1"
                        />
                        <p className="carding-text">
                          UNLOCKING NEW <br /> POSSIBILITIES
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          Unlocking new
                          <br /> possibilities
                        </h1>
                        <p className="backing-text">
                          By pushing the boundaries of dairy science, we’ve
                          crafted products with exceptional protein levels that
                          were once thought impossible. We’re redefining what’s
                          achievable using only natural ingredients.
                        </p>
                        <img
                          src={PossibilitiesIcon}
                          alt="New Possibilities"
                          className="carding-icon-image"
                        />
                        <img
                          src={PossibilitiesIconline}
                          alt="New Possibilities"
                          className="carding-icon-line3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobile-carding2">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border">
                        <img
                          src={EyesightIcon}
                          alt="Protein Myth"
                          className="carding-icon-6"
                        />
                        <p className="carding-text-4">
                          Tracebility you <br />
                          can trust{" "}
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          Tracebility you <br />
                          can trust{" "}
                        </h1>
                        <p className="backing-text">
                          We believe you have the
                          <br /> right to know where your <br />
                          food comes from. Our <br /> transparent supply chain
                          lets you trace each <br />
                          product from farm to
                          <br /> table, providing peace of
                          <br /> mind with every bite.
                        </p>
                        <img
                          src={MythIcon}
                          alt="Protein Myth"
                          className="carding-icon-image"
                        />
                        <img
                          src={MythIconline}
                          alt="New Possibilities"
                          className="carding-icon-line2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobile-carding2">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border">
                        <img
                          src={SunlookIcon}
                          alt="Protein Myth"
                          className="carding-icon-5"
                        />
                        <p className="carding-text">
                          QUALITY BEGINS
                          <br /> AT SOURCE
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          QUALITY BEGINS
                          <br />
                          AT SOURCE
                        </h1>
                        <p className="backing-text">
                          Excellence is our standard <br />
                          from start to finish. We
                          <br /> source only the finest raw
                          <br /> materials to ensure that
                          <br /> every MilkMyGains product
                          <br /> offers superior nutrition and
                          <br /> taste.
                        </p>
                        <img
                          src={Sunback}
                          alt="Protein Myth"
                          className="carding-icon-image"
                        />
                        <img
                          src={TransparencyIconline}
                          alt="New Possibilities"
                          className="carding-icon-line5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobile-carding1">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border">
                        <img
                          src={TransparencyIcon}
                          alt="Transparency"
                          className="carding-icon"
                        />
                        <p className="carding-text">
                          TRANSPARENCY <br /> IN EVERY DROP
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          Transparency
                          <br /> in every drop
                        </h1>
                        <p className="backing-text">
                          No secrets, no surprises. We’re upfront about every
                          ingredient and every process, empowering you to make
                          informed choices about your nutrition.
                        </p>
                        <img
                          src={TransparencyIcon}
                          alt="Transparency"
                          className="carding-icon-image"
                        />
                        <img
                          src={TransparencyIconline}
                          alt="New Possibilities"
                          className="carding-icon-line1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="arrow right"
              onClick={handleNext}
              disabled={currentIndex === 5}
            >
              <img src={RightArrowIcon} alt="Next" />
            </button>
          </div>
        ) : (
          <div className="parent">
            <div className="circle-container">
              <div className="circle" ref={circleRef}>
                {/* card-3 */}
                <div className="box carding3">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border">
                        <img
                          src={PossibilitiesIcon}
                          alt="New Possibilities"
                          className="carding-icon1"
                        />
                        <p className="carding-text">
                          UNLOCKING NEW <br /> POSSIBILITIES
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          Unlocking new
                          <br /> possibilities
                        </h1>
                        <p className="backing-text">
                          By pushing the boundaries of dairy science, we’ve
                          crafted products with exceptional protein levels that
                          were once thought impossible. We’re redefining what’s
                          achievable using only natural ingredients.
                        </p>
                        <img
                          src={PossibilitiesIcon}
                          alt="New Possibilities"
                          className="carding-icon-image"
                        />
                        <img
                          src={PossibilitiesIconline}
                          alt="New Possibilities"
                          className="carding-icon-line3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* card-4 */}
                <div className="box carding4">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border-4">
                        <img
                          src={EyesightIcon}
                          alt="EyeCard"
                          className="carding-icon-4"
                        />
                        <p className="carding-text-4">
                          Tracebility you <br />
                          can trust{" "}
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          Tracebility you <br />
                          can trust{" "}
                        </h1>
                        <p className="backing-text">
                          We believe you have the
                          <br /> right to know where your <br />
                          food comes from. Our <br /> transparent supply chain
                          lets you trace each <br />
                          product from farm to
                          <br /> table, providing peace of
                          <br /> mind with every bite.
                        </p>
                        <img
                          src={MythIcon}
                          alt="EyeCard"
                          className="carding-icon-image"
                        />
                        <img
                          src={MythIconline}
                          alt="eyecard-line"
                          className="carding-icon-line6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* card-5 */}
                <div className="box carding5">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border-4">
                        <img
                          src={SunlookIcon}
                          alt="Protein Myth"
                          className="carding-icon-4"
                        />
                        <p className="carding-text-4">
                          QUALITY BEGINS
                          <br /> AT SOURCE
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          QUALITY BEGINS
                          <br />
                          AT SOURCE
                        </h1>
                        <p className="backing-text">
                          Excellence is our standard <br />
                          from start to finish. We
                          <br /> source only the finest raw
                          <br /> materials to ensure that
                          <br /> every MilkMyGains product
                          <br /> offers superior nutrition and
                          <br /> taste.
                        </p>
                        <img
                          src={Sunback}
                          alt="Protein Myth"
                          className="carding-icon-image"
                        />
                        <img
                          src={TransparencyIconline}
                          alt="New Possibilities"
                          className="carding-icon-line5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* card-6 */}
                <div className="box carding6">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border">
                        <img
                          src={TransparencyIcon}
                          alt="Transparency"
                          className="carding-icon"
                        />
                        <p className="carding-text">
                          TRANSPARENCY <br /> IN EVERY DROP
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          Transparency
                          <br /> in every drop
                        </h1>
                        <p className="backing-text">
                          No secrets, no surprises. We’re upfront about every
                          ingredient and every process, empowering you to make
                          informed choices about your nutrition.
                        </p>
                        <img
                          src={TransparencyIcon}
                          alt="Transparency"
                          className="carding-icon-image"
                        />
                        <img
                          src={TransparencyIconline}
                          alt="New Possibilities"
                          className="carding-icon-line1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* card-7 */}
                <div className="box carding7">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border">
                        <img
                          src={MythIcon}
                          alt="Protein Myth"
                          className="carding-icon"
                        />
                        <p className="carding-text">
                          BREAKING THE
                          <br /> PROTEIN MYTH
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          Breaking the
                          <br /> Protein Myth
                        </h1>
                        <p className="backing-text">
                          We’re challenging the belief that dairy can’t be high
                          in protein and low in calories. MilkMyGains transforms
                          dairy into a nutritional powerhouse, proving that
                          high-quality protein doesn’t have to come with excess
                          fat.
                        </p>
                        <img
                          src={MythIcon}
                          alt="Protein Myth"
                          className="carding-icon-image"
                        />
                        <img
                          src={MythIconline}
                          alt="New Possibilities"
                          className="carding-icon-line2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* card-1 */}
                <div className="box carding1">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border">
                        <img
                          src={TransparencyIcon}
                          alt="Transparency"
                          className="carding-icon"
                        />
                        <p className="carding-text">
                          TRANSPARENCY <br /> IN EVERY DROP
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          Transparency
                          <br /> in every drop
                        </h1>
                        <p className="backing-text">
                          No secrets, no surprises. We’re upfront about every
                          ingredient and every process, empowering you to make
                          informed choices about your nutrition.
                        </p>
                        <img
                          src={TransparencyIcon}
                          alt="Transparency"
                          className="carding-icon-image"
                        />
                        <img
                          src={TransparencyIconline}
                          alt="New Possibilities"
                          className="carding-icon-line1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* card-2 */}
                <div className="box carding2">
                  <div className="carding-inner">
                    <div className="carding-front">
                      <div className="carding-border">
                        <img
                          src={MythIcon}
                          alt="Protein Myth"
                          className="carding-icon"
                        />
                        <p className="carding-text">
                          BREAKING THE
                          <br /> PROTEIN MYTH
                        </p>
                      </div>
                    </div>
                    <div className="carding-back">
                      <div className="carding-border1">
                        <h1 className="backing-heading">
                          Breaking the
                          <br /> Protein Myth
                        </h1>
                        <p className="backing-text">
                          We’re challenging the belief that dairy can’t be high
                          in protein and low in calories. MilkMyGains transforms
                          dairy into a nutritional powerhouse, proving that
                          high-quality protein doesn’t have to come with excess
                          fat.
                        </p>
                        <img
                          src={MythIcon}
                          alt="Protein Myth"
                          className="carding-icon-image"
                        />
                        <img
                          src={MythIconline}
                          alt="New Possibilities"
                          className="carding-icon-line2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="know-button-container">
          <button href="/about" className="know-button">
            <a className="know-text" href="/about">
              Know more
            </a>
          </button>
        </div>
      </div>
      {/* Pure Protein Zero */}
      <div className="container-pure">
        <div className="row row-pure">
          <div className="col-sm-6">
            {window.innerWidth < 768 ? (
              <h1 className="crafted-pure">
                crafted with a purpose: Our products are high in protein, low in
                fat, and low in calories—without compromising on taste.
              </h1>
            ) : (
              <h1 className="crafted-pure">
                crafted with a purpose:
                <br />
                Our products are high in protein,
                <br />
                low in fat, and low in calories
                <br />
                without compromising on taste.
              </h1>
            )}
            <div className="svg-container">
              <svg
                width="681"
                height="543"
                viewBox={viewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  id="curve"
                  d="M0.5 174.001C79 -95.4996 332.5 -7.99936 349 155.5C365.5 319 452 337.501 578.5 337.501C705 337.501 692.5 480.334 654 542.501"
                />
                <text>
                  <textPath
                    ref={(el) => (textPathRefs.current[0] = el)}
                    startOffset="0%"
                    href="#curve"
                  >
                    Products that keep you feeling energised all day
                    &nbsp;
                  </textPath>
                  <textPath
                    ref={(el) => (textPathRefs.current[1] = el)}
                    className="duplicate-text"
                    startOffset="200%" // Shift it slightly further
                    href="#curve"
                  >
                    Products that keep you feeling energised all day
                    &nbsp;
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="svg-order-button-container-1">
              <div className="svg-order-button">
                <img
                  src={Orderbuttons}
                  alt="order-button-svg"
                  className="order-button-svg"
                />
              </div>
              <div className="liquid-text-container">
                <a
                  className="liquid-text-1"
                  href="/product/milk-my-gains-sample-product"
                >
                  ORDER <br />
                  NOW
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <img src={ProteinCap} alt="protein-cap" className="protein-cap" />
            {window.innerWidth < 768 ? (
              <div class="content-protein">
                <h1 className="pure-heading">
                  PURE PROTEIN.
                  <br />
                  ZERO COMPROMISE.
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
            )}
          </div>
        </div>
      </div>

      {/* Power Of Protein*/}
      <div className="power-wrapper">
        <div className="power-container bg-white">
          <h1 className="power-space-heading">
            THE POWER OF
            <br /> PROTEIN
          </h1>
          <div className="power-space-width">
            <div className="power-space">
              <div className="row row-build">
                <div className="col-sm-6 build-text">
                  {isMobile ? (
                    <div className="content-power">
                      <h1 className="power-heading">BUILD MUSCLE</h1>
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
                  )}
                  <div className="build-container">
                    {isMobile ? (
                      <p className="build-para">
                        Protein builds muscle and bone, supporting agility and
                        resilience. It’s essential for vitality and longevity,
                        fueling an active, enduring lifestyle.
                      </p>
                    ) : (
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
                    )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <img
                    src={Weightliftanimation}
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
                  {isMobile ? (
                    <div className="content-power">
                      <h1 className="power-heading">STAY LEAN</h1>
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
                  )}
                  <div className="build-container build-para-align">
                    <p className="build-para">
                      Protein aids fat loss by increasing fullness and boosting
                      metabolism. It requires more energy to digest than carbs
                      or fats, making it doubly effective for fat loss. The most
                      satiating macronutrient that supports a lean and healthier
                      body composition.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <img
                    src={Basketballanimation}
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
                  {isMobile ? (
                    <div className="content-power">
                      <h1 className="power-heading">ENHANCE BEAUTY</h1>
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
                  )}
                  <div className="build-container build-para-align">
                    <p className="build-para">
                      A high-protein diet nourishes skin, strengthens nails, and
                      promotes vibrant hair, enhancing beauty from within and
                      contributing to a radiant, healthy appearance.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <img
                    src={Yogaanimation}
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
                  onClick={() =>
                    navigate("/product/milk-my-gains-sample-product")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raising the star */}
      <div className="animation-container">
        <div className="text-wrapper text-anim">
          <div>
            <h1 className="raising">RAISING</h1>
          </div>
          <div className="middle-text">
            <span className="high">HIGH PROTEIN</span>
            <br />
            <span className="low">LOW CALORIES</span>
          </div>
          <div>
            <h1 className="bar-1">THE BAR</h1>
          </div>
        </div>
      </div>
      {/* Comparision Table */}
      <Sample />

      {/* Table Icon */}
      <div className="table-icons">
        <img
          src={Raisingfooter1}
          className="raising-footer-1"
          alt="raising-footer"
        />
        <img
          src={Raisingfooter2}
          className="raising-footer-2"
          alt="raising-footer"
        />
        <img
          src={Raisingfooter2}
          className="raising-footer-2"
          alt="raising-footer"
        />
        <img
          src={Raisingfooter2}
          className="raising-footer-2"
          alt="raising-footer"
        />
      </div>

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
            <h3 className="coming-wholesome">Coming soon !!!</h3>
          </div>
          <img src={Stickers} className="stickers" alt="stickers" />
          <p className="muscle-para">
            Protein packed meals
            <br /> that taste as good as they
            <br /> make you feel.
          </p>
          <img src={Arrowpoint} className="arrow-point" alt="arrow-point" />
        </div>
      </div>

      {/* Proteins Section */}
      <div className="proteins-container-1 pt-5 pb-5">
        <div className="milk-pic-container">
          <img src={Footeranimation} className="protein-image" />
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
        {/* <div className="social-media-containers">
          <img src={LinkedInheader} className="linked-in" alt="" />
          <img src={Facebookheader} className="facebook" alt="" />
          <img src={Instagramheader} className="instagram" alt="" />
        </div> */}
        <div className="footers-column shop-footers mt-5">
          <div className="footer-column-links">
            <ul className="footers-links">
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/product/milk-my-gains-sample-product"
                >
                  SHOP
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/about"
                >
                  ABOUT US
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/faq"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/contact"
                >
                  CONTACT
                </a>
              </li>
            </ul>
            <ul className="footer-links-1">
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/shipping"
                >
                  SHIPPING
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/refund"
                >
                  REFUND & RETURNS
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/terms"
                >
                  TERMS & CONDITIONS
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="/privacy"
                >
                  PRIVACY POLICY
                </a>
              </li>
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
