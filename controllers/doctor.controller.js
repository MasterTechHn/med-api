const bcrypt = require('bcrypt');
const Doctor = require('../models/doctor.model');

function getDoctors (req, res) {
  try {
    const doctors = Doctor.find()
    .select('name email phone password ._id')
    .then((data) => {
        console.log('a doctors collection has been dispatch..');
        return res.status(200).send({ 
          success: true, 
          count: data.length,
          doctors: data
        });
      })
    .catch(err => {
        console.log(err);
        return res.status(500).send({ 
          message: err.message, 
          success: false,
          request: {
            type: 'POST',
            catch: 'findDoctor'
          }
        });
      });
  } catch (err) {
    console.log('something goes wrong on getDoctorsRequest** \n');
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
              success: true,
              createdDoctor: {
                id: data._id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                speciality: data.speciality,
                experience: data.experience,
                country: data.address.country,
                city: data.address.city,
                street: data.address.street
              } 
            });
          })
          .catch(err => {
            console.log(err);
            return res.status(500).send({ 
              success: false, message: err.message
            });
          });
        }, err => {
          console.log('something goes wrong on saveDoctorFunction** \n');
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
    console.log('catch on newDoctorRequest** \n ');
  }
};

module.exports = {
  getDoctors,
  newDoctor
};
