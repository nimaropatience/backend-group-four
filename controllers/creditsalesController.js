const creditSales = require('../models/creditSalesmodel');

const createcreditSales = async (req, res) => {
  const { 
    BuyersName, NIN, Location, AmountDue, DueDate, ProduceId
   } = req.body;
  try {
    await creditSales.create(
      BuyersName, NIN, Location, AmountDue, DueDate, ProduceId
    );
    res.status(201).json({ message: 'creditSales added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllcreditSales = async (req, res) => {
  try {
    const [results] = await creditSales.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getcreditSalesById = async (req, res) => {
  const NIN = req.params.id;
  try {
    const [results] = await creditSales.getById(NIN);
    if (results.length === 0) return res.status(404).json({ error: 'creditSales not found' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatecreditSales = async (req, res) => {
  const NINId = req.params.id;
  const { BuyersName, NIN, Location, AmountDue, DueDate, ProduceId } = req.body;
  try {
    await creditSales.update(BuyersName, NIN, Location, AmountDue, DueDate, ProduceId);
    res.json({ message: 'creditSales updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletecreditSales = async (req, res) => {
  const NIN = req.params.id;
  try {
    await creditSales.delete(NIN);
    res.json({ message: 'creditSales deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addBuyerTocreditSales = async (req, res) => {
  const { userId, chapterId } = req.body;
  try {
    await creditSales.addBuyerTocreditSales(userId, chapterId);
    res.status(201).json({ message: 'creditSales added to chapter successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBuyerIncreditSales = async (req, res) => {
  const NIN = req.params.id;
  try {
    const [results] = await creditSales.getBuyerIncreditSales(NIN);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createcreditSales,
  getAllcreditSales,
  getcreditSalesById,
  updatecreditSales,
  deletecreditSales,
  addBuyerTocreditSales,
  getBuyerIncreditSales,
};