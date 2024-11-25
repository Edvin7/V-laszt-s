import React, { useEffect, useState } from 'react';
import './VotingPage.css';  // A saját CSS fájl, ahol a görgetés letiltás van

const VotingPage = () => {
  const [selectedParty, setSelectedParty] = useState(null); // Kiválasztott párt állapota

  // Lezárja a görgetést, amikor a VotingPage komponens aktív
  useEffect(() => {
    document.body.classList.add('voting-page-disabled-scroll');

    return () => {
      document.body.classList.remove('voting-page-disabled-scroll');
    };
  }, []);

  // Kiválasztott párt kezelése
  const toggleVote = (party) => {
    setSelectedParty(party);
  };

  return (
    <div className="ballot-wrapper">
      <div className="ballot-container">
        <h1 className='h11'>Szavazólap</h1>
        <div className="parties">
          {/* Párt választások */}
          {['Fidesz', 'Momentum', 'MSZP', 'Jobbik', 'DK', 'LMP', 'Párbeszéd', 'Mi Hazánk', 'Munkáspárt', 'Együtt', 'SZDSZ'].map((party, index) => (
            <div className="party" key={index}>
              <img src={`images/${party.toLowerCase()}_logo.png`} alt={party} />
              <p>{party}</p>
              <div
                className={`vote-circle ${selectedParty === party ? 'selected' : ''}`}
                onClick={() => toggleVote(party)}  // Kattintáskor kiválasztás
              ></div>
            </div>
          ))}
        </div>

        <button className="submit-btn" onClick={() => alert(`Szavazat leadva: ${selectedParty}`)}>
          Szavazat leadása
        </button>
      </div>
    </div>
  );
};

export default VotingPage;
