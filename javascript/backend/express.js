const PORT = process.env.PORT || 3000;
const express = require('express');
const server = express();

// const sqlite = require('sqlit3'); Kan lägga till .verbose() för mer feedback
// const db = new sqlite.Database('./????.db');

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


server.get('/resurs', (req, res) => { /* Ska ändra ordet resurs till något annat */
  try {
    /* const något = något; Läsa data från request(req) denna utvecklas
    olika beroende på hur frontend ser ut. Om det är id=req.params.id
    eller title=req.body.title ???? */

    // res.send('something')

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att hämta'});
  }

}); 

server.put('/resurs', (req, res) => {
    try {
    /* const något = något; Läsa data från request(req) denna utvecklas
    olika beroende på hur frontend ser ut. Om det är id=req.params.id
    eller title=req.body.title ???? */

    // res.send('something')

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att uppdatera'});
  }

});

server.post('/resurs', (req, res) => {
  try {
    /* const något = något; Läsa data från request(req) denna utvecklas
    olika beroende på hur frontend ser ut. Om det är id=req.params.id
    eller title=req.body.title ???? */

    // res.send('something')

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att skapa'});
  }
});

server.delete('/resurs/:id', (req, res) => {
  try {
    /* const något = något; Läsa data från request(req) denna utvecklas
    olika beroende på hur frontend ser ut. Om det är id=req.params.id
    eller title=req.body.title ???? */

    // res.send('something')

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Det gick inte att radera'});
  }
}); 

//Sök
server.get('/resurs/:id', (req, res) => {
  try {
    /* const något = något; Läsa data från request(req) denna utvecklas
    olika beroende på hur frontend ser ut. Om det är id=req.params.id
    eller title=req.body.title ???? */

    // res.send('something')

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Den gick inte att söka på den valda filmen'});
  }
}); 