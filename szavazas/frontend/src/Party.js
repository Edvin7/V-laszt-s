import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Party.css';
import Footer from './Footer';

const Partyies = () => {
  const [parties, setParties] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true);
    }

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
    navigate(`/party/${partyId}`);  // Átirányítás a PartyDetails oldalra
  };

  return (
    <div className="stats-container">
      <h2 className="stats-title">Politikai <span style={{ color: '#033473' }}>Pártok</span></h2>
      <div className="lline"></div>

      {error && <p className="error-message">{error}</p>}

      <div className="party-list">
        {parties.map((party) => (
          <div key={party.party_id} className="party-card">
            <div className="party-logo-container">
              <img
                src={`http://localhost:5000/uploads/${party.photo}`}
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

      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Partyies;
