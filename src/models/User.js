const conn = require('../configs/db')

module.exports = {
    login: (email) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM user WHERE email = '${email}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    register: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO user SET ?', data, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result.insertId)
                }
            })
        })
    },
    getId: (email) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id FROM user WHERE email = ${email}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}
