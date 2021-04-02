/* eslint-disable no-console */
const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const { Artist, Album } = require("../src/models");

describe("/albums", () => {
  let artist;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      artist = await Artist.create({
        name: "Tame Impala",
        genre: "Rock",
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe("POST /artists/:artistId/albums", () => {
    it("creates a new album for a given artist", (done) => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: "InnerSpeaker",
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          //console.log(res.body,"res.body")

          Album.findByPk(res.body.id, { raw: true })
            .then((album) => {
              //console.log(album, "album")

              expect(album.name).to.equal("InnerSpeaker");
              expect(album.year).to.equal("2010");
              expect(album.artistId).to.equal(artist.id);
              done();
            })
            .catch((error) => done(error));
        })
        .catch((error) => done(error));
    });

    it("returns a 404 and does not create an album if the artist does not exist", (done) => {
      request(app)
        .post("/artists/1234/albums")
        .send({
          name: "InnerSpeaker",
          year: 2010,
        })
        .then((res) => {
          //console.log(res.body, "res.body")
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The artist could not be found.");
          //console.log(res.body, "res.body")

          Album.findAll().then((albums) => {
            expect(albums.length).to.equal(0);
            done();
          });
        });
    });
  });
/*
describe("GET artists/:artistId/albums", () => {
   it("gets all albums", (done) => {
     request(app)
       .get(`/artists/${artist.id}/albums`)
       .then((res) => {
         expect(res.status).to.equal(200);
         expect(res.body.length).to.equal(3);
         res.body.forEach((artist) => {
           const expected = artists.find((a) => a.id === artist.id);
           expect(artist.name).to.equal(expected.name);
           expect(artist.genre).to.equal(expected.genre);
         });
         done();
       })
       .catch((error) => done(error));
   });
 });*/
});
