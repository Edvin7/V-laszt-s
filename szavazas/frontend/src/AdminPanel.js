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

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchVotes = async () => {
    try {
      const response = await axios.get('/api/votes');
      setVotes(response.data);
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  };

  const fetchParties = async () => {
    try {
      const response = await axios.get('/api/parties');
      setParties(response.data);
    } catch (error) {
      console.error('Error fetching parties:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchVotes();
    fetchParties();
  }, []);

  const handleDateChange = (e) => {
    setNewCountdownDate(e.target.value);
  };

  const updateCountdownDate = () => {
    console.log('Időzítő beállítása:', newCountdownDate);
  };

  const resetCountdown = () => {
    console.log('Időzítő leállítása');
  };

  const resetAll = () => {
    console.log('Minden adat resetelése');
  };

  const handleFileChange = (e) => {
    setNewParty({ ...newParty, photo: e.target.files[0] });
  };

  const addParty = () => {
    if (!newParty.name || !newParty.description) {
      setError('A pártnak rendelkeznie kell névvel és leírással.');
      return;
    }
    console.log('Párt hozzáadása:', newParty);
  };

  const deleteUser = (id) => {
    console.log(`Törlésre kerül a felhasználó: ${id}`);
  };

  const deleteParty = (id) => {
    console.log(`Törlésre kerül a párt: ${id}`);
  };

  return (
    <div className="admin-panel-container">
      <BackButton />
      
      {/* Felhasználók kezelése */}
      <div className="section">
        <h2>Felhasználók kezelése</h2>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr className='trr'>
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
                  <td>
                    <button className="delete-button" onClick={() => deleteUser(user.id_number)}>
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Időzítő beállítása */}
      <div className="section">
        <h2>Választási dátum beállítása</h2>
        <div className="admin-controls">
          <input
            type="datetime-local"
            value={newCountdownDate}
            onChange={handleDateChange}
            className="date-input"
          />
          <div className="button-group">
            <button className="action-button" onClick={updateCountdownDate}>
              Indítás
            </button>
            <button className="action-button" onClick={resetCountdown}>
              Leállítás
            </button>
            <button className="action-button" onClick={resetAll}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Pártok kezelése */}
      <div className="section">
        <h2>Pártok kezelése</h2>
        <div className="party-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Párt neve"
              value={newParty.name}
              onChange={e => setNewParty({ ...newParty, name: e.target.value })}
            />
          </div>
          <div className="input-group">
            <textarea
              placeholder="Párt leírása"
              value={newParty.description}
              onChange={e => setNewParty({ ...newParty, description: e.target.value })}
            />
          </div>
          <div className="input-group">
            <input type="file" onChange={handleFileChange} />
          </div>
          <button onClick={addParty} className="action-button">
            Hozzáadás
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Párt neve</th>
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
                  <td>
                    {party.photo && (
                      <img
                        src={`http://localhost:5000/uploads/${party.photo}`}
                        alt="party"
                        className="party-image"
                      />
                    )}
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => deleteParty(party.id)}>
                      Törlés
                    </button>
                  </td>
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
