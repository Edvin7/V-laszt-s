import React, { useState, useEffect } from 'react';
import './Account.css';

const Account = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => {
        // Például az első felhasználót tároljuk a userInfo állapotban
        setUserInfo(data[0]);
      })
      .catch(error => console.error('Hiba történt a felhasználók lekérésekor:', error));
  }, []);

  if (!userInfo) {
    return <div className="loading">Loading...</div>;
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("A két jelszó nem egyezik.");
      return;
    }
    setPasswordError("");
    // API hívás a jelszó módosításához
    fetch(`http://localhost:5000/api/users/${userInfo.id_number}/change-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    })
      .then(response => {
        if (response.ok) {
          alert('A jelszó sikeresen megváltozott!');
        } else {
          alert('Hiba történt a jelszó változtatásakor.');
        }
      })
      .catch(error => {
        console.error('Hiba történt:', error);
        alert('Hiba történt a jelszó változtatásakor.');
      });
  };

  return (
    <div className="account-container">
      <div className="account-wrapper">
        <h2 className="account-header">Fiók   <span style={{ color: '#033473' }}>információk</span></h2>
        <div className="line-above"></div>
        <p className="account-subheader">
          Itt láthatja fiókja adatait, illetve módosíthatja a jelszavát.
        </p>


        {/* Felhasználói információk */}
        <div className="user-info">
          <p><strong>Neved:</strong> {userInfo.name}</p>
          <p><strong>Email cím:</strong> {userInfo.email}</p>
          <p><strong>Személyi igazolvány szám:</strong> {userInfo.personal_id}</p>
          <p><strong>Regisztráció dátuma:</strong> {userInfo.registered_at}</p>
        </div>

        {/* Jelszó változtatás */}
        <div className="password-change-section">
          <h2 className='psschange'>Jelszó változtatás</h2>
          <div className="input-group">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Új jelszó"
              className="account-input"
            />
          </div>
          <div className="input-group">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Jelszó megerősítése"
              className="account-input"
            />
          </div>
          <span className="toggle-password" onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? 'Elrejtés' : 'Megjelenítés'}
          </span>
          {passwordError && <p className="error">{passwordError}</p>}
          <button className="account-submit-btn" onClick={handlePasswordChange}>
            Jelszó változtatás
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Account;
