import React, { useState, useEffect, useRef } from "react";
import Eyestar from "./assets/eyediamond1.svg";
import Signal from "./assets/shopicon1.svg";
import Star from "./assets/staricon1.svg";
import Eye from "./assets/eyeicon1.svg";
import Drop from "./assets/dropicon1.svg";
import Eyestar1 from "./assets/eyediamond.svg";
import Signal1 from "./assets/shopicon.svg";
import Star1 from "./assets/staricon.svg";
import Eye1 from "./assets/eyeicon.svg";
import Drop1 from "./assets/dropicon.svg";
import TransparencyIcon from "./assets/Transparancy-card.svg";
import MythIcon from "./assets/myth-card.svg";
import PossibilitiesIcon from "./assets/unlocking-card.svg";
import TransparencyIconline from "./assets/spring-transparancy.svg";
import MythIconline from "./assets/spring-break.svg";
import PossibilitiesIconline from "./assets/spring-unlock.svg";
import Protein from "./assets/About-protein.svg";
import MilkTM from "./assets/Logo-TM-1.svg";
import Copyright1 from "./assets/copyright1.svg";
import Weightlift from "./assets/body builder.svg";
import Lean from "./assets/basketball.svg";
import Yoga from "./assets/yoga.svg";
import "./About.css";
import "./cards.css";
import Sunback from "./assets/Sunback.svg";
import EyesightIcon from "./assets/EyesightIcon.svg";
import SunlookIcon from "./assets/SunlookIcon.svg";
import Aboutfooteranimation from "./assets/About-footer.gif";
import { gsap } from "gsap";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import Copyrightline from "./assets/Line 23.svg";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "Build Muscle",
    text: "Protein builds muscle and bone, supporting agility and resilience. It’s essential for vitality and longevity, fueling an active, enduring lifestyle.",
    image: Weightlift,
    number: "01",
  },
  {
    id: 2,
    title: "Stay Lean",
    text: "Protein aids fat loss by increasing fullness and boosting metabolism. It requires more energy to digest than carbs or fats, making it doubly effective for fat loss. The most satiating macronutrient that supports a lean and healthier body composition.",
    image: Lean,
    number: "02",
  },
  {
    id: 3,
    title: "Enhance Beauty",
    text: "A high-protein diet nourishes skin, strengthens nails, and promotes vibrant hair, enhancing beauty from within and contributing to a radiant, healthy appearance.",
    image: Yoga,
    number: "03",
  },
];

function About({ setIsLoaded, isLoaded }) {
  const [activeCard, setActiveCard] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = (id) => {
    if (!isMobile) {
      setActiveCard(activeCard === id ? null : id);
    }
  };
  useEffect(() => {
    if (!isLoaded) return;

    let sections = gsap.utils.toArray(".card");
    let lastIndex = sections.length - 1; // Get last card index

    gsap.to(".about-power", {
      scrollTrigger: {
        trigger: ".about-sticky",
        start: "top top",
        end: "+=150%",
        scroller: ".home-wrapper",
        pin: true, // Pins the section
        pinSpacing: false, // Prevents adding extra space
        scrub: 1,
      },
    });

    gsap.to(sections, {
      scrollTrigger: {
        trigger: ".about-power",
        start: "top top",
        end: "+=150%",
        scroller: ".home-wrapper",
        scrub: 1,
        onUpdate: (self) => {
          let index = Math.floor(self.progress * sections.length);

          sections.forEach((card, i) => {
            if (i === index || (index >= lastIndex && i === lastIndex)) {
              // Keep last card open when scrolling past it
              gsap.to(card, {
                scale: 1,
                opacity: 1,
                duration: 0.7,
                ease: "power4.out",
              });
              card.classList.add("active");
            } else {
              gsap.to(card, {
                scale: 0.9,
                opacity: 0.5,
                duration: 0.7,
                ease: "power4.out",
              });
              card.classList.remove("active");
            }
          });
        },
      },
    });
  }, [isLoaded]);

  //Card Animation
  const circleRef = useRef(null);

  useEffect(() => {
    if (!setIsLoaded) return;
    gsap.to(circleRef.current, {
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
  }, [setIsLoaded]);

  return (
    <div className="about-container">
      <div className="about-protein">
        <div className="icon-paradigm">
          <img src={Star} alt="Star" className="star-icon" />
          <img src={Eyestar} alt="Diamond" className="diamond-icon" />
          <img src={Eye} alt="Eye" className="eye-icon" />
          <img src={Signal} alt="Shop" className="shop-icon" />
          <img src={Drop} alt="Drop" className="drop-icon" />
        </div>
        <div className="about-lifestyle">
          <h1 className="about-heading">
            PROTEIN FOR <br /> EVERY LIFESTYLE
          </h1>
          <p className="about-para">
            MilkMyGains is a quest for high-quality, vegetarian protein to fuel
            an active
            <br /> lifestyle. Faced with limited options, we’re here to bridge
            India’s protein <br />
            gap, naturally and accessibly. More than a solution, it’s a mission
            to
            <br /> transform lives, one high-protein bite at a time.
          </p>
        </div>
        <div className="about-power">
          <h1 className="about-header">
            THE POWER OF
            <br /> PROTEIN
          </h1>
          <div className="card-container">
            {cards.map((card) => (
              <div
                key={card.id}
                id={`card-${card.id}`}
                className={`card ${activeCard === card.id ? "active" : ""}`}
              >
                <div className="text-section">
                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-text">{card.text}</p>
                </div>
                <div className="card-content">
                  <div className="image-section">
                    <img className="card-image" src={card.image} alt="Card" />
                    <span className="card-number">{card.number}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="about-challenge">
        <h2 className="about-subheading">CHALLENGING THE NORMS WITH</h2>
        <h1 className="about-nutrition">
          PURE, POWERFUL <br /> NUTRITION
        </h1>
        <p className="about-para1">
          In an industry dominated by carb-heavy, fat-laden dairy products,
          <br /> we’re here to rewrite the rules. Our approach isn’t about
          <br /> compromise; it’s about transformation. We are here to redefine
          <br /> nutrition for modern high-performance living.
        </p>
      </div>
      {isMobile ? (
        <div className="mobile-cards-container">
          <div className="mobile-cards">
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
                      We’re challenging the belief that dairy can’t be high in
                      protein and low in calories. MilkMyGains transforms dairy
                      into a nutritional powerhouse, proving that high-quality
                      protein doesn’t have to come with excess fat.
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
                      By pushing the boundaries of dairy science, we’ve crafted
                      products with exceptional protein levels that were once
                      thought impossible. We’re redefining what’s achievable
                      using only natural ingredients.
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
            <div className="mobile-carding1">
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
                      No We believe you have the
                      <br /> right to know where your <br />
                      food comes from. Our <br /> transparent supply chain lets
                      you trace each <br />
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
                      className="carding-icon-line1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile-carding1">
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
          </div>
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
                        No We believe you have the
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
                        className="carding-icon-line1"
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
                        We’re challenging the belief that dairy can’t be high in
                        protein and low in calories. MilkMyGains transforms
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
                        We’re challenging the belief that dairy can’t be high in
                        protein and low in calories. MilkMyGains transforms
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
      {/* Mobile view Cards */}

      {/* <div className='icon-container'>
                <div className="icon-paradigm">
                    <img src={Star1} alt="Star" className="star-icon" />
                    <img src={Eyestar1} alt="Diamond" className="diamond-icon" />
                    <img src={Eye1} alt="Eye" className="eye-icon" />
                    <img src={Signal1} alt="Shop" className="shop-icon" />
                    <img src={Drop1} alt="Drop" className="drop-icon" />
                </div>
            </div> */}
      <div className="about-join-container">
        <div className="about-join">
          <h1 className="about-heading">
            JOIN THE <br />
            MOVEMENT
          </h1>
          <p className="about-para">
            MilkMyGains is more than a brand; it’s a mission to transform the
            way we see
            <br /> nutrition and active living. Each product is an invitation to
            embrace a high-protein,
            <br /> active lifestyle—one where quality, transparency, and
            innovation fuel your journey.
            <br /> Together, let’s change the paradigm of nutrition and redefine
            what it means to fuel
            <br /> your gains—naturally, powerfully, and purposefully.
          </p>
          {/* <div className="protein-pic-container">
            <video autoPlay loop muted playsInline className="protein-image1">
              <source src={Aboutfooteranimation} type="video/gif" />
              Your browser does not support the video tag.
            </video>
          </div> */}
           <div className="protein-pic-container">
            <img src={Aboutfooteranimation} className="protein-image1" />
          </div>
          <div className="milk-pic-container">
            <img src={MilkTM} className="milk-image1" alt="milk-pic" />
          </div>
          <div className="signup-container">
            <h1 className="signup-heading">SIGNUP TO OUR NEWSLETTER</h1>
            <div>
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="email-placing"
              />
              <button className="Subscribe-button">Subscribe</button>
            </div>
          </div>
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
                    href="about"
                  >
                    ABOUT US
                  </a>
                </li>
                <li>
                  <a
                    style={{ textDecoration: "none", color: "white" }}
                    href="faq"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    style={{ textDecoration: "none", color: "white" }}
                    href="contact"
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
      </div>
      {/* Footer Section */}
      <div className="footers mb-3">
        <p className="copyright-text">Copyright © 2025. All rights reserved</p>
      </div>
    </div>
  );
}

export default About;
