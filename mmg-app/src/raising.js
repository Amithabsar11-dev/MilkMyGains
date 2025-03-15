import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function Raising({ setIsLoaded }) {
  // Changed "raising" to "Raising"
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  //           trigger: ".animations-container-2",
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
  //           trigger: ".animations-container-2",
  //           start: "top 80%",
  //           end: "top 50%",
  //           scroller: ".home-wrapper",
  //           toggleActions: "play none none reverse",
  //         },
  //       }
  //     );
  //   });

  //   return () => ctx.revert(); // Cleanup on unmount
  // }, [setIsLoaded]);

  return (
    <div>
      <div className="animation-container">
        <div className="text-wrapper">
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
    </div>
  );
}

export default Raising; // Changed export name to match function name
