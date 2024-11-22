import React from 'react';
import parlamentVideo from './images/parlamentvideo.mp4'; // Video file
import './HeaderBanner.css';

const HeaderBanner = () => {
  return (
    <header className="header-banner">
      <video
        className="banner-video"
        autoPlay
        loop
        muted
        playsInline
        type="video/mp4"
      >
        <source src={parlamentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="banner-overlay">
        <div className="hero-sec">
          <div className="overlay">
            <div className="caption">
              <h3>Készen áll dönteni a jövőről?</h3>
              <p className="description">
              Te is számítasz! Válassz, és formáld az országunk jövőjét. Ne hagyd ki a lehetőséget, hogy részt vegyél a döntéshozatalban!
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBanner;
