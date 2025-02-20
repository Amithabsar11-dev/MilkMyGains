import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './text-anim.css';

const Textanim = ({ setIsLoaded }) => {
    const textPathRefs = useRef([]);

    useEffect(() => {
        console.log('useEffect triggered');
        
        // Ensure setIsLoaded is defined before proceeding
        if (!setIsLoaded) return;
        console.log('setIsLoaded:', setIsLoaded);

        // Register GSAP ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Check if textPathRefs are set
        console.log("Text Path Refs:", textPathRefs.current);

        // ScrollTrigger for textPath animation
        const scrollTrigger = ScrollTrigger.create({
            trigger: '.container-animation',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: true, // Enable markers for debugging
            scroller: ".home-wrapper",
            onUpdate: (self) => {
                const progress = self.progress * 100; // Correct way to access progress
                textPathRefs.current.forEach((path, index) => {
                    if (path) {
                        const offset = (progress + index * 40) % 100; // Adjust offset for each path
                        gsap.set(path, { attr: { startOffset: `${offset}%` } });
                    } else {
                        console.warn(`Text path at index ${index} is not defined.`);
                    }
                });
            },
        });

        // ScrollTrigger for logo scroll animation
        gsap.to('.logos', {
            y: -200,
            scrollTrigger: {
                trigger: '.logos-container',
                start: 'top center',
                end: 'bottom center',
                scrub: true,
                scroller: ".home-wrapper",
                markers: true, // Enable markers for debugging
            },
            ease: 'none',
        });

        // Cleanup on unmount
        return () => {
            scrollTrigger.kill();
        };
    }, [setIsLoaded]);

    return (
        <div className="text-container-animation">
            {/* SVG Curve Text */}
            <div style={{ height: '100vh' }}>
                <h1>Text Animation</h1>
            </div>
            <div className="svg-container">
                <svg viewBox="0 0 250 90">
                    <path fill="none" id="curve" d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68" />
                    <text>
                        <textPath ref={el => textPathRefs.current[0] = el} className="text-path" startOffset="0%" href="#curve">
                            Curabitur mattis efficitur velit
                        </textPath>
                        <textPath ref={el => textPathRefs.current[1] = el} className="text-path" startOffset="40%" href="#curve">
                            Curabitur mattis efficitur velit
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* Logos Scrolling Section */}
            <div className="logos-container">
                <div className="logos">
                    <img src="medias/1.jpg" alt="Logo 1" />
                    <img src="medias/2.jpg" alt="Logo 2" />
                    <img src="medias/3.jpg" alt="Logo 3" />
                    <img src="medias/4.jpg" alt="Logo 4" />
                    <img src="medias/5.jpg" alt="Logo 5" />
                </div>
            </div>
            <div style={{ height: '100vh' }}>
                <h1>Text Animation</h1>
            </div>
        </div>
    );
};

export default Textanim;
