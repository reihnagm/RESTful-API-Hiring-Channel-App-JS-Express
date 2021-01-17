const conn = require('../configs/db')

module.exports = {
  all: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM skills`
      conn.query(query, (err, res) => {
        if(err) {
          reject(new Error(err))
        } else {
          resolve(res)
        }
      })
    })
  },
}