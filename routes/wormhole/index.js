require('dotenv').config();
const model = require('../../model');
const db = require('../../data/dbConfig');

router.get('/', async (req, res) => {
  try {
    const wormholes = await db.collection('Wormholes');

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

/*
router.post('/send', async (req, res) => {
  const { content } = req.body;
  let wormhole_id = Math.ceil(Math.random() * 9999999999);

  try {
    if(!content) {
      return res.status(409).json({ message: `You cannot open a wormhole without providing content.` });
    }

    const [ id ] = await model.add('Wormholes', { content });
    if(!id) {
      return res.status(404).json({ message: `There was an issue adding Wormhole to the relay server.` });
    }  
    
    let wormhole = await model.findBy('Wormholes', { wormhole_id });
    if(wormhole) {
      wormhole_id = Math.ceil(Math.random() * 9999999999);
    }

    const wormholeIdUpdated = await model.update('Wormholes', id, { wormhole_id });
    if(wormholeIdUpdated) {
      wormhole = await model.findBy('Wormholes', { wormhole_id }); 
    }

    return res.status(201).json({ message: `Your wormhole has been opened! Share your ID with your intended recipient: ${ wormhole_id }.` });
  } catch({ message }) {
    return res.status(500).json({ message });
  }
});

router.post('/receive', async (req, res) => {
  const { wormhole_id } = req.body;
  
  try {
    if(!wormhole_id) {
      return res.status(409).json({ message: `You must enter a wormhole ID.` });
    }

    const wormholeFound = await model.findBy('Wormholes', { wormhole_id });
    if(!wormholeFound) {
      return res.status(404).json({ message: `There was no wormhole found at the specified ID.` });
    }
    
    const wormholeDeleted = await model.remove('Wormholes', wormholeFound.id);
    if(!wormholeDeleted) {
      return res.status(404).json({ message: `There was an issue closing the wormhole!` });
    } 
    
    return res.status(200).json({ 
      message: `Wormhole successfully retrieved and closed!`,
      content: wormholeFound.content
    });
  } catch({ message }) {
    return res.status(500).json({ message });
  }
});
*/
module.exports = router;
