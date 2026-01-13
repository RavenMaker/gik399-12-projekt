const PORT = process.env.PORT || 3000;
const express = require('express');
const server = express();

const sqlite = require('sqlite3').verbose();
const db = new sqlite3.Database('./movies.db');

server.use(express.json()); 
server.use(express.static('?????')) // mappens namn där index.html, CSS och JS för frontend

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
      const {id, title, year, category } = req.body;

      db.run(
        "UPDATE movies SET title = ?, year = ?, category = ? WHERE id = ?",
        [title, year, category, id],
        (err) => {
          if (err){
            return res.status(500).json({message: 'Det gick inte att uppdatera filmen'});
          }
          res.json({message: `Film med id ${id} uppdaterades`,});
        }
    );

  } catch (error){
    res.status(500).json({message: 'Det gick inte att uppdatera'});
  }
});

server.post('/movies', (req, res) => { 
  try {
    const {title, year, category } = req.body;

    db.run(
      "INSERT INTO movies (title, year, category) VALUES (?, ?, ?)",
      [title, year, category],
      (err) => {
        if (err){
          return res.status(500).json({message: 'Kunde inte skapa film'});
        }
        res.json({message: 'Film skapad'});
      }
    );

  } catch (error){
    console.error(error);
    res.status(500).json({message: 'Det gick inte att skapa ny film'});
  }
});

server.delete('/movies/:id', (req, res) => {
  try {
    const id = req.params.id;

    db.run("DELETE FROM movies WHERE id = ?", id);
    res.json({message: 'Filmen med id ${id} har raderats'});

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att radera'});
  }
}); 

//Sök via id, INTE obligatorisk...TA BORT!!!!!
server.get('/movies/:id', (req, res) => {
  try {
    const result = db.all("SELECT ?????"); // Osäker
    res.send('Söker efter film med id ${id}');

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Den gick inte att söka på den valda filmen'});
  }
}); 