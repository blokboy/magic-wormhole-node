const router = require('express').Router();
const model = require('../../model');

router.get('/', async (req, res) => {
  try {
    const wormholes = await model.get('Wormholes');

    if(wormholes) {
      return res.status(200).json({
        message: `Wormholes successfully retrieved!`,
        wormholes
      });
    }

    return res.status(200).json({ message: `There are currently no open wormholes.` });
  } catch({ message }) {
    return res.status(500).json({ message });
  }
});

module.exports = router;
