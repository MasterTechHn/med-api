const bcrypt = require('bcrypt');
const Doctor = require('../models/doctor.model');

async function getDoctors(req, res) {
  try {
    const doctors = await Doctor.find()
    .select('-createdAt -updatedAt -__v')
    console.log('a doctors collection has been dispatch..');
    return res.status(200).send({ 
      success: true, 
      count: data.length,
      data: doctors
    });
  } catch (err) {
    console.log('something goes wrong on getDoctorsRequest** \n');
    return res.status(500).send({ 
      message: err.message, 
      success: false,
      request: {
        type: 'GET',
        catch: 'findDoctor'
      }
    });
  }
}

async function newDoctor (req, res) {
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

    const doctorExist = await Doctor.findOne({email: email});

    if(doctorExist){
      return res.status(201).send({
        success: false,
        message: 'this email is already taken by an account.'
      });
    }

    await doctor.bcryptPassword(password);

    const doctorStored = await doctor.save()
    
    return res.status(200).send({ 
      success: true,
      count: 1,
      data: doctorStored
    });
  } catch (err) {
    console.log('something goes wrong on saveDoctorFunction** \n');
    return status(500).send({
      succes: false,
      message: err.message,
      request: {
        type: 'POST',
        catch: 'doctorSavve'
      }
    });
  }
};

module.exports = {
  getDoctors,
  newDoctor
};
