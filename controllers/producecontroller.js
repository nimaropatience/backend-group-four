const Produce = require('../models/produceModel');

const produceController = {
  createProduce: async (req, res) => {
    try {
      const { ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice } = req.body;
      if (!ProduceId || !ProduceName || !Type || !Date || !Time || !Tonnage || !Cost || !DealerName || !Branch || !Contact || !SellingPrice) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      await Produce.create(ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice);
      res.status(201).json({ message: 'Produce created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating produce', details: error.message });
    }
  },

  getAllProduce: async (req, res) => {
    try {
      const [produce] = await Produce.getAll();
      res.status(200).json(produce);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching produce', details: error.message });
    }
  },

  getProduceById: async (req, res) => {
    try {
      const { ProduceId } = req.params;
      const [produce] = await Produce.getById(ProduceId);
      if (produce.length === 0) {
        return res.status(404).json({ error: 'Produce not found' });
      }
      res.status(200).json(produce[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching produce', details: error.message });
    }
  },

  updateProduce: async (req, res) => {
    try {
      const { ProduceId } = req.params;
      const { ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice } = req.body;
      if (!ProduceName || !Type || !Date || !Time || !Tonnage || !Cost || !DealerName || !Branch || !Contact || !SellingPrice) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const [result] = await Produce.update(ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Produce not found' });
      }
      res.status(200).json({ message: 'Produce updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating produce', details: error.message });
    }
  },

  deleteProduce: async (req, res) => {
    try {
      const { ProduceId } = req.params;
      const [result] = await Produce.delete(ProduceId);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Produce not found' });
      }
      res.status(200).json({ message: 'Produce deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting produce', details: error.message });
    }
  }
};

module.exports = produceController;