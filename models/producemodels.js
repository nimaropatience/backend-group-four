const db = require('../config/db');

const Produce = {
  create: (ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice) => {
    const query = 'INSERT INTO produce (ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return db.promise().query(query, [ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice]);
  },

  getAll: () => {
    const query = 'SELECT * FROM produce';
    return db.promise().query(query);
  },

  getById: (ProduceId) => {
    const query = 'SELECT * FROM produce WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceId]);
  },

  update: (ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice) => {
    const query = 'UPDATE produce SET ProduceName = ?, Type = ?, Date = ?, Time = ?, Tonnage = ?, Cost = ?, DealerName = ?, Branch = ?, Contact = ?, SellingPrice = ? WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice, ProduceId]);
  },

  delete: (ProduceId) => {
    const query = 'DELETE FROM produce WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceId]);
  }
};

module.exports = Produce; 