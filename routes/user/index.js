const router = require('express').Router();
const model = require('../../model');

router.get('/', async (req, res) => {
  try {
    const users = await model.get('Users');
    
    if(users) {
      return res.status(200).json({ message: `Users successfully retrieved.`, users });
    }
    
    return res.status(404).json({ message: `No users could be retrieved from storage.` });                     
  } catch({ message }) {
    return res.status(500).json({ message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const userExists = await model.findBy('Users', { id });
    
    if(userExists) {
      return res.status(200).json({ message: `User successfully retrieved`, userExists });
    } 
    
    return res.status(404).json({ message: `No user was found at that ID.` });
  } catch({ message }) {
    return res.status(500).json({ message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const userEdited = await model.update('Users', id, { ...req.body });
    
    if(userEdited) {
      return res.status(200).json({ message: `User successfully edited.` });
    }
    
    return res.status(404).json({ message: `No user was found at that ID.` });
  } catch({ message }) {
    return res.status(500).json({ message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const userDeleted = await model.remove('Users', id);
    
    if(userDeleted) {
      return res.status(200).json({ message: `User successfully deleted.` });
    } 
    
    return res.status(404).json({ message: `No user was found at that ID.` });
  } catch({ message }) {
    return res.status(500).json({ message });
  }
});

router.post('/register', async (req, res) => {
  if(!req.body.first_name || !req.body.last_name || !req.body.password || !req.body.email) {
    return res.status(409).json({ message: `Registration fields not completed.` });
  }
  
  try {
    const userAlreadyExists = await model.findBy('Users', { email: req.body.email });
    
    if(userAlreadyExists) {
      return res.status(200).json({ message: `There is already an account registered to that email address.` });
    }
    
    const token = await model.register({ ...req.body });
    
    if(token) {
      return res.status(201).json({ message: `User successfully registered.`, token });
    }
    
    return res.status(200).json({ message: `Invalid credentials entered.` });
  } catch({ message }) {
    return res.status(500).json({ message });
  }
});

router.post('/login', async (req, res) => {
  if(!req.body.email || !req.body.password) {
    return res.status(409).json({ message: `Login fields not completed.` });
  }
  
  try {
    const userExists = await model.findBy('Users', { email: req.body.email });
    
    if(userExists) {
      const token = await model.login({ ...req.body });
      ;
      if(token) {
        return res.status(200).json({ message: `User successfully logged in.`, token });
      }
      
      return res.status(404).json({ message: `There was an issue generating a token for this ID.` });
    }
    
    return res.status(404).json({ message: `There is no account at this email address.` });
  } catch({ message }) {
    return res.status(500).json({ message });
  }
  
});

module.exports = router;
