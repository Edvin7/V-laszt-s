import React, { useState, useEffect } from 'react';
import './VotingPage.css';

const VotingPage = () => {
  const [selectedParty, setSelectedParty] = useState(null); 
  const [parties, setParties] = useState([]); 

  // Betöltjük a pártokat az API-ból
  useEffect(() => {
    fetch('http://localhost:5000/voting')
      .then(response => {
        if (!response.ok) {
          throw new Error('Hiba történt a pártok betöltésekor');
        }
        return response.json();
      })
      .then(data => setParties(data))
      .catch((error) => {
        console.error('Hiba történt a pártok betöltésekor:', error);
      });
  }, []);

  // Párt kiválasztása
  const handleVote = (party) => {
    setSelectedParty(party); 
  };

  // Véletlenszerű hash generálása a szavazathoz
  const generateVoteHash = () => {
    return Math.random().toString(36).substring(2); // Egyszerű véletlenszerű hash generálása
  };
  
  // Szavazat leadása
  const handleSubmit = () => {
    if (selectedParty) {
      // Lekérjük a user objektumot a localStorage-ból
      const user = JSON.parse(localStorage.getItem('user')); // A 'user' kulcs alatt
      const userId = user ? user.id : null; // Az ID mező hozzáférése
  
      // Ellenőrizzük, hogy van-e userId
      if (!userId) {
        alert('A felhasználói ID nem található!');
        return;
      }
  
      // Szavazat adatainak előkészítése
      const voteData = {
        election_id: 1, // Ha több választás van, ennek változnia kell
        candidate_id: selectedParty.party_id,
        vote_hash: generateVoteHash(), // Dinamikusan generált hash
        user_id: userId, // Hozzáadjuk az user_id-t
      };
  
      fetch('http://localhost:5000/voting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Hiba történt a szavazat leadásakor');
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message); // Visszajelzés a felhasználónak
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
                  className={`vote-circle ${selectedParty?.party_id === party.party_id ? 'selected' : ''}`}
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
