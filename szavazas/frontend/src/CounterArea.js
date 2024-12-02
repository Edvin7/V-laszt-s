import React from "react";
import { useInView } from "react-intersection-observer";
import "./CounterArea.css";
import CounterUp from "react-countup";
import mapIcon from "./images/map.png";
import speechIcon from "./images/speech.png";
import userIcon from "./images/user.png";
import democracyIcon from "./images/democracy.png";

const CounterArea = () => {
  const counters = [
    { id: 1, icon: mapIcon, value: 5120, label: "Választókerületek" },
    { id: 2, icon: speechIcon, value: 4351, label: "Politikusok" },
    { id: 3, icon: userIcon, value: 1200, label: "Felhasználók" },
    { id: 4, icon: democracyIcon, value: 98, label: "Leadtott Szavazatok" },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

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
