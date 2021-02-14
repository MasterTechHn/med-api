const auth = require('passport');
const bcrypt = require('bcrypt');
const localStartegy = require('passport-local').Strategy;
const Doctor = require('../models/doctor.model');

auth.serializeUser((doctor, done) => {
    console.log(doctor);
    return done(null, doctor.id);
});

auth.deserializeUser((id, done) => {
    console.log("deserializeUser called", id);
    Doctor.findById(id, (err, doctor) => {
      return done(err, doctor);
    });
});

auth.use(new localStartegy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    Doctor.findOne({email: email}, (err, doctor) => {
        if(err){
            return done(err);
        }
        if(!doctor){
            return done(null, false, {
                message: 'Incorrect Username.'
            });
        }

        doctor.comparePassword(password)
          .then((err, match) => {
            if(err){
              return done(err);
            }

            if(!match){
              return done(null, false, {
                message: 'Incorrect Password.'
              });
            }

            return done(null, doctor);
          }
        );
    });
}));
