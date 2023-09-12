// models/User.js

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db');

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)'
  );
});

class User {
  static async createUser({ username, email, password }) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve(this.lastID);
        }
      );
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        function (err, row) {
          if (err) {
            return reject(err);
          }
          resolve(row);
        }
      );
    });
  }
}

module.exports = User;
