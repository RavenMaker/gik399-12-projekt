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
    db.all("SELECT * FROM movies", [], (err,rows));
    res.send('something') // eller res.json(result.row)

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att hämta'});
  }

}); 

server.put('/movies/:id', (req, res) => {
    try {
      const {id, title, year, category } = req.body;
      eller
      const result = db.run("SELECT * FROM movies WHERE id = ${id}") // Osäker
      res.send(`Uppdatera film ${id}`)

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att uppdatera'});
  }

});

server.post('/movies', (req, res) => {
  try {
    console.log(req.body);
    const {id, title, year, category } = req.body;

    // res.send('something')

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att skapa ny film'});
  }
});

server.delete('/movies/:id', (req, res) => {
  try {
    const result = db.run("SELECRT ?????") // Osäker
    res.send(`Filmen med id ${id} har raderats`)

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att radera'});
  }
}); 

//Sök via id
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