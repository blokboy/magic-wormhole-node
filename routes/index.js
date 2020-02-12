const router = require('express').Router();

const userAPIEndpoint = require('./user');
const wormholeAPIEndpoint = require('./wormhole');
const model = require('../model');

router.use('/user', userAPIEndpoint);
router.use('/wormhole', wormholeAPIEndpoint);

router.get('/', async (req, res) => {
  try {
    return res.status(200).json({ message: `[Route] -> ${req.url} <- welcome to the Magic Wormhole (Node) API entry point!` });
  } catch({ message }) {
    return res.status(404).json({ message });
  }
});

module.exports = router;
  


