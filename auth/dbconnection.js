const mongoose = require('mongoose');

mongoose.connection.on('open', () => console.log('DataBase is now connected..'));

async function dbConnection ({port, host, db,user,password}) {
  const uri = `mongodb+srv://${user}:${password}${host}${db}?retryWrites=true&w=majority`;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
};

module.exports = dbConnection;
