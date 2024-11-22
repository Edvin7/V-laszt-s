import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // Importáljuk a CSS fájlt

const CountdownTimer = () => {
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

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-header">
        <h2>Szavazás kezdete:</h2>
        <p>Ne hagyja ki a lehetőséget! A szavazás hamarosan elkezdődik!</p>
      </div>
      <div className="countdown-timer">
        <div className="timer-item">
          <p>{timeLeft.days}</p>
          <span>Days</span>
        </div>
        <div className="timer-item">
          <p>{timeLeft.hours}</p>
          <span>Hours</span>
        </div>
        <div className="timer-item">
          <p>{timeLeft.minutes}</p>
          <span>Minutes</span>
        </div>
        <div className="timer-item">
          <p>{timeLeft.seconds}</p>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
