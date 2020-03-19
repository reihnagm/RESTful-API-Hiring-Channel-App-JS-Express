const connection = require('../configs/db')
module.exports = {
    auth: (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.id, a.name, a.email, a.role_id FROM user a WHERE a.id = '${user_id}'`, (error, result) => {
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
            connection.query(`SELECT * FROM user WHERE email = ?`, email, (error, result) => {
                if (error) {
                   if(error.code === "ECONNREFUSED") {
                        reject(new Error('The requested server is unavailable. Please contact your support and describe your issue.'));
                   }
                   reject(new Error(error))
                } else {
                    resolve(result);
                }
            })
        })
    },
    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET ?', data, (error, result) => {
                if (error) {
                    if(error.code === "ECONNREFUSED") {
                        reject(new Error('The requested server is unavailable. Please contact your support and describe your issue.'));
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
            connection.query(`SELECT email FROM user WHERE email = '${email}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    }
}
