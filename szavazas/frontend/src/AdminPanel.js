import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
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

  // Handle change for editing user
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
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
                    <td>
                      {editingUser?.id === user.id_number ? (
                        <input
                          type="text"
                          name="name"
                          value={editingUser.name}
                          onChange={handleEditChange}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>
                      {editingUser?.id === user.id_number ? (
                        <input
                          type="email"
                          name="email"
                          value={editingUser.email}
                          onChange={handleEditChange}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingUser?.id === user.id_number ? (
                        <input
                          type="text"
                          name="personal_id"
                          value={editingUser.personal_id}
                          onChange={handleEditChange}
                        />
                      ) : (
                        user.personal_id
                      )}
                    </td>
                    <td>
                      {editingUser?.id === user.id_number ? (
                        <select
                          name="status"
                          value={editingUser.status}
                          onChange={handleEditChange}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      ) : (
                        user.status
                      )}
                    </td>
                    <td>
                      {editingUser?.id === user.id_number ? (
                        <button onClick={() => updateUser(user.id_number)}>Save</button>
                      ) : (
                        <>
                          <button onClick={() => setEditingUser({ ...user })}>Edit</button>
                          <button onClick={() => deleteUser(user.id_number)}>Delete</button>
                        </>
                      )}
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
