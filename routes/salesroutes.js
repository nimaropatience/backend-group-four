const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesControllers');


router.post('/', salesController.createSale);
router.get('/', salesController.getAllSales);
router.get('/:SalesId', salesController.getSaleById);
router.put('/:SalesId', salesController.updateSale);
router.delete('/:SalesId', salesController.deleteSale);

module.exports = router;