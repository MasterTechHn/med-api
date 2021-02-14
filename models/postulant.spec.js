const mongoose = require('mongoose');
const { setupDB } = require('../auth/test-setup');
const Postulant = require('./postulant.model');
const postulantMock = {
  name: 'dev',
  lastname: 'techn',
  speciality: 'general',
  email: 'dev@masterchn.com',
  phone: 88776655,
  address: {
    country: 'Honduras',
    city: 'SPS',
    street: 'stibyshore'
  }
};

describe('Postulant model test..', () => {
  setupDB();

  it('should create & save a postulant succsesfully.', async() => {
    const postulant = new Postulant(postulantMock);
    const savePostulant = await postulant.save();

    expect(savePostulant._id).toBeDefined();
    expect(savePostulant.name).toBeDefined();
    expect(savePostulant.lastname).toBeDefined();
    expect(savePostulant.speciality).toBeDefined();
    expect(savePostulant.email).toBeDefined();
    expect(savePostulant.phone).toBeDefined();
    expect(savePostulant.address).toBeDefined();
    expect(savePostulant).toEqual(postulant);
  });

  it('create postulant without requireds field should failed.', async() => {
    const docWithoutRequestField = new Postulant({name: 'dev'});
    let err;
    try {
      const saveDocWithoutRequestField = await docWithoutRequestField.save();
      err = saveDocWithoutRequestField;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.lastname).toBeDefined();
    expect(err.errors.speciality).toBeDefined();
    expect(err.errors.email).toBeDefined();
    expect(err.errors.phone).toBeDefined();
  });
});
