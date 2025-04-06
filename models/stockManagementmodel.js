const db = require('../config/db');

const stockManagement = {
  create: (ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage) => {
    const query = 'INSERT INTO Receipt (ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage) VALUES (?, ?, ?, ?, ?, ?)';``
    return db.promise().query(query, [ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage]);
  },

  getAll: () => {
    const query = 'SELECT * FROM stockManagement';
    return db.promise().query(query);
  },

  getById: (ProduceId) => {
    const query = 'SELECT * FROM stockManagement WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceId]);
  },

  update: (ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage) => {
    const query = 'UPDATE stockManagement SET ProduceName = ?, ProduceId = ?, TonnageSold = ?, TonnageBought = ?, CurrentTonnage = ?, WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceName, ProduceId, TonnageSold, TonnageBought, CurrentTonnage]);
  },

  delete: (ProduceId) => {
    const query = 'DELETE FROM stockManagement WHERE ProduceId = ?';
    return db.promise().query(query, [ProduceId]);
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

module.exports = stockManagement;