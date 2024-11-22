import React, { useState, useEffect } from 'react';
import parlamentVideo from './images/parlamentvideo.mp4'; // Video file
import './HeaderBanner.css';
import './CountdownTimer.css'; // Importáljuk a Countdown Timer CSS fájlt

const HeaderBanner = () => {
  const countdownDate = new Date("2024-12-31T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate]);

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
              
              <div className="countdown-timer">
                <span>{timeLeft.days}d : </span>
                <span>{timeLeft.hours}h : </span>
                <span>{timeLeft.minutes}m : </span>
                <span>{timeLeft.seconds}s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBanner;
