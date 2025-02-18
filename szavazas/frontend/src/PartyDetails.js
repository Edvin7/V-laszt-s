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
    return <div className="error-blip">Uh-oh! Something went wrong.</div>;
  }

  return (
    <div className="party-blast-container">
      {party ? (
        <div className="party-details-pod">
          <div className="party-header-section">
            <h1 className="party-title-explosion">{party.name}</h1>
            <div className="party-icon-frame">
              <img
                src={`/images/partieslogo/${party.photo}`}
                alt={party.name}
                className="party-main-logo"
              />
            </div>
          </div>
          
          <div className="party-facts-container">
            <p><strong>Description:</strong> {party.description}</p>
            <p><strong>Ideology:</strong> {party.political_ideology}</p>
            <p><strong>Years in Politics:</strong> {party.political_years}</p>
            <p><strong>Campaigns:</strong> {party.political_campaigns}</p>
            <p><strong>Campaign Description:</strong> {party.political_campaign_description}</p>
            <p><strong>Year Description:</strong> {party.political_year_description}</p>
          </div>
        </div>
      ) : (
        <div className="spinner-load">Loading...</div>
      )}
    </div>
  );
};

export default PartyDetails;
