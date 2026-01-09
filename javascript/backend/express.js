const PORT = process.env.PORT || 3000;
const express = require('express');
const server = express();

server.use(express.json());

const sqlite = require('sqlite3').verbose();
// const db = new sqlite.Database('./????.db');

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


server.get('/movies', (req, res) => { /* Ska ändra ordet resurs till något annat, typ MOVIE? */
  try {
    const result = await db.query("SELECT * FROM movies");
    res.send('something')

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att hämta'});
  }

}); 

server.put('/movies/:id', (req, res) => {
    try {
      /*const {id, title, year, category } = req.body.id;
      res.send(`Uppdatera film ${id}`)*/

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att uppdatera'});
  }

});

server.post('/movies', (req, res) => {
  try {
    /* const title=req.body.title */

    // res.send('something')

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att skapa ny film'});
  }
});

server.delete('/movies/:id', (req, res) => {
  try {
    const id=req.params.id

    res.send('Filmen med id ${id} har raderats')

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att radera'});
  }
}); 

//Sök
server.get('/movies/:id', (req, res) => {
  try {
    const id=req.params.id
    res.send('Söker efter film med id ${id}');

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Den gick inte att söka på den valda filmen'});
  }
}); 