const db = require('../config/db');

const User = {
  create: async (username, password, email, role = 'user') => {
    const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
    return db.promise().query(query, [username, password, email, role]);
  },

  findByUsername: (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    return db.promise().query(query, [username]);
  },

  getAll: () => {
    const query = 'SELECT id, username, email, role, created_at FROM users';
    return db.promise().query(query);
  },

  getById: (id) => {
    const query = 'SELECT id, username, email, role, created_at FROM users WHERE id = ?';
    return db.promise().query(query, [id]);
  },

  update: (id, username, email) => {
    if (parseInt(id) === 1) {
      throw new Error('Cannot modify CEO user');
    }
    const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    return db.promise().query(query, [username, email, id]);
  },

  delete: (id) => {
    if (parseInt(id) === 1) {
      throw new Error('Cannot delete CEO user');
    }
    const query = 'DELETE FROM users WHERE id = ?';
    return db.promise().query(query, [id]);
  }
};

module.exports = User;