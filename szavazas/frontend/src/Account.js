import React, { useState, useEffect } from 'react';
import './Account.css';

const Account = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    // Lekérjük a localStorage-ból a bejelentkezett felhasználót
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Lekért felhasználó:', user); // Debug üzenet
    if (user) {
      setUserInfo(user);  // Ha van bejelentkezett felhasználó, akkor beállítjuk az állapotot
    } else {
      console.log('Nincs bejelentkezett felhasználó');  // Ha nincs bejelentkezett felhasználó
    }
  }, []);

  if (!userInfo) {
    return <div className="loading">Loading...</div>;  // Ha nincs felhasználó, betöltési üzenet jelenik meg
  }

  const handlePasswordChange = () => {
    if (!userInfo || !userInfo.id) {  // Az id_number helyett az id kell
      alert('Nincs bejelentkezett felhasználó!');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setPasswordError("A két jelszó nem egyezik.");
      return;
    }
    setPasswordError("");
  
    // Itt az id helyett az id_number kell, mert a backend az id_number-t várja
    fetch(`http://localhost:5000/api/users/${userInfo.id}/change-password`, {  // Az id_number helyett id
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'A jelszó sikeresen megváltozott.') {
          alert('A jelszó sikeresen megváltozott!');
        } else {
          alert('Hiba történt a jelszó változtatásakor: ' + data.message);
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
        <h2 className="account-header">Fiók <span style={{ color: '#033473' }}>információk</span></h2>
        <div className="line-above"></div>
        <p className="account-subheader">
          Itt láthatja fiókja adatait, illetve módosíthatja a jelszavát.
        </p>

        {/* Felhasználói információk */}
        <div className="user-info">
          <p><strong>Neved:</strong> {userInfo.name}</p>
          <p><strong>Email cím:</strong> {userInfo.email}</p>
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
