// src/Loading.js

import React, { useEffect, useState } from 'react';
import './Loading.css'; // Importálhatod a stílusokat egy külön fájlba, ha szeretnéd

const Loading = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // 1 másodperc múlva kezd elhalványulni a képernyő
    setTimeout(() => {
      setHidden(true);
    }, 1000);

    // 1,5 másodperc múlva navigálunk a 'login' oldalra
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
  }, []);

  return (
    <div className={`loading-container ${hidden ? 'hidden' : ''}`}>
      <img src="/images/most.png" alt="Loading" className="loading-image" />
    </div>
  );
};

export default Loading;
