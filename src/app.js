const express = require('express');
const app = express();
app.use(express.json());

const artists = require('./controllers/artists');


app.post('/artists', artists.create);
app.get('/artists', artists.list);
app.get('/artists/:id', artists.getArtistById);
app.patch('/artists/:id', artists.updateArtist);
app.patch('/artists/:name', artists.updateArtistName);
app.delete('/artists/:id', artists.deleteRecord);



module.exports = app;