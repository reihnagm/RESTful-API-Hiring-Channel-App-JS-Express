const conn = require('../configs/db');

module.exports = {
  all: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM company', (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  store: data => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO company SET ?', data, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  update: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE company SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  delete: id => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM company WHERE id = ?', id, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  }
};