const { setupDB } = require('../auth/test-setup');
const request = require("supertest");
const app = require('../app');
const postulantMock = {
  name: 'dev2',
  lastname: 'abc123',
  email: 'dev2@masterchn.com',
  phone: 88776655,
  address: {
    country: 'Honduras',
    city: 'SPS',
    street: 'stibyshore'
  },
  speciality: 'general',
};

describe('Postulant Controller test ..', () =>{
  setupDB();

  it('POST /apply should response with a new postulant.', async() => {
    const resp = await request(app).post('/v0.1/medapi/apply')
    .send(postulantMock);

    expect(resp.body.data).toHaveProperty('_id');
    expect(resp.body.data).toHaveProperty('name');
    expect(resp.body.data).toHaveProperty('email');
    expect(resp.body.data).toHaveProperty('phone');
    expect(resp.body.data).toHaveProperty('address');
    expect(resp.body.data).toHaveProperty('speciality');
    expect(resp.status).toBe(200);
  });

  it('GET /apply should response with an array of postulants.', async() => {
    const resp = await request (app).get('/v0.1/medapi/apply');

    expect(resp.body.data).toHaveLength(1);
    expect(resp.body.data[0]).toHaveProperty('_id');
    expect(resp.body.data[0]).toHaveProperty('name');
    expect(resp.body.data[0]).toHaveProperty('email');
    expect(resp.body.data[0]).toHaveProperty('phone');
    expect(resp.body.data[0]).toHaveProperty('address');
    expect(resp.body.data[0]).toHaveProperty('speciality');
    expect(resp.status).toBe(200);
  });
});
