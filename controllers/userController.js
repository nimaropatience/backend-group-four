const user = require('../models/user');
const { validationResult } = require('express-validator');


const createUsers = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    await Produce.create(username, password, email);
    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const [results, totalCount] = await user.getAll(limit, offset); 
    
    res.json({
      data: results,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching users:', err); 
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email } = req.body;
  const userId = req.params.id;

  try {
  
    const [userExists] = await user.getById(userId);
    if (!userExists || userExists.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const [existingEmail] = await user.getByEmail(email);
    if (existingEmail && existingEmail.id !== userId) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    await user.update(userId, username, email);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};


const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {

    const [userExists] = await user.getById(userId);
    if (!userExists || userExists.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await user.delete(userId);
    res.status(204).send(); 
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {createUsers, getAllUsers, updateUser, deleteUser };