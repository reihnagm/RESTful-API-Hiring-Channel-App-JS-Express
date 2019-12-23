const connection = require('../configs/db')

module.exports = {

    getCountAll: () => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT COUNT(*) total from engineer`
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
            const query = `SELECT * FROM engineer WHERE (name LIKE '%${search}%' or skill LIKE '%${search}%')
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
                connection.query('INSERT INTO engineer SET ?', data, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result.insertId)
                }
            })
        })
    },
    edit: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM engineer WHERE id = ${id}`, (error, result) => {
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
            connection.query('UPDATE engineer SET ? WHERE id = ?', [data, id], (error, result) => {
                if (err) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
                connection.query('DELETE FROM engineer WHERE id = ?', id, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    saveAvatar: (avatar) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE engineer SET avatar = '${avatar}'`, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    }
}
