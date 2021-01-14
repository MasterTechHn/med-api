require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const { serverConfig, dbConfig } = require('./auth/config');
const dbConnection = require('./auth/dbconnection');
const doctorRoute = require('./routes/doctor.route');

const server = express()
require('./auth/local-auth');

server.use(passport.initialize());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/v0.1/medapi/doctor', doctorRoute);

function initApp (serverConfig, dbConfig) {
    
  dbConnection(dbConfig);  
  
  server.listen(serverConfig.port, () => console.log(`Am alive on port ${serverConfig.port} ...`));
};

initApp(serverConfig, dbConfig);
