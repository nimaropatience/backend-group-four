const user = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    const [results] = await user.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { username, email } = req.body;
  const userId = req.params.id;
  try {
    await user.update(userId, username, email);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await user.delete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers, updateUser, deleteUser };