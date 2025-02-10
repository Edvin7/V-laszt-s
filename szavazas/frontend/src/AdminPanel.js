import React, { useState } from 'react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '200px',
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2>Admin Panel</h2>
        <div
          onClick={() => setActiveTab('users')}
          style={{ padding: '10px', cursor: 'pointer', marginBottom: '10px' }}
        >
          Users
        </div>
        <div
          onClick={() => setActiveTab('votes')}
          style={{ padding: '10px', cursor: 'pointer', marginBottom: '10px' }}
        >
          Votes
        </div>
        <div
          onClick={() => setActiveTab('content')}
          style={{ padding: '10px', cursor: 'pointer', marginBottom: '10px' }}
        >
          Content
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '20px' }}>
        {activeTab === 'users' && (
          <div>
            <h3>Users</h3>
            <p>Manage users here...</p>
          </div>
        )}
        {activeTab === 'votes' && (
          <div>
            <h3>Votes</h3>
            <p>Manage votes here...</p>
          </div>
        )}
        {activeTab === 'content' && (
          <div>
            <h3>Content</h3>
            <p>Manage content here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
