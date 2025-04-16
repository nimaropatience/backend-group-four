const db = require('../config/db');

const StockManagement = {
  create: (ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage) => {
    const query = 'INSERT INTO StockManagement (ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage) VALUES (?, ?, ?, ?, ?)';
    return db.promise().query(query, [ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage]);
  },

  getAll: () => {
    const query = 'SELECT * FROM StockManagement';
    return db.promise().query(query);
  },

  getById: (ProduceId) => {
    const query = 'SELECT * FROM StockManagement WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceId]);
  },

  update: (ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage) => {
    const query = 'UPDATE StockManagement SET ProduceName = ?, TonnageSold = ?, TonnageBought = ?, CurrentTonnage = ? WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceName, TonnageSold, TonnageBought, CurrentTonnage, ProduceId]);
  },

  delete: (ProduceId) => {
    const query = 'DELETE FROM StockManagement WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceId]);
  }
};

module.exports = StockManagement;