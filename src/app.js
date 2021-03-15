const express = require('express');

const app = express();

app.use(express.json());

const { Artist } = require('../src/models');


app.post('/artists', (req, res) => {
    res.status(201).send({result:'artist'})
});




module.exports = app, Artist;