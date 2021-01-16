const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postulantSchema = Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    speciality: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address:{
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true }
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Postulant', postulantSchema);
