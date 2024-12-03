
import React, { useEffect, useState } from 'react';
import './Loading.css'; 

const Loading = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
    }, 1000);

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
