const connection = require('../configs/db')

module.exports = {

  total: () => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT COUNT(*) total FROM company`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  all: (offset, limit, sort, sortBy, search) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.*, b.name name_user, b.slug, b.email FROM company a INNER JOIN user b ON a.user_id = b.id
        WHERE (a.name LIKE '%${search}%' or a.location LIKE '%${search}%')
        ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  store: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO company SET ?`
      connection.query(query, data, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  edit: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM company WHERE id = '${id}'`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  update: (data, id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE company SET ? WHERE id = ?`
      connection.query(query, [data, id], (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM company WHERE id = ?', id, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  updateNameUser: (name, slug, id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET name = '${name}', slug = '${slug}' WHERE id = '${id}'`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  getProfile: (user_id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.*, b.name, b.email, b.role_id from company a, user b WHERE a.user_id = b.id AND b.id = '${user_id}'`  
      connection.query(query,
      (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  getProfileBySlug: (slug) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.*, b.name, b.email from company a, user b WHERE a.user_id = b.id AND b.slug = '${slug}'`
      connection.query(query,
        (error, result) => {
          if(error) {
            reject(new Error(error))
          } else {
            resolve(result)
          }
        })
    })
  },

  insertDataUser: (user_id) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO company (user_id) VALUES ('${user_id}')`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  }
  
}
