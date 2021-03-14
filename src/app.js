const express = require('express');

const app = express();

app.use(express.json());

app.get('/helloworld', (req,res)=>{
res.status(200).send({result: 'hellomotherfucker'})
});


module.exports = app;