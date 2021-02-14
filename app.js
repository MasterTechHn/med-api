const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const doctorRoute = require('./routes/doctor.route');
const postulantRoute = require('./routes/postulant.route');

const app = express()
require('./auth/local-auth');

/* HANDLE A WHITELIST OF DOMAINS
  THE NEXT BLOCK NEEDS TO IMPROVE
*/
// const whitelist = ['*', 'ttp://localhost:'];
// const corsOptions = {
//   origin: (origin, done) => {
//     if(whitelist.indexOf(origin) !== -1){
//       done(null, true);
//     }else {
//       done(new Error('Not Allowed by CORs'));
//     }
//   }
// };

app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/v0.1/medapi/doctor', doctorRoute);
app.use('/v0.1/medapi/apply', postulantRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to med api." });
});

app.use((req, res, done) => {
  const err = new Error('Not Found');
  err.status = 404;
  return done(err);
});

app.use((err, req, res, done) => {
  return res.status(err.status || 500)
    .send({
      success: false,
      error: {
        message: err.message
      }
    });
});

module.exports = app;