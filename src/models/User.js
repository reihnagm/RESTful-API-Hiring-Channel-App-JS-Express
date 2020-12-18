const connection = require('../configs/db')

module.exports = {

  auth: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.id, a.name, a.email, a.role_id FROM user a WHERE a.id = '${id}'`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  login: (email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, password FROM user WHERE email = ?`
      connection.query(query, email, (error, result) => {
        if (error) {
          if(error.code === "ECONNREFUSED") {
            reject(new Error('The requested server is unavailable. Please contact your support and describe your issue.'))
          }
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })

    })
  },

  register: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO user SET ?`
      connection.query(query, data, (error, result) => {
        if (error) {
          if(error.code === "ECONNREFUSED") {
            reject(new Error('The requested server is unavailable. Please contact your support and describe your issue.'))

          }
          reject(new Error(error))

        } else {
          resolve(result)

        }
      })

    })
  },

  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT email FROM user WHERE email = '${email}'`
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
