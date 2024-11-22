import React from 'react';
import parlament from './images/parlament.jpg'; // Kép
import './HeaderBanner.css'
const HeaderBanner = () => {
  return (
    <header className="header-banner">
      <img
        src={parlament}
        alt="Parliament Building"
        className="banner-image"
      />
      <div className="banner-overlay">
        <h1>Welcome to the Header Banner</h1>
        <p>This is a sample header with a responsive background image.</p>
      </div>
    </header>
  );
};

export default HeaderBanner;
