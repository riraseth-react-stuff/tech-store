import React from 'react';

export default function Hero({ children }) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>code, refactor, repeat</h1>
        <p>embrace the inevitable</p>
        {children}
      </div>
    </div>
  );
}
