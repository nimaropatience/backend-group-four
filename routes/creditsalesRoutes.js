const express = require('express');
const router = express.Router();
const creditSalesController = require('../controllers/creditsalesController');

router.post('/', creditSalesController.createCreditSale);
router.get('/', creditSalesController.getAllCreditSales);
router.get('/:NIN', creditSalesController.getCreditSaleById);
router.put('/:NIN', creditSalesController.updateCreditSale);
router.delete('/:NIN', creditSalesController.deleteCreditSale);

module.exports = router;