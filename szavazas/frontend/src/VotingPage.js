import React, { useState, useEffect } from 'react';
import './VotingPage.css';

const VotingPage = () => {
  const [selectedParty, setSelectedParty] = useState(null); 
  const [parties, setParties] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:5000/voting')
      .then(response => response.json())
      .then(data => setParties(data)) 
      .catch((error) => {
        console.error('Hiba történt a pártok betöltésekor:', error);
      });
  }, []);

  const handleVote = (party) => {
    setSelectedParty(party); 
  };

  const handleSubmit = () => {
    if (selectedParty) {
      const voteData = {
        election_id: 1, 
        candidate_id: selectedParty.party_id, 
        vote_hash: 'unique_hash_value', 
      };

      fetch('http://localhost:5000/voting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData), 
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message); 
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
