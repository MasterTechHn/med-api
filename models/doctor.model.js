const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const doctorSchema = Schema({
  name: String,
  password: String,
  email: String,
  phone: Number,
  address: {
    country: String,
    city: String,
    street: String
  },
  speciality: String,
  experience: String,
  images: {
    collegiate: String,
    profile: String,
    degree: String
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
