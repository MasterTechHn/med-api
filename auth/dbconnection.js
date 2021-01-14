const mongoose = require('mongoose');

mongoose.connection.on('open', () => console.log('DataBase is now connected..'));

function dbConnection ({port, host, db}) {
  const uri = `mongodb://${host}:${port}/${db}`;
  const connection = mongoose.connect(uri, {useNewUrlParser: true})
  .then( (data) => {},
     err => {
      console.log(err);
      process.exit(0);
  });

  return connection;
};

module.exports = dbConnection;
