const connection = require('../configs/db')
module.exports = {
    getTotal: () => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT COUNT(*) total from engineer`;
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
            const query = `SELECT a.*, b.name, b.email, b.slug FROM engineer a INNER JOIN user b ON a.user_id = b.id
            WHERE (b.name LIKE '%${search}%' or a.skill LIKE '%${search}%')
            ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}`
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    store: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO engineer SET ?`, data, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    update: (data, engineer_id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE engineer SET ? WHERE id = ?', [data, engineer_id], (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    delete: (engineer_id) => {
        return new Promise((resolve, reject) => {
                connection.query('DELETE FROM engineer WHERE id = ?', engineer_id, (error, result) => {
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
            connection.query(`SELECT a.*, b.name, b.email from engineer a, user b WHERE a.user_id = b.id AND b.id = '${user_id}'`,
            (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    getDataBySlug: (slug) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.*, b.name, b.email from engineer a, user b WHERE a.user_id = b.id AND b.slug = '${slug}'`,
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
            connection.query(`INSERT INTO engineer (user_id) VALUES('${user_id}')`, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    }
}
