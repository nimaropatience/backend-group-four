const Produce = require('../models/producemodels');

const createProduce = async (req, res) => {
  const { ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice } = req.body;
  try {
    await Produce.create(ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice);
    res.status(201).json({ message: 'Produce added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllProduce = async (req, res) => {
  try {
    const [results] = await Produce.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProduceById = async (req, res) => {
  const ProduceId = req.params.id;
  try {
    const [results] = await Produce.getById(ProduceId);
    if (results.length === 0) return res.status(404).json({ error: 'Produce not found' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduce = async (req, res) => {
  const ProduceIdId = req.params.id;
  const { ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice } = req.body;
  try {
    await Produce.update(ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice);
    res.json({ message: 'Produce updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduce = async (req, res) => {
  const ProduceId = req.params.id;
  try {
    await Produce.delete(ProduceId);
    res.json({ message: 'Produce deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addProduceToProduce = async (req, res) => {
  const { userId, chapterId } = req.body;
  try {
    await Produce.addProduceToProduce(userId, chapterId);
    res.status(201).json({ message: 'Produce added to chapter successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProduceInProduce = async (req, res) => {
  const ProduceId = req.params.id;
  try {
    const [results] = await Produce.getProduceInProduce(ProduceId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports{
  createProduce,
  getAllProduce,
  getProduceById,
  updateProduce,
  deleteProduce,
  addProduceToProduce,
  getProduceInProduce,
};