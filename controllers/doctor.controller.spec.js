const { setupDB } = require('../auth/test-setup');
const request = require("supertest");
const app = require('../app');
const doctorMock = {
  name: 'dev2',
  password: 'abc123',
  email: 'dev2@masterchn.com',
  phone: 88776655,
  address: {
    country: 'Honduras',
    city: 'SPS',
    street: 'stibyshore'
  },
  speciality: 'general',
  experience: 'noob',
  };

describe('Doctor Controller test ..', () => {
  
  setupDB();

  it('POST /signup should response with a new doctor.', async() =>{
    const resp = await request(app).post('/v0.1/medapi/doctor/signup')
    .send(doctorMock);

    expect(resp.body.data).toHaveProperty('_id');
    expect(resp.body.data).toHaveProperty('name');
    expect(resp.body.data).toHaveProperty('password');
    expect(resp.body.data).toHaveProperty('email');
    expect(resp.body.data).toHaveProperty('phone');
    expect(resp.body.data).toHaveProperty('address');
    expect(resp.body.data).toHaveProperty('speciality');
    expect(resp.body.data).toHaveProperty('experience');
    expect(resp.status).toBe(200);
  })
  
  it('GET /getDoctors should response with an array of doctors.', async() =>{
    const resp = await request(app).get('/v0.1/medapi/doctor/getDoctors');

    expect(resp.body.success).toBeTruthy();
    expect(resp.body.data[0]).toHaveProperty('_id');
    expect(resp.body.data[0]).toHaveProperty('name');
    expect(resp.body.data[0]).toHaveProperty('password');
    expect(resp.body.data[0]).toHaveProperty('email');
    expect(resp.body.data[0]).toHaveProperty('phone');
    expect(resp.body.data[0]).toHaveProperty('address');
    expect(resp.body.data[0]).toHaveProperty('speciality');
    expect(resp.body.data[0]).toHaveProperty('experience');
    expect(resp.status).toBe(200);
  })
});
