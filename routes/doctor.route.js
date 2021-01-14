const express = require('express');
const passport = require('passport');
const { getDoctors, newDoctor } = require('../controllers/doctor.controller');

const api = express.Router();

api.post('/signin', (req, res, done) => {
  passport.authenticate('local', (err, doctor, info) => {
    if(err){
        throw err;
    }

    if(!doctor){
        return res.status(201).send({info});
    }

    if(doctor){
      return res.status(201).send({doctor});
    }
  })(req, res, done)
});

api.post('/signup', newDoctor);
api.get('/getDoctors', getDoctors);

module.exports = api;
