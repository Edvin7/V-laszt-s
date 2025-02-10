import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./CounterArea.css";
import CounterUp from "react-countup";


const CounterArea = () => {
  const [counters, setCounters] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    // Adatok lekérése a backendből
    const fetchCounters = async () => {
      try {
        const response = await fetch("http://localhost:3000/counters"); // Backend URL
        if (!response.ok) {
          throw new Error("Hiba történt az adatok lekérésekor.");
        }
        const data = await response.json();
        setCounters(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCounters();
  }, []);

  return (
    <div
      className="counter-area pt-75 pb-45"
      style={{
        backgroundImage: `url('https://sazzadshakhbd.github.io/psd-html/img/bg/bg-counter.jpg')`,
      }}
    >
      <div className="container">
        <div className="counter-list" ref={ref}>
          {counters.map((counter) => (
            <div key={counter.id} className="single-counter text-center">
              <img
                src={counter.icon} 
                alt={counter.label}
                className="counter-icon"
              />
              <span className="counter">
                {inView && <CounterUp end={counter.value} duration={2} />}
              </span>
              <p>{counter.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterArea;