const Sales = require('../models/salesmodels');

const salesController = {
  createSale: async (req, res) => {
    try {
      const { SalesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact } = req.body;
      if (!SalesId || !ProduceName || !Tonnage || !AmountPaid || !BuyersName || !SalesAgentsName || !Date || !Time || !BuyersContact) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      await Sales.create(SalesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact);
      res.status(201).json({ message: 'Sale created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating sale', details: error.message });
    }
  },

  getAllSales: async (req, res) => {
    try {
      const [sales] = await Sales.getAll();
      res.status(200).json(sales);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching sales', details: error.message });
    }
  },

  getSaleById: async (req, res) => {
    try {
      const { SalesId } = req.params;
      const [sales] = await Sales.getById(SalesId);
      if (sales.length === 0) {
        return res.status(404).json({ error: 'Sale not found' });
      }
      res.status(200).json(sales[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching sale', details: error.message });
    }
  },

  updateSale: async (req, res) => {
    try {
      const { SalesId } = req.params;
      const { ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact } = req.body;
      if (!ProduceName || !Tonnage || !AmountPaid || !BuyersName || !SalesAgentsName || !Date || !Time || !BuyersContact) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const [result] = await Sales.update(SalesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Sale not found' });
      }
      res.status(200).json({ message: 'Sale updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating sale', details: error.message });
    }
  },

  deleteSale: async (req, res) => {
    try {
      const { SalesId } = req.params;
      const [result] = await Sales.delete(SalesId);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Sale not found' });
      }
      res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting sale', details: error.message });
    }
  }
};

module.exports = salesController;