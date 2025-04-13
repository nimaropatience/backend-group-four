const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' }); 
  }

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET); 
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Access denied. Invalid credentials.' }); 
  }
};

module.exports = authenticateToken;