const CreditSales = require('../models/creditSalesmodel');

const creditSalesController = {
  createCreditSale: async (req, res) => {
    try {
      const { BuyersName, NIN, Location, AmountDue, DueDate, ProduceId } = req.body;
      if (!BuyersName || !NIN || !Location || !AmountDue || !DueDate || !ProduceId) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      await CreditSales.create(BuyersName, NIN, Location, AmountDue, DueDate, ProduceId);
      res.status(201).json({ message: 'Credit sale created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating credit sale', details: error.message });
    }
  },

  getAllCreditSales: async (req, res) => {
    try {
      const [creditSales] = await CreditSales.getAll();
      res.status(200).json(creditSales);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching credit sales', details: error.message });
    }
  },

  getCreditSaleById: async (req, res) => {
    try {
      const { NIN } = req.params;
      const [creditSales] = await CreditSales.getById(NIN);
      if (creditSales.length === 0) {
        return res.status(404).json({ error: 'Credit sale not found' });
      }
      res.status(200).json(creditSales[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching credit sale', details: error.message });
    }
  },

  updateCreditSale: async (req, res) => {
    try {
      const { NIN } = req.params;
      const { BuyersName, Location, AmountDue, DueDate, ProduceId } = req.body;
      if (!BuyersName || !Location || !AmountDue || !DueDate || !ProduceId) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const [result] = await CreditSales.update(BuyersName, NIN, Location, AmountDue, DueDate, ProduceId);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Credit sale not found' });
      }
      res.status(200).json({ message: 'Credit sale updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating credit sale', details: error.message });
    }
  },

  deleteCreditSale: async (req, res) => {
    try {
      const { NIN } = req.params;
      const [result] = await CreditSales.delete(NIN);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Credit sale not found' });
      }
      res.status(200).json({ message: 'Credit sale deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting credit sale', details: error.message });
    }
  }
};

module.exports = creditSalesController;