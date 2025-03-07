const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // A frontend URL-je
  credentials: true, // A hitelesítéshez szükséges cookie-k engedélyezése
}));
app.use(bodyParser.json()); // JSON kérések kezelése

// MySQL kapcsolat beállítása
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vote',
});

db.connect((err) => {
  if (err) {
    console.error('Hiba a MySQL kapcsolódás során:', err);
    return;
  }
  console.log('Sikeresen csatlakoztunk a MySQL adatbázishoz');
});
   
// Regisztrációs endpoint
app.post('/register', (req, res) => {
  const { name, email, pass, personal_id, agreeTerm } = req.body;

  // Ellenőrizzük, hogy minden mező megvan-e
  if (!name || !email || !pass || !personal_id || agreeTerm === undefined) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  // Ellenőrizzük, hogy a felhasználó létezik-e már
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, result) => {
    if (err) {
      console.error('Hiba a felhasználó ellenőrzésekor:', err);
      return res.status(500).json({ message: 'Belső hiba történt' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Ez az email már regisztrálva van' });
    }

    // Ha nem létezik, hozzáadjuk az új felhasználót az adatbázisba
    const insertQuery = `INSERT INTO users (name, email, password_hash, personal_id, agree_terms, status) 
                         VALUES (?, ?, ?, ?, ?, 'active')`;

    // A jelszót biztonságosan kell hash-elnünk (bcrypt használatával)
    bcrypt.hash(pass, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Hiba a jelszó hash-elésekor:', err);
        return res.status(500).json({ message: 'Belső hiba történt' });
      }

      db.query(insertQuery, [name, email, hashedPassword, personal_id, agreeTerm ? 1 : 0], (err, result) => {
        if (err) {
          console.error('Hiba a felhasználó hozzáadása közben:', err);
          return res.status(500).json({ message: 'Belső hiba történt' });
        }

        res.status(200).json({ message: 'Sikeres regisztráció!' });
      });
    });
  });
});

// Bejelentkezés végpont
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Először a users táblában keresünk
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Hiba történt a users lekérdezésekor:', err);
      return res.status(500).json({ message: 'Belső hiba történt!' });
    }

    if (results.length > 0) {
      // Ha talált felhasználót a users táblában
      const user = results[0];
      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err) {
          console.error('Hiba a jelszó ellenőrzésekor:', err);
          return res.status(500).json({ message: 'Belső hiba történt' });
        }

        if (!isMatch) {
          return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
        }

        return res.status(200).json({
          message: 'Sikeres bejelentkezés',
          user: {
            id: user.id_number,
            name: user.name,
            email: user.email,
            isAdmin: false, // users táblából jövő felhasználók nem adminok
          },
        });
      });
    } else {
      // Ha nem találtunk a users táblában, akkor megnézzük az admin táblát
      db.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
        if (err) {
          console.error('Hiba történt az admin lekérdezésekor:', err);
          return res.status(500).json({ message: 'Belső hiba történt!' });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
        }

        const admin = results[0];

        bcrypt.compare(password, admin.password_hash, (err, isMatch) => {
          if (err) {
            console.error('Hiba a jelszó ellenőrzésekor:', err);
            return res.status(500).json({ message: 'Belső hiba történt' });
          }

          if (!isMatch) {
            return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
          }

          return res.status(200).json({
            message: 'Sikeres bejelentkezés',
            user: {
              id: admin.admin_id,
              name: admin.name,
              email: admin.email,
              isAdmin: true, // admin tábla felhasználói adminok
            },
          });
        });
      });
    }
  });
});


// Bejelentkezett felhasználó ellenőrzése
app.get('/api/user', (req, res) => {
  if (req.session.user) {
    // Ha a session tartalmazza a felhasználó adatokat, akkor be van jelentkezve
    return res.status(200).json({ loggedIn: true, user: req.session.user });
  }
  // Ha nincs bejelentkezett felhasználó
  res.status(200).json({ loggedIn: false });
});

// Szavazat leadása
app.post('/voting', (req, res) => {
  const { election_id, party_id, vote_hash, user_id } = req.body;

  // Ellenőrizzük, hogy minden szükséges adatot megadtak-e
  if (!election_id || !party_id || !vote_hash || !user_id) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  // Először ellenőrizzük, hogy a felhasználó már leadott-e szavazatot a választáson
  const checkVoteQuery = 'SELECT * FROM votes WHERE election_id = ? AND user_id = ?';
  db.query(checkVoteQuery, [election_id, user_id], (err, result) => {
    if (err) {
      console.error('Hiba történt a szavazat ellenőrzésekor:', err);
      return res.status(500).json({ message: 'Hiba történt a szavazat ellenőrzésekor!' });
    }

    // Ha találunk már egy szavazatot a felhasználó számára, akkor nem engedjük meg újra a szavazást
    if (result.length > 0) {
      return res.status(400).json({ message: 'Már leadtad a szavazatot!' });
    }

    // Ha még nincs szavazat, akkor rögzítjük a szavazatot
    const query = 'INSERT INTO votes (election_id, party_id, vote_hash, user_id) VALUES (?, ?, ?, ?)';
    db.query(query, [election_id, party_id, vote_hash, user_id], (err, result) => {
      if (err) {
        console.error('Hiba történt a szavazat mentésekor:', err);
        return res.status(500).json({ message: 'Hiba történt a szavazat leadásakor!' });
      }

      // Visszaadjuk a sikeres válasz üzenetet
      res.status(200).json({ message: 'Sikeresen leadta a szavazatot!' });
    });
  });
});

// Új endpoint a pártok adatainak lekérésére
app.get('/parties', (req, res) => {
    const query = 'SELECT * FROM parties'; // A parties tábla adatainak lekérése
    db.query(query, (err, results) => {
      if (err) {
        console.error('Hiba történt a pártok lekérésekor:', err);
        return res.status(500).json({ message: 'Belső hiba történt' });
      }
  
      res.status(200).json(results); // Visszaadjuk a pártok adatait
    });
  });

  app.get('/api/parties', (req, res) => {
    const query = 'SELECT * FROM parties';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.json(results);  // Visszaadja a pártok adatait JSON-ban
    });
  });
 
  app.get('/voting', (req, res) => {
    const query = 'SELECT * FROM parties';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Hiba történt a pártok lekérésekor:', err);
        return res.status(500).json({ message: 'Belső hiba történt' });
      }
      res.json(results); // JSON válasz küldése
    });
  });
  
  // API végpont a számok lekéréséhez
app.get('/counters', (req, res) => {
  // Adatok lekérdezése az adatbázisból
  const queries = {
    parties: 'SELECT COUNT(*) AS partyCount FROM parties', // Pártok száma
    users: 'SELECT COUNT(*) AS userCount FROM users',   // Felhasználók száma
    votes: 'SELECT COUNT(*) AS voteCount FROM votes', // Leadott szavazatok
  };

  // Lekérdezzük mindhárom értéket egyszerre
  const results = {};

  db.query(queries.parties, (err, partyResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Hiba történt a pártok számának lekérésekor.' });
    }
    results.parties = partyResults[0].partyCount;

    db.query(queries.users, (err, userResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Hiba történt a felhasználók számának lekérésekor.' });
      }
      results.users = userResults[0].userCount;

      db.query(queries.votes, (err, voteResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Hiba történt a leadott szavazatok számának lekérésekor.' });
        }
        results.votes = voteResults[0].voteCount;

        // Válasz küldése a frontend felé
        return res.json([
          { id: 1, icon: 'https://cdn.jsdelivr.net/gh/Edvin7/V-laszt-s/szavazas/frontend/public/icons/campaign.png', value: results.parties, label: 'Pártok' },
          { id: 2, icon: 'https://cdn.jsdelivr.net/gh/Edvin7/V-laszt-s/szavazas/frontend/public/icons/friend.png', value: results.users, label: 'Felhasználók' },
          { id: 3, icon: 'https://cdn.jsdelivr.net/gh/Edvin7/V-laszt-s/szavazas/frontend/public/icons/vote.png', value: results.votes, label: 'Leadott Szavazatok' },
        ]);
        
      });
    });
  });
});
 
// API végpont a választási eredmények lekéréséhez
app.get('/election-results', (req, res) => {
  // SQL lekérdezés a pártokra leadott szavazatok összegzésére
  const  query = `
    SELECT p.party_id, p.name AS party_name, COUNT(v.vote_id) AS totalVotes
    FROM parties p
    LEFT JOIN votes v ON p.party_id = v.party_id
    GROUP BY p.party_id, p.name
    ORDER BY totalVotes DESC;
`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Hiba történt a pártokra leadott szavazatok lekérésekor.' });
    }

    // Adatok formázása és válaszként küldése
    return res.json(results.map((row) => ({
      party_id: row.party_id,
      party: row.party_name,
      votes: row.totalVotes
    })));
  });
});

// Get all users
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(result);
  });
});

// Update user info
app.put('/api/users/:id', (req, res) => {
  const { name, email, personal_id, status } = req.body;
  const userId = req.params.id;
  const query = 'UPDATE users SET name = ?, email = ?, personal_id = ?, status = ? WHERE id_number = ?';
  
  db.query(query, [name, email, personal_id, status, userId], (err, result) => {
    if (err) {
      res.status(500).send('Error updating user');
      return;
    }
    res.send('User updated');
  });
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;  // A paraméterben kapott id
  const query = 'DELETE FROM users WHERE id_number = ?';  // SQL lekérdezés
  
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Hiba történt a felhasználó törlésekor:', err);
      return res.status(500).send('Hiba történt a törlés közben');
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).send('Felhasználó nem található');
    }

    res.send('Felhasználó törölve');
  });
});

// Új párt hozzáadása
app.post('/api/parties', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'A név és a leírás kötelező mezők!' });
  }

  const sql = 'INSERT INTO parties (name, description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, results) => {
    if (err) {
      console.error('Adatbázis hiba:', err);
      return res.status(500).json({ error: 'Hiba történt az adatbázis művelet során.' });
    }
    res.status(201).json({ success: true, message: 'Párt sikeresen hozzáadva!' });
  });
});

// Párt törlése
app.delete('/api/parties/:id', (req, res) => {
  const partyId = req.params.id;

  db.query('DELETE FROM parties WHERE party_id = ?', [partyId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Nem található a párt.' });
      return;
    }
    res.json({ success: true, message: 'Párt sikeresen törölve' });
  });
});

// Adatvédelmi szabályzat lekérdezése
app.get('/api/privacyTerms', (req, res) => {
  const query = 'SELECT content FROM privacy_terms WHERE id = 1'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Hiba a szabályzat lekérdezésekor:', err);
      return res.status(500).send('Hiba történt az adatbázis lekérdezésekor');
    }
    // Válaszként visszaadjuk a szabályzatot
    res.json({ privacyTerms: results[0].content });
  });
});

app.get('/parties', async (req, res) => {
  const parties = await getPartiesFromDatabase();
  const partiesWithImageUrls = parties.map(party => ({
    ...party,
    photo: `/uploads/${party.photo}`  // Kép elérési útvonalának beállítása
  }));
  res.json(partiesWithImageUrls);
});


//kepek a partokhoz
app.use('/uploads', express.static(path.join(__dirname, 'public', 'images')));



// Dummy adatbázis (helyettesítheted egy valódi adatbázissal)
const users = [
  { id: 2, name: 'a', email: 'a@g.c', personal_id: '123', registered_at: '2025-01-07 13:11:12', status: 'active' },
  { id: 4, name: 'pal', email: 'pal@g.c', personal_id: '123', registered_at: '2025-02-10 11:06:17', status: 'active' },
  { id: 5, name: 'edv', email: 'edv@g.c', personal_id: '123', registered_at: '2025-02-10 11:06:29', status: 'active' },
  // ...további felhasználók
];

// Adatok lekérése
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Jelszó módosító API végpont
app.put('/api/users/:id_number/change-password', (req, res) => {
  const { id_number } = req.params;
  const { password } = req.body;

  // A jelszót először hasheljük
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Hiba történt a jelszó hashelése közben' });
    }

    // Jelszó frissítése az adatbázisban
    const sql = 'UPDATE users SET password_hash = ? WHERE id_number = ?';
    db.query(sql, [hashedPassword, id_number], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Hiba történt a jelszó frissítésekor' });
      }

      // Visszajelzés a frontend számára
      res.status(200).json({ message: 'A jelszó sikeresen frissítve lett' });
    });
  });
});

// Feltételezve, hogy Express-t használsz
app.get('/parties/:id', (req, res) => {
  const partyId = req.params.id;
  // Az adatbázis lekérdezése az id alapján
  db.query('SELECT * FROM parties WHERE party_id = ?', [partyId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Party not found' });
    }
    res.json(results[0]);  // Visszaadja az első párt adatát
  });
});


//
// 
// 
// CORS engedélyezése, ha különböző domain-ről érkeznek a kérések
app.use(cors());

// Ellenőrizzük, hogy létezik-e a 'uploads' mappa
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Kép tárolás beállítása
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // A fájlok tárolásának helye
  },
  filename: (req, file, cb) => {
    // Egyedi fájlnevet generálunk, hogy ne ütközzenek a fájlnevek
    cb(null, Date.now() + path.extname(file.originalname)); // Új fájlnév generálása
  }
});

// Multer middleware a fájlok feltöltésére
const upload = multer({ storage: storage });

// Kép feltöltése endpoint
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nincs fájl feltöltve.');
  }
  res.json({
    message: 'Fájl sikeresen feltöltve!',
    filePath: `/uploads/${req.file.filename}`  // Visszaadjuk az elérési utat
  });
});

// A feltöltött fájlok elérhetősége (statikus fájlok kiszolgálása)
app.use('/uploads', express.static(uploadDir));



// API route to get countdown date
app.get('/api/countdown-date', (req, res) => {
  db.query('SELECT countdown_date FROM settings LIMIT 1', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      const countdownDate = results[0].countdown_date;
      res.json({ countdownDate });
    } else {
      res.status(404).json({ error: 'Countdown date not found' });
    }
  });
});

app.post('/api/date-plus', (req, res) => {
 const { countdownDate } = req.body;

  if (!countdownDate) {
    return res.status(400).json({ error: 'A név és a leírás kötelező mezők!' });
  }
  const date = new Date(countdownDate);
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  db.query('UPDATE settings SET countdown_date = ? WHERE id = 1', [countdownDate], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ message: 'Countdown date updated successfully' });
  });
});



const checkAndResetCountdown = () => {
  const now = new Date();
  
  db.query('SELECT countdown_date FROM settings WHERE id = 1', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return;
    }

    if (results.length > 0) {
      const countdownDate = new Date(results[0].countdown_date);
      
      if (countdownDate <= now) {
        // Ha lejárt az időzítő, állítsuk NULL-ra
        db.query('UPDATE settings SET countdown_date = NULL WHERE id = 1', (updateErr) => {
          if (updateErr) {
            console.error('Database update error:', updateErr);
          } else {
            console.log('Countdown date reset to NULL.');
          }
        });
      }
    }
  });
};

// Futtassuk az ellenőrzést minden 1 másodpercben
setInterval(checkAndResetCountdown, 1 * 1000);






// Timer állapotának lekérdezése
app.get('/api/is-voting-active', (req, res) => {
  db.query('SELECT countdown_date FROM settings WHERE id = 1', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      const countdownDate = results[0].countdown_date;

      // Ha a countdown_date NULL vagy '0000-00-00 00:00:00', a szavazás inaktív
      if (!countdownDate || countdownDate === '0000-00-00 00:00:00') {
        return res.json({ isActive: false });
      }

      // Ellenőrizzük, hogy érvényes dátum-e
      const countdownDateObj = new Date(countdownDate);
      if (isNaN(countdownDateObj.getTime())) {
        return res.json({ isActive: false });
      }

      const now = new Date();

      // Ha a countdown_date lejárt, a szavazás inaktív
      if (countdownDateObj <= now) {
        return res.json({ isActive: false });
      }

      // Ha minden érvényes, és a dátum még aktív, a szavazás aktív
      return res.json({ isActive: true });
    } else {
      res.status(404).json({ error: 'Countdown date not found' });
    }
  });
});









// Szerver indítása
app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton`);
});