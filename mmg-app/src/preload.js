import React, { useEffect, useState } from "react";
import "./preload.css";
import gsap from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Mask from "./assets/background.png";

const Preload = () => {
  const [showMask, setShowMask] = useState(false);
  const [startMaskAnimation, setStartMaskAnimation] = useState(false);
  const [showWhiteText, setShowWhiteText] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const translateValues = isMobile
    ? [
        [
          [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
        ], // PURE (Reset positions)
        [
          [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
        ], // POWERFUL (Reset positions)
        [
          [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
        ], // PROTEIN (Reset positions)
      ]
    : [
        [
          [30, 20], [20, 20], [10, 20], [0, 20], [0, 20],
        ], // PURE
        [
          [80, 20], [70, 20], [60, 20], [50, 20], [40, 20], [30, 20], [20, 20], [10, 20], [0, 20],
        ], // POWERFUL
        [
          [60, 20], [50, 20], [40, 20], [30, 20], [20, 20], [10, 20], [0, 20], [0, 20],
        ], // PROTEIN
      ];

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
          <img
            src={Mask}
            className="masking"
            alt="Masked Background"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      {/* Text Content */}
      <div className="word-alignment">
        {[
          ["P", "U", "R", "E", "."],
          ["P", "O", "W", "E", "R", "F", "U", "L", "."],
          ["P", "R", "O", "T", "E", "I", "N", "."],
        ].map((word, wordIndex) => (
          <div key={wordIndex} className="word pure">
            {word.map((letter, letterIndex) => {
              const [x, y] = translateValues[wordIndex]?.[letterIndex] || [
                0, 0,
              ]; // Default to (0,0) if not found
              return (
                <span
                  key={letterIndex}
                  className={`letter word-${wordIndex} letter-${letterIndex}`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preload;
