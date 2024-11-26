import React, { useEffect, useState } from 'react';
import './VotingPage.css'; // CSS import

const partiesList = [
  'Fidesz', 'Momentum', 'MSZP', 'Jobbik', 'DK',
  'LMP', 'Párbeszéd', 'Mi Hazánk', 'Együtt', 'SZDSZ',
  'Zöldek', 'Liberálisok' // Új pártok hozzáadva
];

const VotingPage = () => {
  const [selectedParty, setSelectedParty] = useState(null);

  useEffect(() => {
    document.body.classList.add('voting-page-disabled-scroll');
    return () => {
      document.body.classList.remove('voting-page-disabled-scroll');
    };
  }, []);

  const handleVote = (party) => {
    setSelectedParty(party);
  };

  const handleSubmit = () => {
    if (selectedParty) {
      alert(`Szavazat leadva: ${selectedParty}`);
    } else {
      alert('Kérjük, válasszon egy pártot!');
    }
  };

  return (
    <div className="ballot-wrapper">
      <div className="ballot-container">
        <h1>Szavazólap</h1>
        <div className="parties">
          {partiesList.map((party, index) => (
            <div className="party" key={index}>
              <img
                src={`images/${party.toLowerCase()}_logo.png`}
                alt={`${party} logo`}
              />
              <p>{party}</p>
              <div className="vote-wrapper">
                <div
                  className={`vote-circle ${selectedParty === party ? 'selected' : ''}`}
                  onClick={() => handleVote(party)}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={handleSubmit}>
          Szavazat leadása
        </button>
      </div>
    </div>
  );
};

export default VotingPage;
