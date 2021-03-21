const { Artist } = require('../models');
const artist = require('../models/artist');

exports.create = (req, res) => {
  Artist.create(req.body)
  .then(artist => res.status(201).json(artist)) //Artist tablosunda yeni bir record yarat ve record'un içeriği = req.body
  .catch(error => {
    console.log(error);
    res.status(400).send();
})
};

exports.list = (req, res) => {
  Artist.findAll({})
  .then(list => res.status(200).json(list))
  .catch(error => {
    console.log(error);
    res.status(400).send();
})
};
