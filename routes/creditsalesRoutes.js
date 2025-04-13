const express = require('express');
const {createcreditSales, getAllcreditSales, getcreditSalesById, updatecreditSales, deletecreditSales, addcreditSalesTocreditSales,getcreditSalesIncreditSales} = require('../controllers/creditSalescontroller');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/creditSales', authenticateToken, getAllcreditSales);
router.put('/creditSales/:id', authenticateToken, updatecreditSales);
router.delete('/creditSales/:id', authenticateToken, deletecreditSales);
router.post('/creditSales', authenticateToken, createcreditSales);
router.get('creditSales/:id', authenticateToken, getcreditSalesById);
router.post('/creditSales/:id/sales', authenticateToken, addcreditSalesTocreditSales);
router.get('/creditSales/:id/sales', authenticateToken, getAllcreditSales);


module.exports = router;