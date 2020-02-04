require('dotenv').config();

/*
  The config file here simply creates an object called config that contains all the 
  secrets we are storing using .env -> just a cleaner level of abstraction and separation.
  Export the object and use whatever relevant key/values you need from this object in any file.
*/

const config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL
  // Add additional config variables from dotenv here
};

module.exports = config;
