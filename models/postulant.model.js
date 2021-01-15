const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postulantSchema = Schema({
    name: String,
    lastname: String,
    speciality: String,
    email: String,
    phone: Number,
    address:{
        country: String,
        city: String,
        street: String
    }
},{
    timestamps: true
});

postulantSchema.methods.domainValidation = (postulant, done) => {
    if(!postulant){
        return done ({
          success: false,
          message: 'postulant not exist.'
        });
      }
    
      if(postulant.name == ''){
        return done ({
          success: false,  
          message: 'postulant needs a valid name.'
        })
      }
    
      if(postulant.lastname == ''){
        return done ({
          success: false,
          message: 'postulant needs a valid last name.'
        })
      }
    
      if(postulant.phone == ''){
        return done ({
          success: false,
          message: 'postulant needs a valid phone number.'
        })
      }

      if(!postulant.address){
        return done({
            success: false,
            message: 'postulant needs an address information.'
        })
      }else {
          if(postulant.address.country == '' ||
              postulant.address.city == '' ||
                postulant.address.street == ''){
            return done({
                success: false,
                message: 'postulant address info must be completed.'
            })
          }
      }
    
    return done(true);
}

module.exports = mongoose.model('Postulant', postulantSchema);
