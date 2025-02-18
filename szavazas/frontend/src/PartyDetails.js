import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PartyDetails.css';

const PartyDetails = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPartyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/parties/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch party details');
        }
        const data = await response.json();
        setParty(data);
      } catch (error) {
        console.error('Error fetching party details:', error);
        setError('Failed to load party details');
      }
    };

    fetchPartyDetails();
  }, [id]);

  if (error) {
    return <div className="error-message">Uh-oh! Something went wrong.</div>;
  }

  return (
    <div className="page-container">
      {party ? (
        <div className="card-container">
          <header className="header-section">
            <h1 className="party-name">{party.name} Politikai Profilja</h1>
          </header>

          <section className="profile">
            <div className="profile-header">
              <div className="profile-image">
                <img 
                  src={`/images/partieslogo/${party.photo}`} 
                  alt={party.name} 
                  className="party-logo"
                />
              </div>
              <div className="profile-info">
                <h2>{party.name}</h2>
                <p className="position">Politikai irányzat: <strong>{party.political_ideology}</strong></p>
                <p className="specialization">Szakterület: <strong>{party.political_campaigns}</strong></p>
                <p className="description">{party.description}</p>
              </div>
            </div>
          </section>

          <section className="timeline">
            <h2>Politikai Évek</h2>
            <ul>
              <li><span className="year">{party.political_years}</span> éve a politikában</li>
              <li>{party.political_year_description}</li>
            </ul>
          </section>

          <section className="campaigns">
            <h2>Politikai Kampányok</h2>
            <p>{party.political_campaign_description}</p>
          </section>

        </div>
      ) : (
        <div className="loading-message">Loading...</div>
      )}
    </div>
  );
};

export default PartyDetails;
