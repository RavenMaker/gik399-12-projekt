const PORT = 3000;
const express = require('express');
const path = require('path');
const server = express();

const sqlite = require('sqlite3').verbose();
const fs = require('fs');
const dbFile = path.join(__dirname, 'movies.db');
const db = new sqlite.Database(dbFile);

// Initiera/återställ och fyll DB från SQL-fil vid varje serverstart
try {
  const sqlPath = path.join(__dirname, 'movies.sql');
  if (fs.existsSync(sqlPath)) {
    const sql = fs.readFileSync(sqlPath, 'utf8');
    db.exec(sql, (err) => {
      if (err) {
        console.error('Kunde inte initiera DB från movies.sql', err);
      } else {
        console.log('Databas initierad från movies.sql');
      }
    });
  } else {
    console.warn('movies.sql saknas, hoppade över DB-init');
  }
} catch (err) {
  console.error('Fel vid DB-init', err);
}

// Enkel CORS-middleware (ingen extern dep behövs)
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

server
  .use(express.json())
  .use(express.static(path.join(__dirname, '..', 'client'))); // servera klientmappen så index.html nås

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Alla endpoints ska ha någon from av db.run(), db.all() eller db.get()
server.get('/movies', (req, res) => {
  try {
    db.all("SELECT * FROM movies", [], (err,rows) => {
      if (err) {
        console.error(err)
        return res.status(500).json({message: 'Kunde inte hämta filmer'});
      }
    res.json(rows)
  });
  } catch (error){
    console.error(error);
    res.status(500).json({message: 'Serverfel'});
  }

}); 

server.put('/movies/:id', (req, res) => {
  try {
    const bodyInfo = req.body;
    const id = req.params.id;

    const movies = {
      title: bodyInfo.title,
      year: bodyInfo.year,
      category: bodyInfo.category
    };

    db.run(
      `UPDATE movies SET title = ?, year = ?, category = ? WHERE id = ?`,
      [movies.title, movies.year, movies.category, id],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Det gick inte att uppdatera filmen' });
        }
        res.json({ message: `Film med id ${id} uppdaterades` });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Det gick inte att uppdatera' });
  }
});

server.post('/movies', (req, res) => {
  try {
    const bodyInfo = req.body;

    const movies = {
      title: bodyInfo.title,
      year: bodyInfo.year,
      category: bodyInfo.category
    };

    db.run(
      `INSERT INTO movies (title, year, category) VALUES (?, ?, ?)`,
      [movies.title, movies.year, movies.category],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Kunde inte skapa film' });
        }
        res.json({ message: 'Film skapad', id: this.lastID });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Det gick inte att skapa ny film' });
  }
});

server.delete('/movies/:id', (req, res) => {
  try {
    const id = req.params.id;

    db.run(`DELETE FROM movies WHERE id = ?`, [id], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Kunde inte radera filmen' });
      }
      res.json({ message: `Filmen med id ${id} har raderats` });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Det gick inte att radera' });
  }
});
