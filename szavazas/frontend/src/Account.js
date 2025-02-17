import React, { useState, useEffect } from 'react';
import './Account.css';

const Account = () => {
  const [userInfo, setUserInfo] = useState(null); // Kezdetben null, mert a felhasználókat lekérdezzük a backendről
  const [profilePic, setProfilePic] = useState(null);

  // Jelszó változtatás állapotai
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Adatok lekérése a backendről (API hívás)
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => {
        // Például az első felhasználót tároljuk a userInfo állapotban
        setUserInfo(data[0]);
      })
      .catch((error) => console.error('Hiba történt a felhasználók lekérésekor:', error));
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>; // Ha még nem töltődtek be az adatok, mutassunk egy betöltés állapotot
  }

  // Jelszó változtatás kezelése (API hívás)
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("A két jelszó nem egyezik.");
    } else {
      setPasswordError("");
      
      // API hívás a jelszó módosításához
      fetch(`http://localhost:5000/api/users/${userInfo.id_number}/change-password`, {
        method: 'PUT', // PUT, mert a meglévő adatokat módosítjuk
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }), // Új jelszó
      })
        .then((response) => {
          if (response.ok) {
            alert('A jelszó sikeresen megváltozott!');
          } else {
            alert('Hiba történt a jelszó változtatásakor.');
          }
        })
        .catch((error) => {
          console.error('Hiba történt:', error);
          alert('Hiba történt a jelszó változtatásakor.');
        });
    }
  };

  return (
    <div className="account-container">
      <h1>Fiók információ</h1>

      {/* Profilkép szekció */}
      <div className="profile-pic-section">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePic(URL.createObjectURL(e.target.files[0]))}
          className="file-input"
        />
      </div>

      {/* Felhasználói információk */}
      <div className="user-info">
        <p><strong>Neved:</strong> {userInfo.name}</p>
        <p><strong>Email cím:</strong> {userInfo.email}</p>
        <p><strong>Személyi igazolvány szám:</strong> {userInfo.personal_id}</p>
        <p><strong>Regisztráció dátuma:</strong> {userInfo.registered_at}</p>
        <p><strong>Státusz:</strong> {userInfo.status}</p>
      </div>

      {/* Jelszó változtatás */}
      <div className="password-change-section">
        <h2>Jelszó változtatás</h2>
        <div className="input-group">
          <div className="password-input-container">
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              id="new-password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="Írj be új jelszót"
            />
            <span 
              className="eye-icon" 
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        </div>
        <div className="input-group">
          <div className="password-input-container">
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              id="confirm-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Írd be újra a jelszót"
            />
            <span 
              className="eye-icon" 
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        </div>
        {passwordError && <p className="error">{passwordError}</p>}
        <button className="change-password-btn" onClick={handlePasswordChange}>Jelszó változtatás</button>
      </div>
    </div>
  );
};

export default Account;
