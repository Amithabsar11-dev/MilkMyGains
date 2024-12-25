import React, { useEffect, useState } from 'react';
import './preload.css';
import Background from './assets/background.png';

const Preload = () => {
  const [rippleAnimated, setRippleAnimated] = useState(false);
  const [showWhiteText, setShowWhiteText] = useState(false);

  useEffect(() => {
    const rippleTimer = setTimeout(() => {
      setRippleAnimated(true);
    }, 2200); 

    const textTimer = setTimeout(() => {
      setShowWhiteText(true);
    }, 2500); 

    return () => {
      clearTimeout(rippleTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="preload-container">
      {/* Image overlay */}
      <div className="image-overlay"></div>

      {/* Text Content */}
      <div className={`word-alignment ${showWhiteText ? 'text-white' : ''}`}>
        <div className="word">
          {['P', 'U', 'R', 'E'].map((letter, index) => (
            <span key={index} className="letter" style={{ animationDelay: `${index * 0.1}s` }}>
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {['P', 'O', 'W', 'E', 'R', 'F', 'U', 'L'].map((letter, index) => (
            <span key={index} className="letter" style={{ animationDelay: `${(index + 4) * 0.1}s` }}>
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {['P', 'R', 'O', 'T', 'E', 'I', 'N'].map((letter, index) => (
            <span key={index} className="letter" style={{ animationDelay: `${(index + 12) * 0.1}s` }}>
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Ripple Element */}
      <div className={`ripple ${rippleAnimated ? 'ripple-animated' : ''}`}></div>
    </div>
  );
};

export default Preload;
