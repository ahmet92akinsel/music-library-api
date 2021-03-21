
const { Artist } = require('../models');
const artist = require('../models/artist.js');

exports.create = (req, res) => {
  Artist.create(req.body).then(artist => res.status(201).json(artist)) //Artist tablosunda yeni bir record yarat ve record'un içeriği = req.body
  .catch(error => {
    console.log(error);
    res.status(400).send();
})
};

exports.list = (req, res) => {
  Artist.findAll({}).then(list => res.status(200).json(list))
  .catch(error => {
    console.log(error);
    res.status(400).send();
})
};

/*exports.findById = (req, res) => {
 const { id } = req.params;
  Artist.findByPk(id).then(artist => res.status(200).json(artist))
  .catch(error => {
    console.log(error);
    res.status(404).send();
 
})
};*/

exports.getArtistById = (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  });
};