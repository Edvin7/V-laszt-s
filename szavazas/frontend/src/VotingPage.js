import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importálás
import './VotingPage.css';
import emailjs from 'emailjs-com';  // Importáljuk az EmailJS könyvtárat


const VotingPage = () => {
  const [selectedParty, setSelectedParty] = useState(null); 
  const [parties, setParties] = useState([]); 
  const [statusMessage, setStatusMessage] = useState('');  // Üzenet szövege
  const [statusType, setStatusType] = useState('');  // Hiba vagy siker típusa
  const [isMessageVisible, setIsMessageVisible] = useState(true); // Az üzenet láthatóságának kezelése
  const navigate = useNavigate(); // Navigációs hook

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
        setStatusMessage('Hiba történt a pártok betöltésekor.');
        setStatusType('error');
      });
  }, []);

  // Párt kiválasztása
  const handleVote = (party) => {
    setSelectedParty(party); 
  };

  const generateVoteHash = () => {
    return Math.random().toString(36).substring(2); // Egyszerű véletlenszerű hash generálása
  };

  const handleSubmit = () => {
    if (selectedParty) {
      // Lekérjük a user objektumot a localStorage-ból
      const user = JSON.parse(localStorage.getItem('user')); // A 'user' kulcs alatt
      const userId = user ? user.id : null; // Az ID mező hozzáférése
  
      // Ellenőrizzük, hogy van-e userId
      if (!userId) {
        setStatusMessage('A felhasználói ID nem található!');
        setStatusType('error');
        setIsMessageVisible(true);
        return;
      }
  
      const voteData = {
        election_id: 1, // Ha több választás van, ennek változnia kell
        party_id: selectedParty.party_id,
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
          setStatusMessage(data.message); // Visszajelzés a felhasználónak
          setStatusType('success');
          setIsMessageVisible(true);
          setTimeout(() => setIsMessageVisible(false), 3000); // Az üzenet eltűnik 3 másodperc múlva
          
          // Email küldése a szavazat sikerességéről - helyesen hívva!
          sendConfirmationEmail(user.email, user.name, selectedParty.name); 
        
          // Navigálás a statisztika oldalra
          navigate('/'); // Átirányítás a statisztika oldalra
        })
        .catch((error) => {
          console.error('Hiba történt a szavazat leadásakor:', error);
          setStatusMessage('Ön már szavazott!');
          setStatusType('error');
          setIsMessageVisible(true);
          setTimeout(() => setIsMessageVisible(false), 3000);
        });
    } else {
      setStatusMessage('Kérjük, válasszon egy pártot!');
      setStatusType('error');
      setIsMessageVisible(true);
      setTimeout(() => setIsMessageVisible(false), 3000);
    }
  };

 // Email küldése EmailJS-sel
 const sendConfirmationEmail = (userEmail, userName, partyName) => {
  emailjs.send(
    'service_3smt6kr', 
    'template_9b68uwi', 
    {
      to_email: userEmail,           
      name: userName,                
      party: partyName,            
      time: new Date().toLocaleString(), 
      message: `Köszönjük, hogy szavazott a(z) ${partyName} pártra!`, 
    },
    'e23gZwKPhdYed1RRP' 
  )
  .then((result) => {
    console.log('Email sikeresen elküldve:', result.text);
  })
  .catch((error) => {
    console.error('Hiba az email küldésekor:', error.text);
  });
};

  return (
    <div className="ballot-wrapper">
      <div className="ballot-container">
        <h1>Szavazólap</h1>
        <div className="parties">
          {parties.map((party) => (
            <div
              key={party.party_id} 
              className="party"
              onClick={() => handleVote(party)} 
            >
              <img
                src={`http://localhost:3000/uploads/${party.photo}`} 
                alt={`${party.name} logo`}
                className="party-logo"
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

      {statusMessage && isMessageVisible && (
        <div className={`status-message ${statusType}`}>
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default VotingPage;
