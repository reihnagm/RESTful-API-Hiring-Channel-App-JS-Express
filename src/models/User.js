const connection = require('../configs/db')

module.exports = {

  auth: (uid) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, uid, fullname, nickname, email, role, created_at FROM users a WHERE a.uid = '${uid}'`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result[0])
        }
      })
    })
  },

  login: (email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, uid, fullname, nickname, email, role, password FROM users WHERE email = ?`
      connection.query(query, email, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })

    })
  },

  register: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users SET ?`
      connection.query(query, data, (error, result) => {
        if (error) {
          reject(new Error(error))

        } else {
          resolve(result)

        }
      })

    })
  },

  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT email FROM users WHERE email = '${email}'`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  checkSlug: (slug) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT slug FROM users WHERE slug = '${slug}'`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  }

}
