const conn = require('../configs/db')

module.exports = {
  all: (offset, limit, sort, sortBy, search) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM engineer WHERE (name LIKE '%${search}%' or skill LIKE '%${search}%')
      ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}`

      conn.query(query, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },
  store: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO engineer SET ?', data, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result.insertId)
        }
      })
    })
  },
  edit: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM engineer WHERE id = '${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },
  update: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE engineer SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM engineer WHERE id = ?', id, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  }
}
