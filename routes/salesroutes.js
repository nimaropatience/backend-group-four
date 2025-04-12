const express = require('express');
const {createsales, getAllsales, getsalesById, updatesales, deletesales, addsalesTosales,getsalesInsales} = require('../controllers/salescontroller');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/sales', authenticateToken, getAllsales);
router.put('/sales/:id', authenticateToken, updatesales);
router.delete('/sales/:id', authenticateToken, deletesales);
router.post('/sales', authenticateToken, createsales);
router.get('sales/:id', authenticateToken, getsalesById);
router.post('/sales/:id/sales', authenticateToken, addsalesTosales);
router.get('/sales/:id/sales', authenticateToken, getsalesInsales);


module.exports = router;