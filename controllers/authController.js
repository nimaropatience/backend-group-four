const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authController = {
  register: async (req, res) => {
    try {
      const { username, password, email, role } = req.body;
      if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required' });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }
      if (role === 'ceo') {
        return res.status(403).json({ error: 'Cannot register as CEO' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Registering user:', { username, email });
      await User.create(username, hashedPassword, email, role || 'user');
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Register error:', error.message);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
      res.status(500).json({ error: 'Error registering user', details: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
      console.log('Login attempt for:', username);
      const [users] = await User.findByUsername(username);
      if (!users || users.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }
      const user = users[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid password' });
      }
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: 'Error logging in', details: error.message });
    }
  }
};

module.exports = authController;