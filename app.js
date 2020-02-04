const express = require('express');
const configureMiddleware = require('./middleware');

const app = express();
configureMiddleware(app);

app.get('/', async (req, res) => {
  return res.status(200).json({ message: `[Route] -> ${req.url} <- is valid.` });
});

module.exports = app;
