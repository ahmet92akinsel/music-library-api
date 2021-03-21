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

  beforeEach( async () => {
       try {
        await request(app).post('/artists').send({
        name: 'Tame Impala',
        genre: 'Rock',
        }) 
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
          name : "Tame Impala",
          genre: "Rock"
        });
        await request(app).post('/artists').send({
          name: 'Kylie Minogue',
          genre: 'Pop',
        })
        await request(app).post('/artists').send({
          name: 'Chick Corea Electric Band',
          genre: 'Fusion',
        })
        expect(response.status).to.equal(201);
      } catch (error) {
        throw error;
      }      
    });
  });
});




describe('with artists in the database', () => {
  let artists;
  beforeEach((done) => {
    Promise.all([
      Artist.create({ name: 'Tame Impala', genre: 'Rock' }),
      Artist.create({ name: 'The Weekend', genre: 'Pop' }),
      Artist.create({ name: 'Chick Corea Electric Band', genre: 'Fusion' }),
    ]).then((documents) => {
      artists = documents;
      done();
    });
  });
  describe('GET /artists', () => {
    it('gets all artist records', (done) => {
      request(app)
        .get('/artists')
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
        .catch(error => done(error));
    });
  });
});


/*try {
  const response = await Artist.findByPk(response.body.id, { raw: true })
  expect(response.name).to.equal('Tame Impala');
  expect(response.genre).to.equal('Rock');
} catch (error) {
  throw error;


   describe('GET /artists', () => {
    it('gets all artist records', async () => {
      try {
        const response = await request(app).get('/artists').send();
        expect(response.body).to.have.lengthOf(3);
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);
      } catch (error) {
        throw error;
      }
    });
  });
}*/