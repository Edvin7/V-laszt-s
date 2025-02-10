import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [parties, setParties] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingVote, setEditingVote] = useState(null);
  const [newParty, setNewParty] = useState({ name: '', description: '' });
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

  // Add a new party
  const addParty = async () => {
    if (!newParty.name || !newParty.description) {
      setError('A párt neve és leírása kötelező.');
      return;
    }

    try {
      const response = await axios.post('/api/parties', newParty);
      console.log('Párt hozzáadva:', response.data);
      setNewParty({ name: '', description: '' });
      setError('');
      fetchParties(); // Refresh parties list
    } catch (error) {
      console.error('Error adding party:', error);
      setError('Hiba történt a párt hozzáadásakor.');
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
      setEditingUser(null);
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
      setEditingVote(null);
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

  // Handle change for editing user
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle change for editing vote
  const handleVoteChange = (e) => {
    const { name, value } = e.target;
    setEditingVote((prev) => ({ ...prev, [name]: value }));
  };

  // Handle change for new party
  const handlePartyChange = (e) => {
    const { name, value } = e.target;
    setNewParty((prev) => ({ ...prev, [name]: value }));
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
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', backgroundColor: '#2c3e50', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2>Admin Panel</h2>
        <div onClick={() => setActiveTab('users')} style={{ padding: '10px', cursor: 'pointer', marginBottom: '10px' }}>
          Users
        </div>
        <div onClick={() => setActiveTab('votes')} style={{ padding: '10px', cursor: 'pointer', marginBottom: '10px' }}>
          Votes
        </div>
        <div onClick={() => setActiveTab('parties')} style={{ padding: '10px', cursor: 'pointer', marginBottom: '10px' }}>
          Parties
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '20px' }}>
        {activeTab === 'users' && (
          <div>
            <h3>Users</h3>
            <table border="1" width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Personal ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id_number}>
                    <td>{editingUser?.id === user.id_number ? <input type="text" name="name" value={editingUser.name} onChange={handleEditChange} /> : user.name}</td>
                    <td>{editingUser?.id === user.id_number ? <input type="email" name="email" value={editingUser.email} onChange={handleEditChange} /> : user.email}</td>
                    <td>{editingUser?.id === user.id_number ? <input type="text" name="personal_id" value={editingUser.personal_id} onChange={handleEditChange} /> : user.personal_id}</td>
                    <td>{editingUser?.id === user.id_number ? <select name="status" value={editingUser.status} onChange={handleEditChange}><option value="active">Active</option><option value="inactive">Inactive</option></select> : user.status}</td>
                    <td>
                      {editingUser?.id === user.id_number ? (
                        <button onClick={() => updateUser(user.id_number)}>Save</button>
                      ) : (
                        <button onClick={() => deleteUser(user.id_number)}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'votes' && (
          <div>
            <h3>Votes</h3>
            <table border="1" width="100%">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Vote Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {votes.map((vote) => (
                  <tr key={vote.id}>
                    <td>{editingVote?.id === vote.id ? <input type="text" name="candidate" value={editingVote.candidate} onChange={handleVoteChange} /> : vote.candidate}</td>
                    <td>{editingVote?.id === vote.id ? <input type="number" name="vote_count" value={editingVote.vote_count} onChange={handleVoteChange} /> : vote.vote_count}</td>
                    <td>
                      {editingVote?.id === vote.id ? (
                        <button onClick={() => updateVote(vote.id)}>Save</button>
                      ) : (
                        <>
                          <button onClick={() => setEditingVote({ ...vote })}>Edit</button>
                          <button onClick={() => deleteVote(vote.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'parties' && (
          <div>
            <h3>Parties</h3>
            <input
              type="text"
              name="name"
              value={newParty.name}
              onChange={handlePartyChange}
              placeholder="Party Name"
            />
            <textarea
              name="description"
              value={newParty.description}
              onChange={handlePartyChange}
              placeholder="Party Description"
            />
            <button onClick={addParty}>Add Party</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table border="1" width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {parties.map((party) => (
                  <tr key={party.party_id}>
                    <td>{party.name}</td>
                    <td>{party.description}</td>
                    <td>
                      <button onClick={() => {/* Add logic to delete party */}}>Delete</button>
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
