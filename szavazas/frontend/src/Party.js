import React from "react";
import "./Party.css";

const Party = ({ name, logo, isSelected, onClick }) => (
  <div className={`party ${isSelected ? "selected" : ""}`} onClick={onClick}>
    <img src={logo} alt={name} />
    <p>{name}</p>
    <div className={`vote-circle ${isSelected ? "selected" : ""}`}></div>
  </div>
);

export default Party;
