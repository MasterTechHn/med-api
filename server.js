require('dotenv').config();
const app = require('./app');
const { serverConfig, dbConfig } = require('./auth/config');
const dbConnection = require('./auth/dbconnection');

function initApp (serverConfig, dbConfig) {
    
  dbConnection(dbConfig);  
  
  app.listen(serverConfig.port, () => console.log(`Am alive on port ${serverConfig.port} ...`));
};

initApp(serverConfig, dbConfig);
