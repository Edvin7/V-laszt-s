const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL adatbázis kapcsolat
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Az adatbázis felhasználóneved
    password: '', // Az adatbázis jelszavad
    database: 'votes' // Az adatbázis neve
});

// Adatbázis kapcsolat ellenőrzése
db.connect(err => {
    if (err) {
        console.error('Hiba az adatbázishoz való csatlakozáskor:', err);
        return;
    }
    console.log('Csatlakozás a MySQL adatbázishoz sikeres!');
});

// Regisztráció végpont
app.post('/register', async (req, res) => {
    const { name, email, password, personal_id } = req.body;

    try {
        // Ellenőrzés: van-e már ilyen email vagy személyi azonosító
        const [existingUsers] = await db.promise().query(
            `SELECT * FROM users WHERE email = ? OR personal_id = ?`,
            [email, personal_id]
        );

        if (existingUsers.length > 0) {
            return res.status(400).send({ message: 'Ez az email vagy személyi azonosító már létezik.' });
        }

        // Jelszó titkosítása
        const hashedPassword = await bcrypt.hash(password, 10);

        // Új felhasználó mentése
        await db.promise().query(
            `INSERT INTO users (name, email, password, personal_id) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, personal_id]
        );

        res.status(201).send({ message: 'Sikeres regisztráció!' });
    } catch (error) {
        console.error('Hiba történt:', error);
        res.status(500).send({ message: 'Szerverhiba. Próbáld újra később!' });
    }
});

// Szerver indítása
app.listen(port, () => {
    console.log(`Szerver fut a ${port} porton`);
});
