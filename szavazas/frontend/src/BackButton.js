import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    window.scrollTo(0, 0);  // Ugrás a lap tetejére
    navigate(-1);  // Visszalépés az előző oldalra
  };

  return (
    <div className="back-button" onClick={handleBackClick}>
      <div className="arrow"></div>  {/* Az arrow osztály az, ami a nyíl stílust adja */}
    </div>
  );
};

export default BackButton;
