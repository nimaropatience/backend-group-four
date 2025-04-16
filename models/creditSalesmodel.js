const db = require('../config/db');

const CreditSales = {
  create: (BuyersName, NIN, Location, AmountDue, DueDate, ProduceId) => {
    const query = 'INSERT INTO CreditSales (BuyersName, NIN, Location, AmountDue, DueDate, ProduceId) VALUES (?, ?, ?, ?, ?, ?)';
    return db.promise().query(query, [BuyersName, NIN, Location, AmountDue, DueDate, ProduceId]);
  },

  getAll: () => {
    const query = 'SELECT * FROM CreditSales';
    return db.promise().query(query);
  },

  getById: (NIN) => {
    const query = 'SELECT * FROM CreditSales WHERE NIN = ?';
    return db.promise().query(query, [NIN]);
  },

  update: (BuyersName, NIN, Location, AmountDue, DueDate, ProduceId) => {
    const query = 'UPDATE CreditSales SET BuyersName = ?, Location = ?, AmountDue = ?, DueDate = ?, ProduceId = ? WHERE NIN = ?';
    return db.promise().query(query, [BuyersName, Location, AmountDue, DueDate, ProduceId, NIN]);
  },

  delete: (NIN) => {
    const query = 'DELETE FROM CreditSales WHERE NIN = ?';
    return db.promise().query(query, [NIN]);
  }
};

module.exports = CreditSales;