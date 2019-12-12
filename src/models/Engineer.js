const conn = require('../configs/db')
const redis = require('../configs/redis')

module.exports = {
  all: (data) => {
    return new Promise((resolve, reject) => {
      const page = parseInt(data.page) || 1
      const perPage = data.perPage || 5
      const start = (data.perPage * data.page) - data.perPage

      const prevPage = page - 1
      const nextPage = page + 1

      const name = data.name
      const skill = data.skill
      const date_updated = data.date_updated

      let query = ''

      if (name) {
        query = `SELECT * FROM engineer 
                          WHERE name LIKE '%${name}% LIMIT ${start}, ${perPage}'`
      }

      if (skill) {
        query = `SELECT * FROM engineer
                          WHERE skill '%${skill}% LIMIT ${start}, ${perPage}'`
      }

      query = `SELECT * FROM engineer LIMIT ${start}, ${perPage}`

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
  },
  sort_by_date_update: (data) => {
    const query = `SELECT * FROM engineer ORDER BY date_updated ${data.params.sort.toUpperCase()}`
    return new Promise((resolve, reject) => {
      conn.query(query, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },
  sort_by_name: (data) => {
    const query = `SELECT * FROM engineer WHERE name LIKE '%${data.params.name}%'`
    return new Promise((resolve, reject) => {
      conn.query(query, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },
  sort_by_skill: (data) => {
    const query = `SELECT * FROM engineer WHERE skill LIKE '%${data.params.sort}%'`
    return new Promise((resolve, reject) => {
      conn.query(query, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  }
}
