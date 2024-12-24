import React from 'react';
import './preload.css'; // Import the CSS for animations

const preload = () => {
  return (
    <div className="preload-container">
      <div className="word">
        {['P', 'U', 'R', 'E'].map((letter, index) => (
          <span key={index} className="letter" style={{ animationDelay: `${index * 0.3}s` }}>
            {letter}
          </span>
        ))}
      </div>
      <div className="word">
        {['P', 'O', 'W', 'E', 'R', 'F', 'U', 'L'].map((letter, index) => (
          <span key={index} className="letter" style={{ animationDelay: `${(index + 4) * 0.3}s` }}>
            {letter}
          </span>
        ))}
      </div>
      <div className="word">
        {['P', 'R', 'O', 'T', 'E', 'I', 'N'].map((letter, index) => (
          <span key={index} className="letter" style={{ animationDelay: `${(index + 12) * 0.3}s` }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default preload;
