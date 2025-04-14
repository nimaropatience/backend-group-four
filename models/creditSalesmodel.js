const db = require('../config/db');

const creditSales = {
  create: (BuyersName, NIN, Location, AmountDue, DueDate, ProduceId) => {
    const query = 'INSERT INTO creditsales (BuyersName, NIN, Location, AmountDue, DueDate, ProduceId) VALUES (?, ?, ?, ?, ?, ?)';
    return db.promise().query(query, [BuyersName, NIN, Location, AmountDue, DueDate, ProduceId]);
  },

  getAll: () => {
    const query = 'SELECT * FROM creditSales';
    return db.promise().query(query);
  },

  getById: (NIN) => {
    const query = 'SELECT * FROM creditSales WHERE NIN = ?';
    return db.promise().query(query, [NIN]);
  },

  update: (BuyersName, NIN, Location, AmountDue, DueDate, ProduceId) => {
    const query = 'UPDATE creditSales SET BuyersName = ?, NIN = ?, Location = ?, AmountDue = ?, DueDate = ?, ProduceId = ? WHERE NIN = ?';
    return db.promise().query(query, [BuyersName, NIN, Location, AmountDue, DueDate, ProduceId, NIN]);
  },

  delete: (NIN) => {
    const query = 'DELETE FROM creditSales WHERE NIN = ?';
    return db.promise().query(query, [NIN]);
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

module.exports = creditSales;