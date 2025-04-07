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
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());

// MySQL kapcsolat
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vote',
  dateStrings: true,
});

db.connect((err) => {
  if (err) {
    console.error('Hiba a MySQL kapcsolódás során:', err);
    return;
  }
  console.log('Sikeresen csatlakoztunk a MySQL adatbázishoz');
});

  
//Adatbázis kapcsolat API
app.get('/api/db-test', (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      console.error('Hiba a MySQL lekérdezés során:', err);
      return res.status(500).json({ error: 'Hiba történt az adatbázis kapcsolat ellenőrzésekor.' });
    }
    res.status(200).json({ success: true, result: results[0].result });
  });
});

// Regisztrációs endpoint
app.post('/register', (req, res) => {
  const { name, email, pass, personal_id, agreeTerm } = req.body;

  if (!name || !email || !pass || !personal_id || agreeTerm === undefined) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, result) => {
    if (err) {
      console.error('Hiba a felhasználó ellenőrzésekor:', err);
      return res.status(500).json({ message: 'Belső hiba történt' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Ez az email már regisztrálva van' });
    }

    const insertQuery = `INSERT INTO users (name, email, password_hash, personal_id, agree_terms, status) 
                         VALUES (?, ?, ?, ?, ?, 'active')`;

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

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Hiba történt a users lekérdezésekor:', err);
      return res.status(500).json({ message: 'Belső hiba történt!' });
    }

    if (results.length > 0) {
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
            isAdmin: false,
          },
        });
      });
    } else {
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
              isAdmin: true,
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
    return res.status(200).json({ loggedIn: true, user: req.session.user });
  }
  res.status(200).json({ loggedIn: false });
});

// Szavazat leadása
app.post('/voting', (req, res) => {
  const { election_id, party_id, vote_hash, user_id } = req.body;

  if (!election_id || !party_id || !vote_hash || !user_id) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  const checkVoteQuery = 'SELECT * FROM votes WHERE election_id = ? AND user_id = ?';
  db.query(checkVoteQuery, [election_id, user_id], (err, result) => {
    if (err) {
      console.error('Hiba történt a szavazat ellenőrzésekor:', err);
      return res.status(500).json({ message: 'Hiba történt a szavazat ellenőrzésekor!' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Már leadtad a szavazatot!' });
    }

    const query = 'INSERT INTO votes (election_id, party_id, vote_hash, user_id) VALUES (?, ?, ?, ?)';
    db.query(query, [election_id, party_id, vote_hash, user_id], (err, result) => {
      if (err) {
        console.error('Hiba történt a szavazat mentésekor:', err);
        return res.status(500).json({ message: 'Hiba történt a szavazat leadásakor!' });
      }
      res.status(200).json({ message: 'Sikeresen leadta a szavazatot!' });
    });
  });
});

// Új endpoint a pártok adatainak lekérésére
app.get('/parties', (req, res) => {
    const query = 'SELECT * FROM parties';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Hiba történt a pártok lekérésekor:', err);
        return res.status(500).json({ message: 'Belső hiba történt' });
      }
      res.status(200).json(results);
    });
  });

  app.get('/api/parties', (req, res) => {
    const query = 'SELECT * FROM parties';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.json(results);
    });
  });
 
  app.get('/voting', (req, res) => {
    const query = 'SELECT * FROM parties';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Hiba történt a pártok lekérésekor:', err);
        return res.status(500).json({ message: 'Belső hiba történt' });
      }
      res.json(results);
    });
  });

  // API végpont a számok lekéréséhez
app.get('/counters', (req, res) => {
  const queries = {
    parties: 'SELECT COUNT(*) AS partyCount FROM parties',
    users: 'SELECT COUNT(*) AS userCount FROM users',
    votes: 'SELECT COUNT(*) AS voteCount FROM votes',
  };

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
    return res.json(results.map((row) => ({
      party_id: row.party_id,
      party: row.party_name,
      votes: row.totalVotes
    })));
  });
});


// Felhasználó lekérése
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

// Felhasználói adatok frissítése
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

//Felhasználó törlés
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  const checkQuery = 'SELECT countdown_date FROM settings WHERE id = 1';

  db.query(checkQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Hiba történt a countdown_date lekérdezésekor:', checkErr);
      return res.status(500).json({ error: 'Hiba a countdown_date ellenőrzésénél' });
    }

    if (checkResult.length === 0) {
      return res.status(400).json({ error: 'A beállítások nem találhatók' });
    }

    // A mező stringként jön vissza
    const countdownDate = checkResult[0].countdown_date;

    if (countdownDate !== '0000-00-00 00:00:00') {
      return res.status(400).json({ error: 'A felhasználó csak akkor törölhető, ha a vége a szavazásnak!' });
    }

    // Mehet a törlés
    const deleteQuery = 'DELETE FROM users WHERE id_number = ?';

    db.query(deleteQuery, [userId], (err, result) => {
      if (err) {
        console.error('Hiba történt a felhasználó törlésekor:', err);

        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
          return res.status(400).json({
            error: 'A felhasználó nem törölhető, mert szavazásban vett részt.',
            details: 'Más táblák hivatkoznak erre a felhasználóra.'
          });
        }

        return res.status(500).json({ error: 'Hiba történt a törlés során', details: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Felhasználó nem található' });
      }

      res.json({ message: 'Felhasználó sikeresen törölve' });
    });
  });
});


// Új párt hozzáadása


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Feltöltési könyvtár ellenőrzése és létrehozása, ha nem létezik
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer konfiguráció
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Statikus fájlok elérése
app.use('/uploads', express.static(uploadDir));

// API végpontok...
app.post('/api/parties', upload.single('photo'), (req, res) => {
  const { name, description, political_ideology, political_campaign_description, political_year_description } = req.body;
  const photo = req.file ? req.file.filename : null;

  if (!name || !description || !political_ideology || !political_campaign_description || !political_year_description) {
    return res.status(400).json({ error: 'Minden mező kitöltése kötelező!' });
  }

  // Ellenőrizzük az időzítő értékét
  const timerSql = 'SELECT countdown_date FROM settings LIMIT 1';
  db.query(timerSql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Hiba történt az adatbázis lekérdezésekor.' });
    }

    if (!results.length || results[0].countdown_date > new Date()) {
      return res.status(403).json({ error: 'Új párt csak az időzítő lejárta után tölthető fel!' });
    }

    // Ha az időzítő lejárt, beszúrjuk az új pártot
    const sql = `
      INSERT INTO parties 
      (name, description, photo, political_ideology, political_campaign_description, political_year_description) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, description, photo, political_ideology, political_campaign_description, political_year_description], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Hiba történt az adatbázis művelet során.' });
      }
      res.status(201).json({ success: true, message: 'Párt sikeresen hozzáadva!' });
    });
  });
});



// Párt törlése !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TESZTELNI KELL / nem mukodik
app.delete('/api/parties/:id', (req, res) => {
  const partyId = parseInt(req.params.id, 10);

  if (isNaN(partyId)) {
    return res.status(400).json({ error: 'Érvénytelen ID' });
  }

  // Először ellenőrizzük a countdown_date-et
  const checkQuery = 'SELECT countdown_date FROM settings WHERE id = 1';

  db.query(checkQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Hiba történt a countdown_date lekérdezésekor:', checkErr);
      return res.status(500).json({ error: 'Hiba a countdown_date ellenőrzésénél' });
    }

    if (checkResult.length === 0) {
      return res.status(400).json({ error: 'A beállítások nem találhatók' });
    }

    const countdownDate = checkResult[0].countdown_date;
    console.log('Lekérdezett countdown_date:', countdownDate); // Debug log

    if (countdownDate !== '0000-00-00 00:00:00') {
      return res.status(400).json({ error: 'Párt csak akkor törölhető, ha a lejárt a szavazás!' });
    }

    // Mehet a törlés
    db.query('DELETE FROM parties WHERE party_id = ?', [partyId], (err, results) => {
      if (err) {
        console.error('DB hiba:', err);
        return res.status(500).json({ error: err.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Nem található a párt.' });
      }

      res.json({ success: true, message: 'Párt sikeresen törölve' });
    });
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
    res.json({ privacyTerms: results[0].content });
  });
});





app.get('/parties', async (req, res) => {
  const parties = await getPartiesFromDatabase();
  const partiesWithImageUrls = parties.map(party => ({
    ...party,
    photo: `/uploads/${party.photo}`
  }));
  res.json(partiesWithImageUrls);
});


//Képek a pártokhoz !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TESZTELNI KELL / nem mukodik

app.get('/parties/:id', (req, res) => {
  const partyId = req.params.id;
  db.query('SELECT * FROM parties WHERE party_id = ?', [partyId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Party not found' });
    }
    res.json(results[0]);  
  });
});

app.use(cors());
/*
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nincs fájl feltöltve.');
  }
  res.json({
    message: 'Fájl sikeresen feltöltve!',
    filePath: `/uploads/${req.file.filename}`
  });
});

app.use('/uploads', express.static(uploadDir));*/


// Időzítő dátumának lekérdezése
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

setInterval(checkAndResetCountdown, 1 * 1000);


// Időzítő állapotának lekérdezése
app.get('/api/is-voting-active', (req, res) => {
  db.query('SELECT countdown_date FROM settings WHERE id = 1', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      const countdownDate = results[0].countdown_date;

      if (!countdownDate || countdownDate === '0000-00-00 00:00:00') {
        return res.json({ isActive: false });
      }

      const countdownDateObj = new Date(countdownDate);
      if (isNaN(countdownDateObj.getTime())) {
        return res.json({ isActive: false });
      }

      const now = new Date();

      if (countdownDateObj <= now) {
        return res.json({ isActive: false });
      }
      return res.json({ isActive: true });
    } else {
      res.status(404).json({ error: 'Countdown date not found' });
    }
  });
});


app.post('/api/reset-countdown', (req, res) => {
  db.query('UPDATE settings SET countdown_date = "0000-00-00 00:00:00" WHERE id = 1', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Countdown date reset successfully' });
  });
});



app.post('/api/reset-all', (req, res) => {
  db.beginTransaction((err) => {
    if (err) {
      console.error('Transaction error:', err);
      return res.status(500).json({ error: 'Transaction error' });
    }

    // 1. Az időzítő lenullázása
    db.query('UPDATE settings SET countdown_date = "0000-00-00 00:00:00" WHERE id = 1', (updateErr) => {
      if (updateErr) {
        return db.rollback(() => {
          console.error('Database update error:', updateErr);
          res.status(500).json({ error: 'Failed to reset countdown date' });
        });
      }

      // 2. Szavazatok törlése
      db.query('DELETE FROM votes', (deleteErr) => {
        if (deleteErr) {
          return db.rollback(() => {
            console.error('Vote deletion error:', deleteErr);
            res.status(500).json({ error: 'Failed to delete votes' });
          });
        }

        // 3. Auto-increment visszaállítása
        db.query('ALTER TABLE votes AUTO_INCREMENT = 1;', (alterErr) => {
          if (alterErr) {
            return db.rollback(() => {
              console.error('Auto-increment reset error:', alterErr);
              res.status(500).json({ error: 'Failed to reset auto-increment' });
            });
          }

          // Ha minden sikerült, akkor commit
          db.commit((commitErr) => {
            if (commitErr) {
              return db.rollback(() => {
                console.error('Commit error:', commitErr);
                res.status(500).json({ error: 'Transaction commit failed' });
              });
            }
            res.json({ message: 'Reset successful: countdown reset, votes deleted, and auto-increment reset' });
          });
        });
      });
    });
  });
});




// Jelszó változtatás endpoint
app.put('/api/users/:id_number/change-password', (req, res) => {
  const { id_number } = req.params;
  const { currentPassword, newPassword } = req.body;

  // Ellenőrizzük, hogy mindkét jelszó meg van adva
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'A jelenlegi és az új jelszó megadása kötelező.' });
  }

  // Először lekérjük a felhasználó jelenlegi jelszavát az adatbázisból
  const query = 'SELECT password_hash FROM users WHERE id_number = ?';
  db.query(query, [id_number], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba történt a felhasználó keresésekor.' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Felhasználó nem található.' });
    }

    // A jelenlegi jelszó összehasonlítása
    const storedPasswordHash = result[0].password_hash;
    bcrypt.compare(currentPassword, storedPasswordHash, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Hiba történt a jelszó ellenőrzésekor.' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'A jelenlegi jelszó nem helyes.' });
      }

      // Ha a jelenlegi jelszó helyes, titkosítjuk az új jelszót
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Hiba történt az új jelszó hashelésekor.' });
        }

        // Az új jelszó frissítése az adatbázisban
        const updateQuery = 'UPDATE users SET password_hash = ? WHERE id_number = ?';
        db.query(updateQuery, [hashedPassword, id_number], (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Hiba történt a jelszó módosítása során.' });
          }

          if (result.affectedRows > 0) {
            res.status(200).json({ message: 'A jelszó sikeresen megváltozott.' });
          } else {
            res.status(404).json({ message: 'Felhasználó nem található.' });
          }
        });
      });
    });
  });
});

// API végpont a szavazatok lekérésére
app.get('/api/votes', (req, res) => {
  const userId = req.query.user_id; // A felhasználó ID-ját a query paraméterből kapjuk

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const query = 'SELECT * FROM votes WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Hiba a szavazatok lekérésekor:', err);
      return res.status(500).json({ message: 'Hiba történt' });
    }

    // Visszaadjuk a szavazatokat
    res.json(results);
  });
});

// Szerver indítása
app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton`);
});