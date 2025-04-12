const express = require('express');
const {createcreditSales,getAllcreditSales,getcreditSalesById,updatecreditSales,deletecreditSales,addBuyerTocreditSales,getBuyerIncreditSales,} = require('../controllers/producecontroller');
const authenticateToken = require('./middleware/authmiddleware');

const router = express.Router();

router.get('/creditsales', authenticateToken, getAllcreditSales);
router.put('/creditsales/:id', authenticateToken, updatecreditSales);
router.delete('/creditsales/:id', authenticateToken, deletecreditSales);
router.post('/creditsales', authenticateToken, createcreditSales);
router.get('/creditsales/:id', authenticateToken, getcreditSalesById);
router.post('/creditsales/:id/creditsales', authenticateToken, addBuyerTocreditSales);
router.get('/creditsales/:id/creditsales', authenticateToken, getBuyerIncreditSales);


module.exports = router;