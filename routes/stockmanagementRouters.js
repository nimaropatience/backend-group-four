const express = require('express');
const router = express.Router();
const stockManagementController = require('../controllers/stockmanagementController');

router.post('/', stockManagementController.createStock);
router.get('/', stockManagementController.getAllStock);
router.get('/:ProduceId', stockManagementController.getStockById);
router.put('/:ProduceId', stockManagementController.updateStock);
router.delete('/:ProduceId', stockManagementController.deleteStock);

module.exports = router;