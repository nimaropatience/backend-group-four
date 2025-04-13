const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const userController = require('./userController');


router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt()
  ],
  userController.getAllUsers
);


router.put(
  '/:id',
  [
    param('id').isInt().withMessage('Invalid user ID'),
    body('username').notEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail()
  ],
  userController.updateUser
);


router.delete(
  '/:id',
  param('id').isInt().withMessage('Invalid user ID'),
  userController.deleteUser
);

module.exports = router;