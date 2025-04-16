const db = require('../config/db');

const Sales = {
  create: (SalesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact) => {
    const query = 'INSERT INTO Sales (SalesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return db.promise().query(query, [SalesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact]);
  },

  getAll: () => {
    const query = 'SELECT * FROM Sales';
    return db.promise().query(query);
  },

  getById: (SalesId) => {
    const query = 'SELECT * FROM Sales WHERE SalesId = ?';
    return db.promise().query(query, [SalesId]);
  },

  update: (SalesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact) => {
    const query = 'UPDATE Sales SET ProduceName = ?, Tonnage = ?, AmountPaid = ?, BuyersName = ?, SalesAgentsName = ?, Date = ?, Time = ?, BuyersContact = ? WHERE SalesId = ?';
    return db.promise().query(query, [ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact, SalesId]);
  },

  delete: (SalesId) => {
    const query = 'DELETE FROM Sales WHERE SalesId = ?';
    return db.promise().query(query, [SalesId]);
  }
};

module.exports = Sales;