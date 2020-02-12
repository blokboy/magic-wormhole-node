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

router.post('/send', async (req, res) => {
  const { content } = req.body;
  
  try {
    if(!req.body.content) {
      return res.status(409).json({ message: `You can't open an empty wormhole. (add content flag or content) ` });
    }

    const [ id ] = await model.add('Wormholes', { content });
    if(id) {
      const wormhole = await model.findBy('Wormholes', { id });
      if(!wormhole) {
        return res.status(404).json({ message: `There was an issue retrieving the wormhole!` });
      }
      return res.status(201).json({ 
        message: `Wormhole successfully created! Send the user your Wormhole ID: ${wormhole.wormhole_id}` 
      });
    }
  } catch({ message }) {

  }
});

router.post('/receive', async (req, res) => {
  const { id } = req.body;
});
module.exports = router;
