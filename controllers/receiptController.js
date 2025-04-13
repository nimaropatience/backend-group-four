const Receipt = require('../models/producemodels');

const createReceipt = async (req, res) => {
  const {ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName } = req.body;
  try {
    await Produce.create(ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName);
    res.status(201).json({ message: 'Receipt added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllReceipt = async (req, res) => {
  try {
    const [results] = await Receipt.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getReceiptById = async (req, res) => {
  const ReceiptID = req.params.id;
  try {
    const [results] = await Receipt.getById(ReceiptID);
    if (results.length === 0) return res.status(404).json({ error: 'Receipt not found' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateReceipt = async (req, res) => {
  const ReceiptIDId = req.params.id;
  const {ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName} = req.body;
  try {
    await Receipt.update(ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName);
    res.json({ message: 'Receipt updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteReceipt = async (req, res) => {
  const ReceiptId = req.params.id;
  try {
    await Receipt.delete(ReceiptId);
    res.json({ message: 'Receipt deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addReceiptToReceipt = async (req, res) => {
  const { userId, chapterId } = req.body;
  try {
    await Receipt.addReceiptToReceipt(userId, chapterId);
    res.status(201).json({ message: 'Receipt added to chapter successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getReceiptInReceipt = async (req, res) => {
  const ReceiptId = req.params.id;
  try {
    const [results] = await Receipt.getReceiptInReceipt(ReceiptId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createReceipt,
  getAllReceipt,
  getReceiptById,
  updateReceipt,
  deleteReceipt,
  addReceiptToReceipt,
  getReceiptInReceipt,
};