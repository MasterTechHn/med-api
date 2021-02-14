require('dotenv').config();
const app = require('./app');
const { serverConfig, dbConfig } = require('./auth/config');
const dbConnection = require('./auth/dbconnection');

async function initApp (serverConfig, dbConfig) {
  try {
    await dbConnection(dbConfig);  
    app.listen(serverConfig.port, () => console.log(`Am alive on port ${serverConfig.port} ...`));
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

initApp(serverConfig, dbConfig);
