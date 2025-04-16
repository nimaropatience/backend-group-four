const StockManagement = require('../models/stockManagementmodel');

const stockManagementController = {
  createStock: async (req, res) => {
    try {
      const { ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage } = req.body;
      if (!ProduceName || !ProduceId || TonnageSold == null || TonnageBought == null || CurrentTonnage == null) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      await StockManagement.create(ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage);
      res.status(201).json({ message: 'Stock entry created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating stock entry', details: error.message });
    }
  },

  getAllStock: async (req, res) => {
    try {
      const [stock] = await StockManagement.getAll();
      res.status(200).json(stock);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching stock entries', details: error.message });
    }
  },

  getStockById: async (req, res) => {
    try {
      const { ProduceId } = req.params;
      const [stock] = await StockManagement.getById(ProduceId);
      if (stock.length === 0) {
        return res.status(404).json({ error: 'Stock entry not found' });
      }
      res.status(200).json(stock[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching stock entry', details: error.message });
    }
  },

  updateStock: async (req, res) => {
    try {
      const { ProduceId } = req.params;
      const { ProduceName, TonnageSold, TonnageBought, CurrentTonnage } = req.body;
      if (!ProduceName || TonnageSold == null || TonnageBought == null || CurrentTonnage == null) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const [result] = await StockManagement.update(ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Stock entry not found' });
      }
      res.status(200).json({ message: 'Stock entry updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating stock entry', details: error.message });
    }
  },

  deleteStock: async (req, res) => {
    try {
      const { ProduceId } = req.params;
      const [result] = await StockManagement.delete(ProduceId);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Stock entry not found' });
      }
      res.status(200).json({ message: 'Stock entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting stock entry', details: error.message });
    }
  }
};

module.exports = stockManagementController;