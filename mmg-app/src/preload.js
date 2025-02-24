import React, { useEffect, useState } from 'react';
import './preload.css';
import gsap from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Mask from "./assets/background.png";

const Preload = () => {
  const [showMask, setShowMask] = useState(false);
  const [startMaskAnimation, setStartMaskAnimation] = useState(false);
  const [showWhiteText, setShowWhiteText] = useState(false);

  useEffect(() => {
    // Show the mask as soon as the text animation completes
    setTimeout(() => {
      setShowMask(true);
      setStartMaskAnimation(true); // Start expansion immediately
    }, 1800); // Matches the end of text animation

    return () => {
      clearTimeout();
    };
  }, []);


  useEffect(() => {
    Splitting();

    // Create a GSAP timeline to run animations sequentially
    const tl = gsap.timeline();

    // PURE Animation
    const pureLetters = document.querySelectorAll(".pure .letter");
    tl.fromTo(
      pureLetters,
      {
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% 0%",
        z: -200,
      },
      {
        opacity: 1,
        rotationX: 0,
        z: 0,
        stagger: 0.05,
        ease: "power1.inOut",
        duration: 0.8,
      }
    );

    // POWERFUL Animation (After PURE completes)
    const powerfulLetters = document.querySelectorAll(".powerful .letter");
    const totalLetters = powerfulLetters.length;

    tl.fromTo(
      powerfulLetters,
      {
        y: (index) => {
          const mid = Math.floor(totalLetters / 2);
          const distance = Math.abs(index - mid) * 50 + 200;
          return distance;
        },
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "elastic.out(1, 0.5)", // Elastic effect for bounce
        stagger: {
          amount: 0.5,
          from: "center",
        },
        duration: 0.8,
      }
    );

    // PROTEIN Animation (After POWERFUL completes)
    const proteinLetters = document.querySelectorAll(".protein .letter");
    tl.fromTo(
      proteinLetters,
      {
        opacity: 0,
        y: 30, // Starts slightly below
        scale: 0.8, // Slight zoom effect
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.05,
        ease: "power2.out", // Smooth easing
        duration: 1,
      }
    );
  }, []);


  return (
    <div className="preload-container">
      {/* Image overlay */}
      <div className="image-overlay"></div>

      {showMask && (
        <div className={`mask1 ${startMaskAnimation ? "mask-expand" : ""}`}>
          <img src={Mask} className="masking" alt="Masked Background" style={{ objectFit: "cover" }} />
        </div>
      )}

      {/* Text Content */}
      <div className="word-alignment">
        <div className="word pure">
          {["P", "U", "R", "E", "."].map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word pure">
          {["P", "O", "W", "E", "R", "F", "U", "L", "."].map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word pure">
          {["P", "R", "O", "T", "E", "I", "N", "."].map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preload;
