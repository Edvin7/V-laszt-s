import React, { useState, useEffect } from 'react';
import './VotingPage.css';

const VotingPage = () => {
  const [selectedParty, setSelectedParty] = useState(null); // Az aktuálisan kiválasztott párt
  const [parties, setParties] = useState([]); // A pártok betöltésére szolgáló állapot

  useEffect(() => {
    // API hívás a pártok adatainak lekérésére
    fetch('http://localhost:5000/voting')
      .then(response => response.json())
      .then(data => setParties(data)) // Az adatok beállítása a pártokhoz
      .catch((error) => {
        console.error('Hiba történt a pártok betöltésekor:', error);
      });
  }, []);

  // A szavazat kezeléséért felelős függvény
  const handleVote = (party) => {
    setSelectedParty(party); // Beállítjuk a kiválasztott pártot
  };

  const handleSubmit = () => {
    if (selectedParty) {
      const voteData = {
        election_id: 1, // A választás azonosítója
        candidate_id: selectedParty.party_id, // A párt ID-ja
        vote_hash: 'unique_hash_value', // A szavazó által generált egyedi hash
      };

      fetch('http://localhost:5000/voting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData), // A szavazat adatainak JSON formátumban való elküldése
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message); // Sikeres válasz megjelenítése
        })
        .catch((error) => {
          console.error('Hiba történt a szavazat leadásakor:', error);
          alert('Hiba történt a szavazat leadásakor!');
        });
    } else {
      alert('Kérjük, válasszon egy pártot!');
    }
  };

  return (
    <div className="ballot-wrapper">
      <div className="ballot-container">
        <h1>Szavazólap</h1>
        <div className="parties">
          {parties.map((party) => (
            <div
              key={party.party_id} // Párt egyedi azonosítója
              className="party"
              onClick={() => handleVote(party)} // Párt kiválasztása
            >
              <img
                src={`images/${party.name.toLowerCase()}_logo.png`}
                alt={`${party.name} logo`}
              />
              <p>{party.name}</p>
              <div className="vote-wrapper">
                <div
                  className={`vote-circle ${selectedParty === party ? 'selected' : ''}`}
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
