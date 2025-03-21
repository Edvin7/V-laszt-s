import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PartyDetails.css';

const PartyDetails = () => {
  const { id } = useParams();  // Az id paraméter kinyerése az URL-ből
  const [party, setParty] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPartyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/parties/${id}`);  // Lekérjük a részletes adatokat
        if (!response.ok) {
          throw new Error('Failed to fetch party details');
        }
        const data = await response.json();
        setParty(data);  // A választ beállítjuk a party állapotba
      } catch (error) {
        console.error('Error fetching party details:', error);
        setError('Failed to load party details');
      }
    };

    fetchPartyDetails();
  }, [id]);  // Az id változásakor újra lekérjük az adatokat

  if (error) {
    return <div className="error-message">Hiba történt.</div>;
  }

  return (
    <div className="page-container">
      {party ? (
        <div className="card-container">
          <section className="profile">
            <div className="profile-header">
              <div className="profile-image">
                <img 
                  src={`/uploads/${party.photo}`}  // Kép elérhetősége
                  alt={party.name} 
                  className="party-logo"
                />
              </div>
              <div className="profile-info">
                <h2>{party.name}</h2>
                <p className="position">Politikai irányzat: <strong className='cim'>{party.political_ideology}</strong></p>
                <p className="description">{party.description}</p>
              </div>
            </div>
          </section>

          <section className="campaigns">
            <h2><strong className='kamp'>Politikai Kampányok</strong></h2>
            <p className='pp'>{party.political_campaign_description}</p>
          </section>
        </div>
      ) : (
        <div className="loading-message">Betöltés...</div>
      )}
    </div>
  );
};

export default PartyDetails;
