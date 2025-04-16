const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified, user:', user);
    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(403).json({ error: 'Access denied. Invalid or expired token.' });
  }
};

module.exports = authenticateToken;