import React, { useState, useEffect } from 'react';
import './Stats.css'; 

const Stats = () => {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null); 
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/parties')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hiba történt a pártok lekérésekor');
        }
        return response.json();
      })
      .then((data) => setParties(data))
      .catch((error) => {
        console.error('Hiba történt a pártok lekérésekor:', error);
        setError('Nem sikerült lekérni a pártok adatait.');
      });
  }, []);


  const closeModal = () => {
    setSelectedParty(null);
  };

  return (
    <div className="stats-container">
      <h2 className="stats-title">Politikai Pártok</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="party-list">
        {parties.map((party) => (
          <div key={party.party_id} className="party-card">
            <div className="party-image-container">
              <img
                src={party.image_url || 'https://cdn.szegedma.hu/2024/01/m89CuFvWKe-QHDgP6hK2JUTw4rW2SkqaQw4MoHrP9vc/fill/1347/758/no/1/aHR0cHM6Ly9jbXNjZG4uYXBwLmNvbnRlbnQucHJpdmF0ZS9jb250ZW50L2M5OTJkNGQ3OGY3YTRmMGY5ZDAyZGNiN2VkZWNhOTBm.jpg'}
                alt={party.name}
                className="party-image"
              />
            </div>
            <h3 className="party-name">{party.name}</h3>
            <p className="party-description">{party.description}</p>
            <button className="view-more-button" onClick={() => setSelectedParty(party)}>
              Több információ
            </button>
          </div>
        ))}
      </div>

      {selectedParty && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>X</button>
            <h3>{selectedParty.name}</h3>
            <p>{selectedParty.description}</p>
            {/* Itt bármit hozzáadhatsz, amit szeretnél megjeleníteni a modálban */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
