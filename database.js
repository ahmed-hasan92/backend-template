const mongoo = require('mongoose');
require('dotenv').config();
const connectionString = process.env.MONGO;

const connection = () => {
  try {
    mongoo.connect(connectionString);
    console.log('The database is connected');
  } catch (error) {
    console.log('Error connecting the database');
  }
};

module.exports = connection;
