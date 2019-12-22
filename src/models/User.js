const conn = require('../configs/db')

module.exports = {
    login: (email) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM user WHERE email = '${email}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    // NOTE: Without single param
    // register: (name, email, password) => {
    //     return new Promise((resolve, reject) => {
    //         conn.query(`INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${password})'`, (error, result) => {
    //             if (error) {
    //                 reject(new Error(error))
    //             } else {
    //                 resolve(result)
    //             }
    //         })
    //     })
    // },
    register: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO user SET ?', data, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    console.log(result)
                    resolve(result)
                }
            })
        })
    },
    checkUser: (email) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT email FROM user WHERE email = '${email}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    }
}
