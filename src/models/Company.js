const connection = require('../configs/db')

module.exports = {
    
    all: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM company', (error, result) => {
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
            connection.query('INSERT INTO company SET ?', data, (error, result) => {
                if (error) {
                    reject(new Error(err))
                } else {
                    resolve(error)
                }
            })
        })
    },
    update: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE company SET ? WHERE id = ?', [data, id], (error, result) => {
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
    }
}
