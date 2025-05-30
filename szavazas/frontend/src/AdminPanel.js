import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [parties, setParties] = useState([]);
  const [newParty, setNewParty] = useState({
    name: '',
    description: '',
    photo: '',
    political_ideology: '',
    political_campaign_description: '',
    political_year_description: '',
  });
  const [error, setError] = useState('');
  const [newCountdownDate, setNewCountdownDate] = useState('');
  const [countdownDate, setCountdownDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for the success notification
  const [statusMessage, setStatusMessage] = useState(''); // State for status notification
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      
      // Ellenőrizzük, hogy a válasz valóban tartalmaz-e adatokat
      if (Array.isArray(response.data)) {
        console.log('Felhasználók:', response.data);
        setUsers(response.data);
      } else {
        console.error('A válasz nem tömb formátumban érkezett:', response.data);
      }
    } catch (error) {
      if (error.response) {
        // Ha van válasz, akkor azt logoljuk
        console.error('Hiba a felhasználók lekérésekor:', error.response.data);
        console.error('Status kód:', error.response.status);
      } else if (error.request) {
        // Ha nem kaptunk választ a kérésre
        console.error('A kérés elküldve, de nem kaptunk választ:', error.request);
      } else {
        // Más hiba, pl. konfigurációs hiba
        console.error('Hiba történt:', error.message);
      }
    }
  };

  const fetchVotes = async () => {
    try {
      const response = await axios.get('/api/votes');
      setVotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchParties = async () => {
    try {
      const response = await axios.get('/api/parties');
      console.log('Pártok a szerverről:', response.data); // Konzolba írja az adatokat
      setParties(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCountdownDate = async () => {
    try {
      const response = await fetch('/api/countdown-date');
      const data = await response.json();
      setCountdownDate(new Date(data.countdownDate).getTime());
    } catch (error) {
      console.error(error);
    }
  };

  const addParty = async () => {
    if (!newParty.name || !newParty.description || !newParty.political_ideology || !newParty.political_campaign_description || !newParty.political_year_description || !newParty.photo) {
      return;
    }

    console.log('Adding party...');  // Debugging
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', newParty.name);
    formData.append('description', newParty.description);
    formData.append('political_ideology', newParty.political_ideology);
    formData.append('political_campaign_description', newParty.political_campaign_description);
    formData.append('political_year_description', newParty.political_year_description);
    formData.append('photo', newParty.photo);

    try {
      console.log('Sending request...');  // Debugging
      await axios.post('http://localhost:5000/api/parties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Clear input fields
      setNewParty({
        name: '',
        description: '',
        photo: '',
        political_ideology: '',
        political_campaign_description: '',
        political_year_description: '',
      });

      setError('');
      fetchParties(); // Refresh the party list
      console.log('Party added successfully');  // Debugging

      // Show success message
      setSuccessMessage('A párt sikeresen hozzáadva!');
      console.log('Success message set:', 'A párt sikeresen hozzáadva!');  // Debugging

      // Hide the message after 3 seconds
      setTimeout(() => {
        console.log('Hiding success message');  // Debugging
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error adding party:', error);  // Debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('name', newParty.name);
      formData.append('description', newParty.description);
      formData.append('political_ideology', newParty.political_ideology);
      formData.append('political_campaign_description', newParty.political_campaign_description);
      formData.append('political_year_description', newParty.political_year_description);

      axios.post('http://localhost:5000/api/parties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
        .then(response => {
          setNewParty({ ...newParty, photo: response.data.filePath });
        })
        .catch(error => {
          console.error('Error handling file change:', error);
        });
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd a felhasználót?')) return;

    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
      setStatusMessage('Felhasználó sikeresen törölve!');
      
      // Hide the status message after 3 seconds
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setStatusMessage(error.response.data.error);
      } else {
        setStatusMessage('A felhasználó már aktiválva van, ezért nem törölhető!');
        console.error(error);
      }
      
      // Hide the status message after 3 seconds
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
    }
  };

  const deleteParty = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt a pártot?')) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/parties/${id}`);
      fetchParties(); // Frissítjük a listát
      setStatusMessage('Párt sikeresen törölve!');
      
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
    } catch (error) {
      console.error('Hiba a törlésnél:', error);
      setStatusMessage('Hiba történt a párt törlése közben!');
      
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
    }
  };

  const updateCountdownDate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/date-plus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countdownDate: newCountdownDate }),
      });

      if (response.ok) {
        setCountdownDate(new Date(newCountdownDate).getTime());
        setStatusMessage('Időzítő sikeresen beállítva!');
        
        // Hide the status message after 3 seconds
        setTimeout(() => {
          setStatusMessage('');
        }, 3000);

      } else {
        const data = await response.json();
        console.error(data.error);
        setStatusMessage('Hiba történt az időzítő beállítása közben!');
        
        // Hide the status message after 3 seconds
        setTimeout(() => {
          setStatusMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating countdown date:', error);
      setStatusMessage('Hiba történt az időzítő frissítése közben!');
      
      // Hide the status message after 3 seconds
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
    }
  };

  const resetCountdown = async () => {
    try {
      const response = await fetch('/api/reset-countdown', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      if (response.ok) {
        setStatusMessage('Időzítő lenullázva!');
        
        // Hide the status message after 3 seconds
        setTimeout(() => {
          setStatusMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error resetting countdown:', error);
      setStatusMessage('Hiba történt az időzítő lenullázásakor!');
      
      // Hide the status message after 3 seconds
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
    }
  };

  const resetAll = async () => {
    if (!window.confirm('Biztosan törölni szeretnéd az összes szavazatot és nullázni az időzítőt?')) return;
    try {
      const response = await fetch('/api/reset-all', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      if (response.ok) {
        setStatusMessage('Időzítő nullázva és szavazatok törölve!');
        
        // Hide the status message after 3 seconds
        setTimeout(() => {
          setStatusMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error resetting all:', error);
      setStatusMessage('Hiba történt az összes adat törlése közben!');
      
      // Hide the status message after 3 seconds
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchVotes();
    fetchParties();
    fetchCountdownDate();
  }, []);

  return (
    <div className="xr12-panel-wrap">
      <div className="tg98-section">
        <h2>Felhasználók</h2>
        <div className="qw33-table-wrap">
          <table className="er09-table">
            <thead>
              <tr>
                <th>Név</th>
                <th>Email</th>
                <th>Személyi ID</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id_number}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.personal_id}</td>
                  <td><button className="btn-del" onClick={() => deleteUser(user.id_number)}>Törlés</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="tg98-section">
        <h2>Időzítő beállítás</h2>
        <div className="ip55-input-group">
          <input type="datetime-local" value={newCountdownDate} onChange={(e) => setNewCountdownDate(e.target.value)} />
        </div>
        <div className="bn44-btn-group">
          <button onClick={updateCountdownDate}>Indítás</button>
          <button onClick={resetCountdown}>Leállítás</button>
          <button onClick={resetAll}>Mind törlés + időzítő nullázás</button>
        </div>
      </div>

      <div className="tg98-section">
        <h2>Pártok</h2>
        <div className="ip55-input-group">
          <input type="text" placeholder="Párt neve" value={newParty.name} onChange={(e) => setNewParty({ ...newParty, name: e.target.value })} />
          <textarea placeholder="Leírás" value={newParty.description} onChange={(e) => setNewParty({ ...newParty, description: e.target.value })}></textarea>
          <input type="text" placeholder="Politikai ideológia" value={newParty.political_ideology} onChange={(e) => setNewParty({ ...newParty, political_ideology: e.target.value })} />
          <textarea placeholder="Politikai kampány leírása" value={newParty.political_campaign_description} onChange={(e) => setNewParty({ ...newParty, political_campaign_description: e.target.value })}></textarea>
          <textarea placeholder="Politikai év leírása" value={newParty.political_year_description} onChange={(e) => setNewParty({ ...newParty, political_year_description: e.target.value })}></textarea>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="bn44-btn-group">
          <button onClick={addParty} disabled={isSubmitting}>Hozzáadás</button>
        </div>
        {error && <p className="msg-error">{error}</p>}

        {successMessage && (
          <div className="success-notification">
            {successMessage}
          </div>
        )}

        <div className="qw33-table-wrap">
          <table className="er09-table">
            <thead>
              <tr>
                <th>Név</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {parties.map(party => (
                <tr key={party.id}>
                  <td>{party.name}</td>
                  <td><button className="btn-del" onClick={() => console.log(party) || deleteParty(party.party_id)}>Törlés</button></td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {statusMessage && (
        <div className={`status-message ${statusMessage.includes('sikeresen') ? 'success' : 'error'}`}>
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
