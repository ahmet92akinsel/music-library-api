const artists = require('./controllers/artists');


const express = require('express');
const artist = require('./models/artist');
const app = express();
app.use(express.json());

app.post('/artists', artists.create);
app.get('/artists',artists.list)



module.exports = app;