const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

// Létrehozzuk az Express alkalmazást
const app = express();

// CORS engedélyezése, hogy a frontend kommunikálhasson a backenddel
app.use(cors());

// Middleware a JSON adatok feldolgozásához
app.use(express.json()); // Ez biztosítja, hogy a backend olvassa a JSON adatokat

// Kapcsolódás az adatbázishoz
const db = mysql.createConnection({
  host: 'localhost',     // Az adatbázis szerver címének megadása
  user: 'root',          // Az adatbázis felhasználója
  password: '',          // Az adatbázis jelszava (ha van)
  database: 'votedatabase', // Az adatbázis neve
});

// Kapcsolódás ellenőrzése
db.connect((err) => {
  if (err) {
    console.log('Hiba az adatbázishoz való kapcsolódás során:', err);
  } else {
    console.log('Sikeres kapcsolódás az adatbázishoz!');
  }
});

// Regisztrációs végpont
app.post('/register', (req, res) => {
  console.log('Received data:', req.body); // Kiírjuk a beérkező adatokat a konzolra

  // Az érkező adatok kinyerése
  const { name, email, pass, personal_id } = req.body;

  // Ellenőrizzük, hogy minden mező ki van-e töltve
  if (!name || !email || !pass || !personal_id) {
    return res.status(400).json({ message: 'Minden mező kitöltése szükséges!' });
  }

  // SQL lekérdezés, hogy új felhasználót szúrjunk be az adatbázisba
  const sqlQuery = 'INSERT INTO users_db (name, email, pass, personal_id) VALUES (?, ?, ?, ?)';
  
  // Lekérdezés futtatása az adatbázisban
  db.query(sqlQuery, [name, email, pass, personal_id], (err, result) => {
    if (err) {
      console.log(err); // Hibák naplózása
      return res.status(500).json({ message: 'Hiba történt a regisztráció során.' });
    }
    res.status(201).json({ message: 'Sikeres regisztráció!' }); // Válasz visszaküldése a frontendnek
  });
});

// Szerver indítása a 5000-es porton
app.listen(5000, () => {
  console.log('A szerver fut a 5000-es porton');
});
