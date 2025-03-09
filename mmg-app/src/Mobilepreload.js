import React, { useEffect, useState } from "react";
import "./preload.css"; // Reuse the existing preload styles
import gsap from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Mask from "./assets/background.png";

const MobilePreload = ({ onComplete }) => {
  const [showMask, setShowMask] = useState(false);
  const [startMaskAnimation, setStartMaskAnimation] = useState(false);

  useEffect(() => {
    Splitting();

    const tl = gsap.timeline();

    // PURE Animation
    const pureLetters = document.querySelectorAll(".pure .letter");
    tl.fromTo(
      pureLetters,
      { opacity: 0, rotationX: -90, transformOrigin: "50% 0%", z: -200 },
      { opacity: 1, rotationX: 0, z: 0, stagger: 0.05, ease: "power1.inOut", duration: 0.8 }
    );

    // POWERFUL Animation
    const powerfulLetters = document.querySelectorAll(".powerful .letter");
    tl.fromTo(
      powerfulLetters,
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, ease: "elastic.out(1, 0.5)", duration: 0.8 }
    );

    // PROTEIN Animation
    const proteinLetters = document.querySelectorAll(".protein .letter");
    tl.fromTo(
      proteinLetters,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.05, ease: "power2.out", duration: 1 }
    );

    // Show mask after text animation
    setTimeout(() => {
      setShowMask(true);
      setStartMaskAnimation(true);
    }, 1800);

    // Call onComplete after preload animation is done
    setTimeout(() => {
      onComplete();
    }, 6000); // Same delay as desktop preload

    return () => clearTimeout();
  }, [onComplete]);

  return (
    <div className="preload-container">
      <div className="image-overlay"></div>
      {showMask && (
        <div className={`mask1 ${startMaskAnimation ? "mask-expand" : ""}`}>
          <img src={Mask} className="masking" alt="Masked Background" style={{ objectFit: "cover" }} />
        </div>
      )}
      <div className="word-alignment">
        {[
          ["P", "U", "R", "E", "."],
          ["P", "O", "W", "E", "R", "F", "U", "L", "."],
          ["P", "R", "O", "T", "E", "I", "N", "."],
        ].map((word, wordIndex) => (
          <div key={wordIndex} className="word pure">
            {word.map((letter, letterIndex) => (
              <span key={letterIndex} className="letter">
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobilePreload;
