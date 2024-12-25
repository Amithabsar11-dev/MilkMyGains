import React, { useEffect, useState } from 'react';
import './preload.css';

const Preload = () => {
  const [rippleAnimated, setRippleAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRippleAnimated(true);
    }, 3500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="preload-container">
      <div className="word">
        {['P', 'U', 'R', 'E'].map((letter, index) => (
          <span key={index} className="letter" style={{ animationDelay: `${index * 0.2}s` }}>
            {letter}
          </span>
        ))}
      </div>
      <div className="word">
        {['P', 'O', 'W', 'E', 'R', 'F', 'U', 'L'].map((letter, index) => (
          <span key={index} className="letter" style={{ animationDelay: `${(index + 4) * 0.2}s` }}>
            {letter}
          </span>
        ))}
      </div>
      <div className="word">
        {['P', 'R', 'O', 'T', 'E', 'I', 'N'].map((letter, index) => (
          <span key={index} className="letter" style={{ animationDelay: `${(index + 12) * 0.2}s` }}>
            {letter}
          </span>
        ))}
      </div>

      {/* Ripple Element */}
      <div className={`ripple ${rippleAnimated ? 'ripple-animated' : ''}`}></div>
    </div>
  );
};

export default Preload;
