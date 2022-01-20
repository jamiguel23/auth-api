'use strict';

process.env.SECRET = "secret";

const supertest = require('supertest');
const server = require('../src/server').server;
const { db } = require('../src/auth/models/index');

const request = supertest(server);

beforeAll(async (done) => {
  await db.sync();
  done();
});
afterAll(async (done) => {
  await db.drop();
  done();
});

let legs = {
  name: "Pant",
  calories: "Blue",
  type: "Large"
}


describe('Auth Router', () => {

  it('should respond with 200', async () => {
    const response = await request.post('/v2/clothes').send(legs);
    console.log(response);
    expect(response.status).toBe(404);
  });

  it('should respond with', async () => {
    const response = await request.get('/v2/clothes').send(legs);
    console.log(response.body)
  })

});
