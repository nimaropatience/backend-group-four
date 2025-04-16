const User = require('../models/user');

const userController = {
  createUser: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      await User.create(username, password, email);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user', details: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const [users] = await User.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
  },

  getUserByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const [users] = await User.getByEmail(email);
      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(users[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user', details: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { email } = req.params;
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }
      const [result] = await User.update(username, email);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating user', details: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { email } = req.params;
      const [result] = await User.delete(email);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user', details: error.message });
    }
  }
};

module.exports = userController;