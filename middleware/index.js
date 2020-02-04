/*
  This is where we specify the required middleware that every single request to our API will
  have to go through in the exact order as the middleware is called within the configureMiddleware
  function. The app argument takes the actual express app as the argument and wraps it in the middleware. 
  For this function, we just need to define it then export it to be called on the overall app object
  we define in app.js
*/

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('../routes');

const configureMiddleware = app => {
  app.use(helmet());
  app.use(logger('combined'));
  app.use(cors());
  app.use(express.json());
  app.use('/API', routes);
};

module.exports = configureMiddleware;
