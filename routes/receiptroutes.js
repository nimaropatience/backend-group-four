const express = require('express');
const {createreceipt, getAllreceipt, getreceiptById, updatereceipt, deletereceipt, addreceiptToreceipt,getreceiptInreceipt} = require('../controllers/receiptcontroller');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();



router.get('/receipt', authenticateToken, getAllreceipt);
router.put('/receipt/:id', authenticateToken, updatereceipt);
router.delete('/receipt/:id', authenticateToken, deletereceipt);
router.post('/receipt', authenticateToken, createreceipt);
router.get('receipt/:id', authenticateToken, receiptById);
router.post('/sales/:id/receipt', authenticateToken, addreceiptToreceipt);
router.get('/sales/:id/receipt', authenticateToken, getreceiptInreceipt);


module.exports = router;