const Sequelize = require("sequelize");
const { Album, Artist} = require("../models");

exports.create = (req, res) => {
  const artistId = req.params.artistId;
  Artist.findByPk(artistId).then((artist) => {
    if (!artist) {
      res.status(404).json({ error: "The artist could not be found." });
      //console.log(artist, "ERROR");
    } else {
      Album.create(req.body).then((album) => {
        //console.log("artist")

        album.setArtist(artist).then(result => {
          res
          .status(201)
          .send(album);
        })
  
      });
    }
  });
};
