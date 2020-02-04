const jwt = require('jsonwebtoken');
const jwtSecret = require('../config').jwtSecret;


// Opt in middleware to protect routes
const restricted = async (req, res, next) => {
   const token = req.headers.authorization;
   if(token) {
     jwt.verify(token, jwtSecret, (err, decodedToken) => {
       if(err) {
         return res.status(401).json({ message: `Invalid token.` });
       } 
         req.decoded = decodedToken;
         next();
       });
    } 
    
    return  res.status(401).json({ message: `No token provided.` });
};


// Function to generate tokens for user authorization
const generateAuthToken = async (user) => {
  const jwtPayload = { user: user.id };
  const jwtOptions = {
    expiresIn: '2h'
  };
  
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};

module.exports = {
  restricted,
  generateAuthToken
};
