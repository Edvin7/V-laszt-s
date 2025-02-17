import React, { useState, useEffect } from 'react';
import './Party.css';
import Footer from './Footer';

const Stats = () => {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await fetch('http://localhost:5000/parties');
        if (!response.ok) {
          throw new Error('Error fetching party data');
        }
        const data = await response.json();
        setParties(data);
      } catch (error) {
        console.error('Error fetching party data:', error);
        setError('Failed to load party data');
      }
    };

    fetchParties();
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
            <div className="party-logo-container">
              <img
                // Kép elérési útja a public mappában lévő partok logóira
                src={`/images/partieslogo/${party.photo}`}  // A party.photo itt 'nemzetihaladas.png' vagy más
                alt={party.name}
                className="party-logo"
              />
            </div>
            <h3 className="party-name">{party.name}</h3>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
