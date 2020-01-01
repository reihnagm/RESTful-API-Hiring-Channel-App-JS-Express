const connection = require('../configs/db')

module.exports = {
    all: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT a.*, b.name name_user, b.email FROM company a INNER JOIN user b ON a.user_id = b.id', (error, result) => {
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
                    reject(new Error(error))
                } else {
                    resolve(error)
                }
            })
        })
    },
    edit: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM company WHERE id = '${id}'`, (error, result) => {
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
    },
    insertDataUser: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO company (user_id) VALUES ('${id}')`, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    }
}
