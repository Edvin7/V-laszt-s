import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';  // Saját stílusok hozzáadása

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Menü bezárása, ha egy tab-ot választunk
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="admin-panel">
      {/* Hamburger menu */}
      <div className={`admin-nav ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className="nav-list">
          <li>
            <Link 
              to="#" 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => handleTabChange('dashboard')}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="#" 
              className={activeTab === 'users' ? 'active' : ''}
              onClick={() => handleTabChange('users')}
            >
              Users
            </Link>
          </li>
          <li>
            <Link 
              to="#" 
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => handleTabChange('settings')}
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <p>Welcome to the admin dashboard. Here you can view basic statistics and data.</p>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users">
            <h2>User Management</h2>
            <p>Here you can manage the users of the application.</p>
            <button className="add-user-btn">Add User</button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings">
            <h2>Settings</h2>
            <p>Configure application settings here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
