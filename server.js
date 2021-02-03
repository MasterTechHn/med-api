require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const { serverConfig, dbConfig } = require('./auth/config');
const dbConnection = require('./auth/dbconnection');
const doctorRoute = require('./routes/doctor.route');
const postulantRoute = require('./routes/postulant.route');

const server = express()
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

server.use(cors());
server.use(morgan('dev'));
server.use(passport.initialize());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/v0.1/medapi/doctor', doctorRoute);
server.use('/v0.1/medapi/apply', postulantRoute);

server.get("/", (req, res) => {
  res.json({ message: "Welcome to med api." });
});

server.use((req, res, done) => {
  const err = new Error('Not Found');
  err.status = 404;
  return done(err);
});

server.use((err, req, res, done) => {
  return res.status(err.status || 500)
    .send({
      success: false,
      error: {
        message: err.message
      }
    });
});



function initApp (serverConfig, dbConfig) {
    
  dbConnection(dbConfig);  
  
  server.listen(serverConfig.port, () => console.log(`Am alive on port ${serverConfig.port} ...`));
};

initApp(serverConfig, dbConfig);
