import React, { useState, useEffect } from 'react';
import parlamentVideo from './images/parlamentvideo.mp4';
import './HeaderBanner.css';
import './CountdownTimer.css';

const HeaderBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [countdownDate, setCountdownDate] = useState(null); // Az új countdown date

  const [newCountdownDate, setNewCountdownDate] = useState(''); // A bevitt új dátum

  // Az új countdown dátum beállítása az input mezőből
  const handleDateChange = (e) => {
    setNewCountdownDate(e.target.value);
  };

  const updateCountdownDate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/date-plus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ countdownDate: newCountdownDate }),
      });
      

      const data = await response.json();
      if (response.ok) {
        console.log(data.message); // Siker üzenet
        setCountdownDate(new Date(newCountdownDate).getTime()); // Frissítjük az új countdown dátumot
      } else {
        console.error(data.error); // Hiba üzenet
      }
    } catch (error) {
      console.error('Error updating countdown date:', error);
    }
  };

  useEffect(() => {
    const fetchCountdownDate = async () => {
      try {
        const response = await fetch('/api/countdown-date');
        const data = await response.json();
        setCountdownDate(new Date(data.countdownDate).getTime());
      } catch (error) {
        console.error('Error fetching countdown date:', error);
      }
    };

    fetchCountdownDate();
  }, []);

  useEffect(() => {
    if (countdownDate) {
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
    }
  }, [countdownDate]);

  return (
    <header className="header-banner">
      <video className="banner-video" autoPlay loop muted playsInline type="video/mp4">
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
              <div className="countdown-cards">
                <div className="countdown-timer">
                  <span>{timeLeft.days} <span className="card-label">NAP</span></span>
                </div>
                <div className="countdown-timer">
                  <span>{timeLeft.hours} <span className="card-label">ÓRA</span></span>
                </div>
                <div className="countdown-timer">
                  <span>{timeLeft.minutes} <span className="card-label">PERC</span></span>
                </div>
                <div className="countdown-timer">
                  <span>{timeLeft.seconds} <span className="card-label">MÁSODPERC</span></span>
                </div>
              </div>
             {/* <div className="admin-controls">
                <input
                  type="datetime-local"
                  value={newCountdownDate}
                  onChange={handleDateChange}
                />
                <button onClick={updateCountdownDate}>Frissítés</button>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBanner;
