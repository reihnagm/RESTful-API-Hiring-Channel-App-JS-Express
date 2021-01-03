const connection = require('../configs/db')

module.exports = {

  total: () => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT COUNT(*) total FROM companies`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  all: (offset, limit, sort, sortby, search) => {
    if(search) {
      offset = 0
    }
    return new Promise((resolve, reject) => {
      const query = `SELECT a.*, b.fullname AS username, b.email, b.slug
      FROM companies a INNER JOIN users b ON a.user_uid = b.uid
      WHERE (a.name LIKE '%${search}%' OR a.location LIKE '%${search}%')
      ORDER BY ${sortby} ${sort} LIMIT ${offset}, ${limit}`
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
      const query = `INSERT INTO companies SET ?`
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
      const query = `SELECT * FROM companies WHERE id = '${id}'`
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
      const query = `UPDATE companies SET ? WHERE id = ?`
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
      connection.query('DELETE FROM companies WHERE id = ?', id, (error, result) => {
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
      const query = `UPDATE users SET name = '${name}', slug = '${slug}' WHERE id = '${id}'`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  getProfile: (userUid) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.*, b.fullname, b.email, b.role FROM companies a, users b WHERE a.user_uid = b.uid AND b.uid = '${userUid}'`  
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
      const query = `SELECT a.*, b.name, b.email FROM companies a, user b WHERE a.user_uid = b.id AND b.slug = '${slug}'`
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

  insertDataUser: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO companies SET ?`
      connection.query(query, data, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  }
  
}
