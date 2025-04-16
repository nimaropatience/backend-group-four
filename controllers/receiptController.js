const Receipt = require('../models/receiptmodel');

const receiptController = {
  createReceipt: async (req, res) => {
    try {
      const { ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName } = req.body;
      if (!ReceiptID || !AmountPaid || !SalesAgentsName || !BuyersName || !ProduceName) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      await Receipt.create(ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName);
      res.status(201).json({ message: 'Receipt created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating receipt', details: error.message });
    }
  },

  getAllReceipts: async (req, res) => {
    try {
      const [receipts] = await Receipt.getAll();
      res.status(200).json(receipts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching receipts', details: error.message });
    }
  },

  getReceiptById: async (req, res) => {
    try {
      const { ReceiptID } = req.params;
      const [receipts] = await Receipt.getById(ReceiptID);
      if (receipts.length === 0) {
        return res.status(404).json({ error: 'Receipt not found' });
      }
      res.status(200).json(receipts[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching receipt', details: error.message });
    }
  },

  updateReceipt: async (req, res) => {
    try {
      const { ReceiptID } = req.params;
      const { AmountPaid, SalesAgentsName, BuyersName, ProduceName } = req.body;
      if (!AmountPaid || !SalesAgentsName || !BuyersName || !ProduceName) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const [result] = await Receipt.update(ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Receipt not found' });
      }
      res.status(200).json({ message: 'Receipt updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating receipt', details: error.message });
    }
  },

  deleteReceipt: async (req, res) => {
    try {
      const { ReceiptID } = req.params;
      const [result] = await Receipt.delete(ReceiptID);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Receipt not found' });
      }
      res.status(200).json({ message: 'Receipt deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting receipt', details: error.message });
    }
  }
};

module.exports = receiptController;