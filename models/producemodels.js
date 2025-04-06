const db = require('../config/db');

const Produce = {
  create: (ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice) => {
    const query = 'INSERT INTO Produce (ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return db.promise().query(query, [ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice]);
  },

  getAll: () => {
    const query = 'SELECT * FROM Produce';
    return db.promise().query(query);
  },

  getById: (ProduceId) => {
    const query = 'SELECT * FROM Produce WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceId]);
  },

  update: (ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice) => {
    const query = 'UPDATE Produce SET ProduceName = ?, Type = ?, Date = ?, Time = ?, Tonnage = ?, Cost = ?, DealerName = ?, Branch = ?, Contact = ?, SellingPrice = ?  WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceId, ProduceName, Type, Date, Time, Tonnage, Cost, DealerName, Branch, Contact, SellingPrice]);
  },

  delete: (ProduceId) => {
    const query = 'DELETE FROM Produce WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceId]);
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

module.exports = Produce;