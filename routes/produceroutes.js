const express = require('express');
const {createProduce, getAllProduce, getProduceById, updateProduce, deleteProduce, addProduceToProduce,getProduceInProduce} = require('../controllers/producecontroller');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/produce', authenticateToken, getAllProduce);
router.put('/produce/:id', authenticateToken, updateProduce);
router.delete('/produce/:id', authenticateToken, deleteProduce);
router.post('/produce', authenticateToken, createProduce);
router.get('/produce/:id', authenticateToken, getProduceById);
router.post('/produce/:id/produce', authenticateToken, addProduceToProduce);
router.get('/produce/:id/produce', authenticateToken, getProduceInProduce);


module.exports = router;