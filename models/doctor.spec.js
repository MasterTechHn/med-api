const mongoose = require('mongoose');
const { setupDB } = require('../auth/test-setup');
const Doctor = require('./doctor.model');
const doctorMock = {
  name: 'dev',
  password: 'abc123',
  email: 'dev@masterchn.com',
  phone: 88776655,
  address: {
    country: 'Honduras',
    city: 'SPS',
    street: 'stibyshore'
  },
  speciality: 'general',
  experience: 'noob',
};

describe('Doctor model test ..', () => {
  setupDB();
  
  it('should create & save a doctor succsesfully.', async() => {
    const doc = new Doctor(doctorMock);
    const saveDoc = await doc.save();

    expect(saveDoc._id).toBeDefined();
    expect(saveDoc.name).toBe(doc.name);
    expect(saveDoc.password).toBeDefined();
    expect(saveDoc.email).toBe(doc.email);
    expect(saveDoc.phone).toBe(doc.phone);
    expect(saveDoc.address.country).toBe(doc.address.country);
    expect(saveDoc.address.city).toBe(doc.address.city);
    expect(saveDoc.address.street).toBe(doc.address.street);
    expect(saveDoc.speciality).toBe(doc.speciality);
    expect(saveDoc.experience).toBe(doc.experience);
  });

  it('create doctor without requireds field should failed.', async() => {
    const docWithoutRequestField = new Doctor({name: 'dev'});
    let err;
    try {
      const saveDocWithoutRequestField = await docWithoutRequestField.save();
      err = saveDocWithoutRequestField;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
    expect(err.errors.email).toBeDefined();
    expect(err.errors.phone).toBeDefined();
    expect(err.errors.speciality).toBeDefined();
    expect(err.errors.experience).toBeDefined();
  })
});
