const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

validateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const doctorSchema = Schema({
  name: { 
    type: String, 
    min: [2, 'name is to short'], 
    required: true 
  },
  password: { type: String, required: true },
  email: { 
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    required: true, 
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
  },
  phone: { 
    type: Number,
    min: [8, 'phone has to few numers'], 
    required: true 
  },
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
  },
  speciality: { type: String, required: true },
  experience: { type: String, required: true },
  images: {
    collegiate: { type: String, required: false },
    profile: { type: String, required: false },
    degree: { type: String, required: false },
  }
}, {
    timestamps: true
});

doctorSchema.methods.bcryptPassword = async function bcryptPassword(pw) {
  const pwHashed = await bcrypt.hashSync(pw, bcrypt.genSaltSync(10));
  this.password = pwHashed;
  return pwHashed;
}

doctorSchema.methods.comparePassword = async function comparePassword(pw) {
  const matched = await bcrypt.compareSync(pw, this.password);
  return matched;
}

module.exports = mongoose.model('Doctor', doctorSchema);
