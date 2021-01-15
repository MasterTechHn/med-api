const Postulant = require('../models/postulant.model');


/* method need to record a collection */
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

    const validate = postulant.domainValidation(postulant, done => {
        console.log(done);
        if(!done.success){
            return res.status(201).send({
                success: done.success,
                message: done.message
            });
        }
        
        /* WATCH THE HEADER FUNCTION */
        // postulant.save()
        // .then(data => {
        //   console.log('new record on doctor collection..');
        //   return res.status(200).send({ 
        //     success: true, data
        //   });
        // })
        // .catch(err => {
        //   console.log(err);
        //   return res.status(500).send({ 
        //     success: false, 
        //     message: err.message
        //   });
        // });
    });

  } catch (err) {
    console.log('catch on newPostulantRequest** \n ' + err);
  }
}

module.exports = { newPostulant };
