const connection = require('../configs/db')
module.exports = {
    getTotal: () => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT COUNT(*) total from company`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    getAll: (offset, limit, sort, sortBy, search) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT a.*, b.name name_user, b.slug, b.email FROM company a INNER JOIN user b ON a.user_id = b.id
                WHERE (a.name LIKE '%${search}%' or a.location LIKE '%${search}%')
                ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}`
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            })
        })
    },
    store: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO company SET ?', data, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(error);
                }
            });
        });
    },
    edit: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM company WHERE id = '${id}'`, (error, result) => {
            if (error) {
                reject(new Error(error));
            } else {
                resolve(result);
            }
        });
    });
    },
    update: (data, company_id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE company SET ? WHERE id = ?', [data, company_id], (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM company WHERE id = ?', id, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    updateNameUser: (name, slug, user_id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE user SET name = '${name}', slug = '${slug}' WHERE id = '${user_id}'`, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    getProfile: (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.*, b.name, b.email, b.role_id from company a, user b WHERE a.user_id = b.id AND b.id = '${user_id}'`,
            (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    getProfileBySlug: (slug) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.*, b.name, b.email from company a, user b WHERE a.user_id = b.id AND b.slug = '${slug}'`,
            (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    insertDataUser: (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO company (user_id) VALUES ('${user_id}')`, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    }
}
