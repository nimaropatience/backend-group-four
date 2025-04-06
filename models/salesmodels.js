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
    const query = 'UPDATE chapters SET ProduceName = ?, Tonnage = ?, AmountPaid = ?, BuyersName = ?, SalesAgentsName = ?, Date = ?, Time = ?, BuyersContact = ? WHERE SalesId = ?';
    return db.promise().query(query, [SalesId, ProduceName, Tonnage, AmountPaid, BuyersName, SalesAgentsName, Date, Time, BuyersContact]);
  },

  delete: (SalesId) => {
    const query = 'DELETE FROM Sales WHERE SalesId = ?';
    return db.promise().query(query, [SalesId]);
  }


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

module.exports = Sales;