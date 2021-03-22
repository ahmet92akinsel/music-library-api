const artists = require('./controllers/artists');
//const artist = require('./models/artist');
const express = require('express');
const app = express();
app.use(express.json());


app.post('/artists', artists.create);
app.get('/artists', artists.list);
app.get('/artists/:id', artists.getArtistById);
app.patch('/artists/:id', artists.updateArtist);



module.exports = app;