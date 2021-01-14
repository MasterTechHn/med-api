const bcrypt = require('bcrypt');
const Doctor = require('../models/doctor.model');

function getDoctors (req, res) {
  try {
    const doctors = Doctor.find()
    .then((data) => {
        console.log('a doctors collection has been dispatch..');
        return res.status(200).send({ 
          success: true, data
        });
      })
    .catch(err => {
        console.log(err);
        return res.status(500).send({ 
          message: err.message, 
          success: false
        });
      });
  } catch (err) {
    console.log('something goes wrong on getDoctorsRequest** \n' + err);
  };
};

function newDoctor (req, res) {
  try {
    const {
      name,
      password,
      email,
      phone,
      address: {
        country,
        city,
        street
      },
      speciality,
      experience,
    } = req.body
  
    const doctor = Doctor({
      name,
      password,
      email,
      phone,
      address: {
        country,
        city,
        street
      },
      speciality,
      experience,
    });

    const found = Doctor.findOne({email: email})
    .then(found => {
      if(found){
        return res.status(201).send({
          success: false,
          message: 'this email is already taken by an account.'
        });
      };

      bcrypt.genSalt(5, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          console.log(hash);
          doctor.password = hash;        
          const saveDoctor = doctor.save()
          .then((data) => {
            console.log('new record on doctor collection..');
            return res.status(200).send({ 
              success: true, data
            });
          })
          .catch(err => {
            console.log(err);
            return res.status(500).send({ 
              success: false, message: err.message
            });
          });
        }, err => {
          console.log('something goes wrong on saveDoctorFunction** \n' + err);
        });
      });
    })
    .catch(err => {
      console.log(err);
      return status(500).send({
        succes: false,
        message: err.message
      });
    });
  } catch (err) {
    console.log('catch on newDoctorRequest** \n ' + err);
  }
};

module.exports = {
  getDoctors,
  newDoctor
};
