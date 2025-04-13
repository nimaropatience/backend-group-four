const express = require('express');
const { getAllUsers, updateUser, deleteUser, createUsers } = require('../controllers/userController');
const authenticateToken = require('./middleware/authmiddleware');

const router = express.Router();

router.get('/users', authenticateToken, getAllUsers);
router.put('/users/:email', authenticateToken, updateUser);
router.delete('/users/:email', authenticateToken, deleteUser);
router.post('users/', authenticateToken, createUsers);

module.exports = router;