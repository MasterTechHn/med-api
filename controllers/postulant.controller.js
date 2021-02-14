const Postulant = require('../models/postulant.model');

async function getPostulant (req, res) {
  try {
    const postulant = await Postulant.find()
    .select('-createdAt -updatedAt -__v')
    console.log('a postulant collection has been dispatch..');
    return res.status(200).send({
      success: true,
      count: postulant.length,
      data: postulant
    });
  } catch (err) {
    console.log('something goes wrong on getPostulantRequest** \n');
    return res.status(500).send({
      success: false, 
      message: err.message,
      request: {
        type: 'GET',
        catch: 'postulantFind'
      }
    });
  }
}

async function newPostulant (req, res) {
  try {
    const {
      name,
      lastname,
      speciality,
      email,
      phone,
      address: {
        country,
        city,
        street
      }
    } = req.body;

    const postulant = new Postulant ({
      name,
      lastname,
      speciality,
      email,
      phone,
      address: {
          country,
          city,
          street
      }
    });    
    
    const postulantSaved = await postulant.save();
    console.log('new record on postulants collection..');
    return res.status(200).send({
      success: true,
      count: 1,
      data: postulantSaved
    });
  } catch (err) {
    console.log('catch on newPostulantRequest** \n ');
    return res.status(500).send({ 
      success: false, 
      message: err.message,
      request: {
        type: 'POST',
        catch: 'postulantSave'
      }
    });
  }
}

module.exports = { 
  newPostulant,
  getPostulant 
};
