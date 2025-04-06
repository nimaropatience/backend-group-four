const db = require('../config/db');

const Receipt = {
  create: (ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName) => {
    const query = 'INSERT INTO Receipt (ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName) VALUES (?, ?)';
    return db.promise().query(query, [ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName]);
  },

  getAll: () => {
    const query = 'SELECT * FROM Receipt';
    return db.promise().query(query);
  },

  getById: (id) => {
    const query = 'SELECT * FROM Receipt WHERE id = ?';
    return db.promise().query(query, [ReceiptID]);
  },

  update: (ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName) => {
    const query = 'UPDATE Receipt SET name = ?, description = ? WHERE id = ?';
    return db.promise().query(query, [ReceiptID, AmountPaid, SalesAgentsName, BuyersName, ProduceName]);
  },

  delete: (ReceiptID) => {
    const query = 'DELETE FROM Receipt WHERE ReceiptID = ?';
    return db.promise().query(query, [ReceiptID]);
  },


//   getUsersInChapter: (chapterId) => {
//     const query = `
//       SELECT users.id, users.username, users.email 
//       FROM users 
//       JOIN user_chapters ON users.id = user_chapters.user_id 
//       WHERE user_chapters.chapter_id = ?
//     `;
//     return db.promise().query(query, [chapterId]);
//   },
};

module.exports = Receipt;