const Sequelize = require('sequelize');
const { Albums } = require('../models');
const albums = require('../models/albums.js')
const { Artist } = require('../models');
const artist = require("../models/artist.js");


exports.create = (req, res) => {

    const artistId = req.body.id
    Artist.findByPk(artistId).then((artist) => {
        if (!artist) {
          res.status(404).json({ error: "The artist does not exist." });
          console.log(artist,"ERROR")
        } else {
          const Albums = new Albums({
            artist, 
            name: req.body.name,
            year: req.body.year,
          });
        }
      });
    };


/*



    
    Artist.findById(req.body.id, (err, artist) => {
        if(err) {
            res.send('Artist does not exist');
        }
        const myAlbum = new Albums({
            artist, 
            name: req.body.name,
            year: req.body.year,
        });
    });
};


exports.create = (req, res) => {
    Artist.create(req.body)
      .then((artist) => res.status(201).json(artist)) //Artist tablosunda yeni bir record yarat ve record'un içeriği = req.body
      .catch((error) => {
        console.log(error);
        res.status(400).send();
      });
  };
*/