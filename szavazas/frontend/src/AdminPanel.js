import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from './BackButton';
import './AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [parties, setParties] = useState([]);
  const [newParty, setNewParty] = useState({ name: '', description: '', photo: '' });
  const [error, setError] = useState('');
  const [newCountdownDate, setNewCountdownDate] = useState('');
  const [countdownDate, setCountdownDate] = useState(null);

  // FETCH FUNCTIONS
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
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

  // ACTIONS
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteParty = async (id) => {
    try {
      await axios.delete(`/api/parties/${id}`);
      fetchParties();
    } catch (error) {
      console.error(error);
    }
  };

  const addParty = async () => {
    if (!newParty.name || !newParty.description) {
      setError('A párt neve és leírása kötelező.');
      return;
    }

    try {
      await axios.post('/api/parties', newParty);
      setNewParty({ name: '', description: '', photo: '' });
      setError('');
      fetchParties();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      axios.post('http://localhost:5000/api/upload', formData)
        .then(response => setNewParty({ ...newParty, photo: response.data.filePath }))
        .catch(error => console.error(error));
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
      } else {
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetCountdown = async () => {
    try {
      const response = await fetch('/api/reset-countdown', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      if (response.ok) alert('Időzítő lenullázva!');
    } catch (error) {
      console.error(error);
    }
  };

  const resetAll = async () => {
    if (!window.confirm('Biztosan törölni szeretnéd az összes szavazatot és nullázni az időzítőt?')) return;
    try {
      const response = await fetch('/api/reset-all', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      if (response.ok) alert('Időzítő nullázva és szavazatok törölve!');
    } catch (error) {
      console.error(error);
    }
  };

  // INIT FETCH
  useEffect(() => {
    fetchUsers();
    fetchVotes();
    fetchParties();
    fetchCountdownDate();
  }, []);

  return (
    <div className="admin-panel-container">
      <BackButton />

      <div className="section">
        <h2>Felhasználók</h2>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Név</th>
                <th>Email</th>
                <th>Személyi ID</th>
                <th>Státusz</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id_number}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.personal_id}</td>
                  <td>{user.status}</td>
                  <td><button className="delete-button" onClick={() => deleteUser(user.id_number)}>Törlés</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <h2>Időzítő beállítás</h2>
        <div className="input-group">
          <input type="datetime-local" value={newCountdownDate} onChange={(e) => setNewCountdownDate(e.target.value)} />
        </div>
        <div className="button-group">
          <button onClick={updateCountdownDate}>Indítás</button>
          <button onClick={resetCountdown}>Leállítás</button>
          <button onClick={resetAll}>Mind törlés + időzítő nullázás</button>
        </div>
      </div>

      <div className="section">
        <h2>Pártok</h2>
        <div className="input-group">
          <input type="text" placeholder="Párt neve" value={newParty.name} onChange={(e) => setNewParty({ ...newParty, name: e.target.value })} />
          <textarea placeholder="Leírás" value={newParty.description} onChange={(e) => setNewParty({ ...newParty, description: e.target.value })}></textarea>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="button-group">
          <button onClick={addParty}>Hozzáadás</button>
        </div>
        {error && <p className="error-message">{error}</p>}

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Név</th>
                <th>Leírás</th>
                <th>Kép</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {parties.map(party => (
                <tr key={party.id}>
                  <td>{party.name}</td>
                  <td>{party.description}</td>
                  <td><img src={party.photo} alt="party" className="party-image" /></td>
                  <td><button className="delete-button" onClick={() => deleteParty(party.id)}>Törlés</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
