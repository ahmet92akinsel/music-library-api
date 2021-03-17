const express = require('express');
const app = express();
app.use(express.json());

const artistControllers = require('./controllers/artists');

/*app.post('/artists', (req, res) => {
    res.send(201)
})

*/


module.exports = app;