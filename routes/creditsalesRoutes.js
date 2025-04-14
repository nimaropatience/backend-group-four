const express = require('express');
const authenticateToken = require('./middleware/authmiddleware');
const {createcreditSales, getAllcreditSales, getcreditSalesById, updatecreditSales, deletecreditSales, addBuyerTocreditSales} = require('../controllers/creditsalesController');

const router = express.Router();

router.get('/creditSales', authenticateToken, getAllcreditSales);
router.put('/creditSales/:id', authenticateToken, updatecreditSales);
router.delete('/creditSales/:id', authenticateToken, deletecreditSales);
router.post('/creditSales', authenticateToken, createcreditSales);
router.get('/creditSales/:id', authenticateToken, getcreditSalesById);
router.post('/creditSales/:id/sales', authenticateToken, addBuyerTocreditSales);
router.get('/creditSales/:id/sales', authenticateToken, getAllcreditSales);


module.exports = router;