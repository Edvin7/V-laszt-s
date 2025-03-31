import React, { useState, useEffect } from 'react';
import './Account.css';

const Account = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');  // A jelenlegi jelszó változó
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState(''); // Állapot üzenet
  const [statusType, setStatusType] = useState(''); // Üzenet típusa (siker vagy hiba)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Lekért felhasználó:', user);
    if (user) {
      setUserInfo(user); 
    } else {
      console.log('Nincs bejelentkezett felhasználó'); 
    }
  }, []);

  if (!userInfo) {
    return <div className="loading">Loading...</div>; 
  }

  const handlePasswordChange = () => {
    if (!userInfo || !userInfo.id) { 
      setStatusMessage('Nincs bejelentkezett felhasználó!');
      setStatusType('error');
      return;
    }

    // Ellenőrizzük, hogy a két jelszó megegyezik
    if (newPassword !== confirmPassword) {
      setPasswordError("A két jelszó nem egyezik.");
      return;
    }
    setPasswordError("");

    // Az API kérés elküldése a backendnek a jelszóváltoztatáshoz
    fetch(`http://localhost:5000/api/users/${userInfo.id}/change-password`, {  
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword,  // A jelenlegi jelszó
        newPassword      // Az új jelszó
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'A jelszó sikeresen megváltozott.') {
          // Ha sikerült, töröljük a jelszavakat és értesítjük a felhasználót
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setStatusMessage('A jelszó sikeresen megváltozott!');
          setStatusType('success');
        } else {
          setStatusMessage('Hiba történt a jelszó változtatásakor: ' + data.message);
          setStatusType('error');
        }
      })
      .catch(error => {
        console.error('Hiba történt:', error);
        setStatusMessage('Hiba történt a jelszó változtatásakor.');
        setStatusType('error');
      });
  };

  return (
    <div className="account-container">
      <div className="account-wrapper">
        <h2 className="account-header">Fiók <span style={{ color: '#033473' }}>információk</span></h2>
        <div className="line-above"></div>
        <p className="account-subheader">
          Itt láthatja fiókja adatait, illetve módosíthatja a jelszavát.
        </p>

        <div className="user-info">
          <p><strong>Neve: </strong> {userInfo.name}</p>
          <p><strong>Email cím: </strong> {userInfo.email}</p>
        </div>

        <div className="password-change-section">
          <h2 className='psschange'>Jelszó változtatás</h2>
          
          {/* Jelenlegi jelszó mező */}
          <div className="input-group">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Jelenlegi jelszó"
              className="account-input"
            />
          </div>

          {/* Új jelszó mező */}
          <div className="input-group">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Új jelszó"
              className="account-input"
            />
          </div>

          {/* Jelszó megerősítés mező */}
          <div className="input-group">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Jelszó megerősítése"
              className="account-input"
            />
          </div>

          {/* Jelszó láthatóságának beállítása */}
          <span className="toggle-password" onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? 'Elrejtés' : 'Megjelenítés'}
          </span>

          {/* Hibaüzenet megjelenítése, ha a két jelszó nem egyezik */}
          {passwordError && <p className="error">{passwordError}</p>}

          {/* Jelszó változtatás gomb */}
          <button className="account-submit-btn" onClick={handlePasswordChange}>
            Jelszó változtatás
          </button>
        </div>

        {/* Státusz üzenet megjelenítése */}
        {statusMessage && (
          <div className={`status-message ${statusType}`}>
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
