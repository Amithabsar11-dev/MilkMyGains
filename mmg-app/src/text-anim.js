import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './text-anim.css';

const Textanim = ({ setIsLoaded }) => {
     const [viewBox, setViewBox] = useState("0 -90 720 543");
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
        trigger: ".text-container-animation",
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

     useEffect(() => {
        const updateViewBox = () => {
          const width = window.innerWidth;
          if (width >= 1700 && width <= 2200) {
            setViewBox("0 -90 910 543");
          } else {
            setViewBox("0 -90 720 543");
          }
        };
    
        updateViewBox(); // Set initial value
        window.addEventListener("resize", updateViewBox);
        return () => window.removeEventListener("resize", updateViewBox);
      }, []);
  

    return (
        <div className="text-container-animation">
            <div className="svg-container">
              <svg width="681" height="543" viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" id="curve" d="M0.5 174.001C79 -95.4996 332.5 -7.99936 349 155.5C365.5 319 452 337.501 578.5 337.501C705 337.501 692.5 480.334 654 542.501" />
                <text>
                  <textPath ref={(el) => (textPathRefs.current[0] = el)} className="text-path" startOffset="0%" href="#curve">
                    Your daily dairy keeps you energized all day long &nbsp;
                  </textPath>
                  <textPath ref={(el) => (textPathRefs.current[1] = el)} className="text-path duplicate-text" startOffset="100%" href="#curve">
                    Your daily dairy keeps you energized all day long &nbsp;
                  </textPath>
                </text>
              </svg>
            </div>
        </div>
    );
};

export default Textanim;
