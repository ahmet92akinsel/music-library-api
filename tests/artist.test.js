const { expect } = require("chai");
const request = require("supertest");
const { Artist } = require("../src/models");
const app = require("../src/app");

describe("/artists", () => {
  before(async () => {
    try {
      await Artist.sequelize.sync();
    } catch (error) {
      throw error;
    }
  });

  beforeEach(async () => {
    try {
      await request(app).post("/artists").send({
        name: "Tame Impala",
        genre: "Rock",
      });
      await request(app).post("/artists").send({
        name: "The Weekend",
        genre: "Pop",
      });
      await request(app).post("/artists").send({
        name: "Chick Corea Electric Band",
        genre: "Fusion",
      });
    } catch (error) {
      throw error;
    }
  });

  afterEach(async () => {
    try {
      await Artist.destroy({ where: {} });
    } catch (error) {
      throw error;
    }
  });

  describe("POST /artists", () => {
    it("creates a new artist in the database", async () => {
      try {
        const response = await request(app).post("/artists").send({
          name: "Tame Impala",
          genre: "Rock",
        });
        await request(app).post("/artists").send({
          name: "The Weekend",
          genre: "Pop",
        });
        await request(app).post("/artists").send({
          name: "Chick Corea Electric Band",
          genre: "Fusion",
        });
        expect(response.status).to.equal(201);
      } catch (error) {
        throw error;
      }
    });
  });
});

describe("with artists in the database", () => {
  let artists;
  beforeEach((done) => {
    Promise.all([
      Artist.create({ name: "Tame Impala", genre: "Rock" }),
      Artist.create({ name: "The Weekend", genre: "Pop" }),
      Artist.create({ name: "Chick Corea Electric Band", genre: "Fusion" }),
    ]).then((documents) => {
      artists = documents;
      done();
    });
  });

  describe("GET /artists", () => {
    it("gets all artist records", (done) => {
      request(app)
        .get("/artists")
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
    it("gets artist record by id", async () => {
      try {
        const artist = artists[0];
        const result = await request(app).get(`/artists/${artist.id}`).send();
        expect(result.status).to.equal(200);
        expect(result.body.name).to.equal(artist.name);
        expect(result.body.genre).to.equal(artist.genre);
      } catch (error) {
        throw error;
      }
    });
  });
});

describe("PATCH /artists/:id", () => {
  let artists;
  beforeEach((done) => {
    Promise.all([
      Artist.create({ name: "Tame Impala", genre: "Rock" }),
      Artist.create({ name: "The Weekend", genre: "Pop" }),
      Artist.create({ name: "Chick Corea Electric Band", genre: "Fusion" }),
    ]).then((documents) => {
      artists = documents;
      done();
    });
  });
  it("updates artist genre by id", (done) => {
    const artist = artists[0];
    request(app)
      .patch(`/artists/${artist.id}`)
      .send({ genre: "Psychedelic Rock" })
      .then((res) => {
        expect(res.status).to.equal(200);
        Artist.findByPk(artist.id, { raw: true })
          .then((updatedArtist) => {
            expect(updatedArtist.genre).to.equal("Psychedelic Rock");
            done();
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  });

  it("updates artist name", (done) => {
    const artist = artists[0];
    request(app)
      .patch(`/artists/${artist.id}`)
      .send({ name: "Sting" })
      .then((res) => {
        expect(res.status).to.equal(200);    
        Artist.findByPk(artist.id, { raw: true })
          .then((updatedArtist) => {
            expect(updatedArtist.name).to.equal("Sting");
            done();
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  });
});

describe('DELETE /artists/:artistId', () => {
  let artists;
  beforeEach((done) => {
    Promise.all([
      Artist.create({ name: "Tame Impala", genre: "Rock" }),
      Artist.create({ name: "The Weekend", genre: "Pop" }),
      Artist.create({ name: "Chick Corea Electric Band", genre: "Fusion" }),
    ]).then((documents) => {
      artists = documents;
      done();
    });
  });
  it('deletes artist record by id', (done) => {
    const artist = artists[0];
    request(app)
      .delete(`/artists/${artist.id}`)
      .then((res) => {
        expect(res.status).to.equal(204);
        Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
          expect(updatedArtist).to.equal(null);
          done();
        }).catch(error => done(error));
      }).catch(error => done(error));
  });

});