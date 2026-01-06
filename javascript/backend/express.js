const PORT = process.env.PORT || 3000;
const express = require('express');
const server = express();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


server.get('/resurs', (req, res) => {
  try {
    /* const något = något; Läsa data från request(req) denna utvecklas
    olika beroende på hur frontend ser ut. Om det är id=req.params.id
    eller title=req.body.title ???? */

    // res.send('something')

  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Något gick fel'});
  }

}); 

server.put('/resurs', (req, res) => {
    //callbackfunktion för att hantera förfrågan
  res.send('Update endpoint hit!');
});

server.post('/resurs', (req, res) => {
    //callbackfunktion för att hantera förfrågan
  res.send('Create endpoint hit!');
});

server.delete('/resurs/:id', (req, res) => {
    //callbackfunktion för att hantera förfrågan
  res.send('Delete endpoint hit!');
}); 

//Sök
server.get('/resurs/:id', (req, res) => {
    //callbackfunktion för att hantera förfrågan
  res.send('Search endpoint hit!');
}); 