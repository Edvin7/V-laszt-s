import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from './BackButton';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [votes, setVotes] = useState([]); 
  const [parties, setParties] = useState([]); 
  const [editingUser, setEditingUser] = useState(null);
  const [editingVote, setEditingVote] = useState(null); 
  const [newParty, setNewParty] = useState({ name: '', description: '', photo: '' });
  const [error, setError] = useState('');

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch votes from API
  const fetchVotes = async () => {
    try {
      const response = await axios.get('/api/votes');
      setVotes(response.data);
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  };

  // Fetch parties from API
  const fetchParties = async () => {
    try {
      const response = await axios.get('/api/parties');
      setParties(response.data);
    } catch (error) {
      console.error('Error fetching parties:', error);
    }
  };

  // Update user info
  const updateUser = async (id) => {
    try {
      const updatedUser = {
        name: editingUser.name,
        email: editingUser.email,
        personal_id: editingUser.personal_id,
        status: editingUser.status,
      };
      await axios.put(`/api/users/${id}`, updatedUser);
      setEditingUser(null); // Reset edit state
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Update vote info
  const updateVote = async (id) => {
    try {
      const updatedVote = {
        candidate: editingVote.candidate,
        vote_count: editingVote.vote_count,
      };
      await axios.put(`/api/votes/${id}`, updatedVote);
      setEditingVote(null); // Reset edit state
      fetchVotes(); // Refresh votes list
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  };

  // Delete vote
  const deleteVote = async (id) => {
    try {
      await axios.delete(`/api/votes/${id}`);
      fetchVotes(); // Refresh votes list
    } catch (error) {
      console.error('Error deleting vote:', error);
    }
  };

  // Add new party
  const addParty = async () => {
    if (!newParty.name || !newParty.description) {
      setError('A párt neve és leírása kötelező.');
      return;
    }

    try {
      await axios.post('/api/parties', newParty);
      setNewParty({ name: '', description: '', photo: '' });
      setError('');
      fetchParties(); // Refresh parties list
    } catch (error) {
      console.error('Error adding party:', error);
    }
  };

  // Delete party
  const deleteParty = async (id) => {
    try {
      await axios.delete(`/api/parties/${id}`);
      fetchParties(); // Refresh parties list
    } catch (error) {
      console.error('Error deleting party:', error);
    }
  };

  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
  
      axios.post('http://localhost:5000/api/upload', formData)
        .then(response => {
          // A válaszban kapott elérési utat tároljuk a party adatban
          setNewParty({ ...newParty, photo: response.data.filePath });
        })
        .catch(error => {
          console.error('Kép feltöltése nem sikerült', error);
        });
    }
  };
  
  
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'votes') {
      fetchVotes();
    } else if (activeTab === 'parties') {
      fetchParties();
    }
  }, [activeTab]);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <BackButton/>
      {/* Sidebar */}
      <div style={{ 
        width: '200px', 
        backgroundColor: '#033473', 
        color: 'white', 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: '10px 0 0 10px', 
        height: '100vh',
        fontWeight: 'bold',
      }}>
        <div
          onClick={() => setActiveTab('users')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            marginBottom: '10px',
            backgroundColor: activeTab === 'users' ? 'white' : 'transparent',
            color: activeTab === 'users' ? '#033473' : 'white',
            borderRadius: '5px',
          }}
        >
          Felhasználók
        </div>
        <div
          onClick={() => setActiveTab('votes')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            marginBottom: '10px',
            backgroundColor: activeTab === 'votes' ? 'white' : 'transparent',
            color: activeTab === 'votes' ? '#033473' : 'white',
            borderRadius: '5px',
          }}
        >
          Időzítő
        </div>
        <div
          onClick={() => setActiveTab('parties')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'parties' ? 'white' : 'transparent',
            color: activeTab === 'parties' ? '#033473' : 'white', 
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          Pártok
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '20px' }}>
        {activeTab === 'users' && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgb(3, 52, 115)', color: 'white' }}>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Név</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Személyi ID</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Státusz</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id_number} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{user.name}</td>
                    <td style={{ padding: '10px' }}>{user.email}</td>
                    <td style={{ padding: '10px' }}>{user.personal_id}</td>
                    <td style={{ padding: '10px' }}>{user.status}</td>
                    <td style={{ padding: '10px' }}>
                      <button
                        onClick={() => deleteUser(user.id_number)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Törlés
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'votes' && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgb(3, 52, 115)', color:'white' }}>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Óra</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Perc</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {votes.map((vote) => (
                  <tr key={vote.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{vote.hour}</td>
                    <td style={{ padding: '10px' }}>{vote.minute}</td>
                    <td style={{ padding: '10px' }}>
                      <button
                        onClick={() => deleteVote(vote.id)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Törlés
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'parties' && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h3>Új párt hozzáadása</h3>
            <div>
              <input
                type="text"
                placeholder="Párt neve"
                value={newParty.name}
                onChange={(e) => setNewParty({ ...newParty, name: e.target.value })}
                style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
              />
            </div>
            <div>
              <textarea
                placeholder="Párt leírása"
                value={newParty.description}
                onChange={(e) => setNewParty({ ...newParty, description: e.target.value })}
                style={{ padding: '8px', marginBottom: '10px', width: '100%', height: '100px' }}
              />
            </div>
            <div>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ marginBottom: '10px'}}
              />
            </div>
            <button
              onClick={addParty}
              style={{
                padding: '8px 16px',
                backgroundColor: '#033473',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginBlock:'15px'
              }}
            >
              Hozzáadás
            </button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

    
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgb(3, 52, 115)', color: 'white' }}>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Párt neve</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Leírás</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Kép</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {parties.map((party) => (
                  <tr key={party.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{party.name}</td>
                    <td style={{ padding: '10px' }}>{party.description}</td>
                    <td style={{ padding: '10px' }}>
                      {party.photo && (
                        <img src={party.photo} alt={party.name} style={{ width: '100px', height: 'auto' }} />
                      )}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <button
                        onClick={() => deleteParty(party.id)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Törlés
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;