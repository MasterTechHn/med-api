require('dotenv').config();
process.env.NODE_ENV = 'test';
const { dbConfig } = require('./config');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

async function removeAllCollections() {
  try {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany();
    }
  } catch (error) {
    // Sometimes this error happens, but you can safely ignore it
    if (error.message === 'ns not found') return
    // This error occurs when you use it.todo. You can
    // safely ignore this error too
    if (error.message.includes('a background operation is currently running')) return
      console.log(error.message)
  }
};

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {      
      if (error.message === 'ns not found') return
      if (error.message.includes('a background operation is currently running')) return
        console.log(error.message)
    }
  }
}

module.exports = {
  setupDB () {
    // Connect to Mongoose
    beforeAll(async () => {
      try {
        const uri = `mongodb+srv://${dbConfig.user}:${dbConfig.password}${dbConfig.host}${dbConfig.db}?retryWrites=true&w=majority`;
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      } catch (error) {
        console.log(error);
      }
    });

    // Cleans up database between each test
    // afterEach(async () => {
    //     await removeAllCollections();
    // });

    // Disconnect Mongoose
    afterAll(async () => {
        await removeAllCollections();
        await dropAllCollections();
        await mongoose.connection.close();
    });
  }
};
