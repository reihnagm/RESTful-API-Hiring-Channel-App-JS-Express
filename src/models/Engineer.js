const connection = require('../configs/db');
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
            const query = `SELECT a.*, e.name, e.email, e.slug, GROUP_CONCAT(c.name SEPARATOR ', ') skills FROM engineer a
            LEFT JOIN engineer_skill b ON a.id = b.engineer_id
            LEFT JOIN skills c ON c.id = b.skill_id
            INNER JOIN user e ON a.user_id = e.id
            WHERE (e.name LIKE '%${search}%' OR c.name LIKE '%${search}%')
            GROUP BY a.id
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
    deleteUser: (user_id) => {
        return new Promise((resolve, reject) => {
                connection.query('DELETE FROM user WHERE id = ?', user_id, (error, result) => {
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
            connection.query(`SELECT a.*, d.name, d.email, GROUP_CONCAT(c.name SEPARATOR ', ') skills
                FROM engineer a
                LEFT JOIN engineer_skill b ON a.id = b.engineer_id
                LEFT JOIN skills c ON c.id = b.skill_id
                INNER JOIN user d ON a.user_id = d.id
                WHERE a.user_id = '${user_id}'
                GROUP BY a.id`,
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
            connection.query(`SELECT a.*, d.name, d.email, GROUP_CONCAT(c.name SEPARATOR ', ') skills from engineer a
            LEFT JOIN engineer_skill b ON a.id = b.engineer_id
            LEFT JOIN skills c ON c.id = b.skill_id
            INNER JOIN user d ON a.user_id = d.id
            WHERE d.slug = '${slug}'
            GROUP BY a.id`,
            (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    getSkills: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM skills`, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    getSkillsBasedOnProfileEngineer: (engineer_id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.id, a.name from skills a, engineer_skill c WHERE c.engineer_id = '${engineer_id}' AND a.id = c.skill_id`, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    truncateSkills: (engineer_id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM engineer_skill WHERE engineer_id = '${engineer_id}'`, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    insertSkills: (skill_id, engineer_id) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO engineer_skill (skill_id, engineer_id) VALUES('${skill_id}', '${engineer_id}')`, (error, result) => {
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
