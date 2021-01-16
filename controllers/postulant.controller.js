const Postulant = require('../models/postulant.model');

function getPostulant (req, res) {
  try {
    const postulant = Postulant.find()
    .then(data => {
      console.log('a doctors collection has been dispatch..');
      return res.status(201).send({
        success: true,
        count: data.length,
        postulants: data
      });
    })
    .cath(err => {
      return res.status(500).send({
        success: false, 
        message: err.message,
        request: {
          type: 'GET',
          catch: 'postulantFind'
        }
      });
    });
  } catch (err) {
    console.log('something goes wrong on getPostulantRequest** \n');
  }
}

function newPostulant (req, res) {
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
    
    const postulantSave = postulant.save()
    .then(data => {
      console.log('new record on postulant collection..');
      return res.status(200).send({ 
        success: true,
        createdPostulant: {
          _id: data._id,
          name: data.name,
          lastname: data.lastname,
          email: data.email
        }
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ 
        success: false, 
        message: err.message,
        request: {
          type: 'POST',
          catch: 'postulantSave'
        }
      });
    });
  } catch (err) {
    console.log('catch on newPostulantRequest** \n ');
  }
}

module.exports = { 
  newPostulant,
  getPostulant 
};
