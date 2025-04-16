const express = require('express');
const router = express.Router();
const produceController = require('../controllers/produceController');

router.post('/', produceController.createProduce);
router.get('/', produceController.getAllProduce);
router.get('/:ProduceId', produceController.getProduceById);
router.put('/:ProduceId', produceController.updateProduce);
router.delete('/:ProduceId', produceController.deleteProduce);

module.exports = router;