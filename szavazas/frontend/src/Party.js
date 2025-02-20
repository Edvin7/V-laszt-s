import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // A useNavigate importálása
import './Party.css';
import Footer from './Footer';

const Partyies = () => {
  const [parties, setParties] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // A navigate hook, hogy átirányíthassunk egy új oldalra

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

  const handleViewMore = (partyId) => {
    // A partyId segítségével átirányítjuk a részletes oldalra
    navigate(`/party/${partyId}`);
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
  src={`http://localhost:5000/uploads/${party.photo}`}  // A kép elérési útja a backend által visszaadott relatív útvonal alapján
  alt={party.name}
  className="party-logo"
/>
            </div>
            <h3 className="party-name">{party.name}</h3>
            <button className="view-more-button" onClick={() => handleViewMore(party.party_id)}>
              Több információ
            </button>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Partyies;
