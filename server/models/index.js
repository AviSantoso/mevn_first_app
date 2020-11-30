const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const URL = `${
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
}/todo-app`;

const db = {
  mongoose,
  URL,
};

db.todo = require('./todo.js')(mongoose);

module.exports = db;
