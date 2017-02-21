const mongoose = require('mongoose');
const config = require('./config').database;


const uriConnection = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.db}`
mongoose.connect(uriConnection)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => {
    console.log('Database: Connection Succeded');
});

exports.mongoose = mongoose;
exports.db = db;