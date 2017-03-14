const mongoose = require('mongoose');
const config = require('./config').database;

console.log('Database: Connecting to DB... ⏲');


const uriConnection = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.db}`
const mongoOptions = {
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectionTimeout: 0
    }
  }
};

mongoose.connect(uriConnection, mongoOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => {
    console.log('Database: Connection Succeded ✔');
});

exports.db = db;
