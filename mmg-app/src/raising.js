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
    tl.to(
      ".raising",
      { x: "-150px", duration: 1, ease: "power2.out" },
      "-=0.5"
    );
    tl.to(".bar-1", { x: "160px", duration: 1, ease: "power2.out" }, "-=1");

    // Step 3: Show "HIGH PROTEINS LOW CALORIES" with zoom effect
    tl.fromTo(
      ".middle-text-1",
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

   useEffect(() => {
      if (!setIsLoaded) return;
  
      let ctx = gsap.context(() => {
        const highProtein = document.querySelector(".high-proteins-1");
        const lowCalories = document.querySelector(".low-proteins-1");
  
        gsap.fromTo(
          highProtein,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".animations-container-2",
              start: "top 80%", // Adjusted for better timing
              end: "top 50%",
              scroller: ".home-wrapper", 
              toggleActions: "play none none reverse",
            },
          }
        );
  
        gsap.fromTo(
          lowCalories,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".animations-container-2",
              start: "top 80%",
              end: "top 50%",
              scroller: ".home-wrapper",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
  
      return () => ctx.revert(); // Cleanup on unmount
    }, [setIsLoaded]);

    

  return (
    <div>
        <div className="animation-container">
          <div className="text-wrapper text-anim-wrapper">
            <h1 className="raising">RAISING</h1>
            <div className="middle-text-1 ">
              <span className="high">HIGH PROTEIN</span>
              <br />
              <span className="low">LOW CALORIES</span>
            </div>
            <h1 className="bar-1">THE BAR</h1>
          </div>
        </div>
    </div>
  );
}

export default Raising; // Changed export name to match function name
