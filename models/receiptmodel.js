const db = require('../config/db');

const Receipt = {
  create: (ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName) => {
    const query = 'INSERT INTO Receipt (ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName) VALUES (?, ?, ?, ?, ?)';
    return db.promise().query(query, [ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName]);
  },

  getAll: () => {
    const query = 'SELECT * FROM Receipt';
    return db.promise().query(query);
  },

  getById: (ReceiptID) => {
    const query = 'SELECT * FROM Receipt WHERE ReceiptID = ?';
    return db.promise().query(query, [ReceiptID]);
  },

  update: (ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName) => {
    const query = 'UPDATE Receipt SET AmountPaid = ?, SalesAgentsName = ?, BuyersName = ?, ProduceName = ? WHERE ReceiptID = ?';
    return db.promise().query(query, [AmountPaid, SalesAgentsName, BuyersName, ProduceName, ReceiptID]);
  },

  delete: (ReceiptID) => {
    const query = 'DELETE FROM Receipt WHERE ReceiptID = ?';
    return db.promise().query(query, [ReceiptID]);
  }
};

module.exports = Receipt;