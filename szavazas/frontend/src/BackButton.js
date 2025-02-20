import React from 'react';
import './BackButton.css';

const BackButton = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <button className="side-back-btn" onClick={handleBackClick}>
      <span>&#8636;</span>
    </button>
  );
};

export default BackButton;
