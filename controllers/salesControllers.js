const Sales = require('../models/salesmodels');

const createSales = async (req, res) => {
  const { SalesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact } = req.body;
  try {
    await Sales.create(SalesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact);
    res.status(201).json({ message: 'Sales added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const [results] = await Sales.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getSalesById = async (req, res) => {
  const SalesId = req.params.id;
  try {
    const [results] = await Sales.getById(SalesId);
    if (results.length === 0) return res.status(404).json({ error: 'Sales not found' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSales = async (req, res) => {
  const salesId = req.params.id;
  const { ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact } = req.body;
  try {
    await Sales.update(salesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact);
    res.json({ message: 'Sales updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSales = async (req, res) => {
  const SalesId = req.params.id;
  try {
    await Sales.delete(SalesId);
    res.json({ message: 'Sales deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addSalesToSales = async (req, res) => {
  const { userId, SalesId } = req.body;
  try {
    await Sales.addSalesToSales(userId, SalesId);
    res.status(201).json({ message: 'Sales added to Sales successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSalesInSales = async (req, res) => {
  const SalesId = req.params.id;
  try {
    const [results] = await Sales.getSalesInSales(SalesId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
  updateSales,
  deleteSales,
  addSalesToSales,
  getSalesInSales,
};