const router = require('express').Router();
const userAPIEndpoint = require('./user');

router.use('/users', userAPIEndpoint);

router.get('/', async (req, res) => {
  try {
    return res.status(200).json({ message: `[Route] -> ${req.url} <- welcome to the API entry point!` });
  } catch({ message }) {
    return res.status(404).json({ message });
  }
});

module.exports = router;
