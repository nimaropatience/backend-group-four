const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/receiptController');

router.post('/', receiptController.createReceipt);
router.get('/', receiptController.getAllReceipts);
router.get('/:ReceiptID', receiptController.getReceiptById);
router.put('/:ReceiptID', receiptController.updateReceipt);
router.delete('/:ReceiptID', receiptController.deleteReceipt);

module.exports = router;