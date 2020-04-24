const connection = require('../configs/db');
module.exports = {
  total: () => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT COUNT(*) AS total FROM engineer`;
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  all: (offset, limit, sort, sortBy, search) => {
    if(search) {
      offset = 0;
    }
    return new Promise((resolve, reject) => {
      const query = `SELECT DISTINCT a.*, e.name, e.email, e.slug,
      GROUP_CONCAT(c.name SEPARATOR ', ') skills
      FROM engineer a
      LEFT JOIN engineer_skill b ON a.id = b.engineer_id
      LEFT JOIN skills c ON c.id = b.skill_id
      INNER JOIN user e ON a.user_id = e.id
      WHERE LOWER(e.name) LIKE '%${search}%'
      GROUP BY a.id
      ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}`;
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
      const query = `INSERT INTO engineer SET ?`;
      connection.query(query, data, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  update: (data, id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE engineer SET ? WHERE id = ?`;
      connection.query(query, [data, id], (error, result) => {
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
      const query = `DELETE FROM engineer WHERE id = ?`;
      connection.query(query, id, (error, result) => {
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
      const query = `DELETE FROM user WHERE id = ?`;
      connection.query(query, user_id, (error, result) => {
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
      const query = `UPDATE user SET name = '${name}', slug = '${slug}' WHERE id = '${user_id}'`;
      connection.query(query, (error, result) => {
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
      const query = `SELECT a.*, d.name, d.email,  GROUP_CONCAT(C.id SEPARATOR ',') skills_id, GROUP_CONCAT(c.name SEPARATOR ',') skills
      FROM engineer a
      LEFT JOIN engineer_skill b ON a.id = b.engineer_id
      LEFT JOIN skills c ON c.id = b.skill_id
      INNER JOIN user d ON a.user_id = d.id
      WHERE a.user_id = '${user_id}'
      GROUP BY a.id`;
      connection.query(query,
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
      const query = `SELECT a.*, d.name, d.email,
      GROUP_CONCAT(c.name SEPARATOR ', ') skills from engineer a
      LEFT JOIN engineer_skill b ON a.id = b.engineer_id
      LEFT JOIN skills c ON c.id = b.skill_id
      INNER JOIN user d ON a.user_id = d.id
      WHERE d.slug = '${slug}'
      GROUP BY a.id`;
      connection.query(query,
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
      const query = `SELECT * FROM skills`;
      connection.query(query, (error, result) => {
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
      const query = `DELETE FROM engineer_skill WHERE engineer_id = '${engineer_id}'`;
      connection.query(query, (error, result) => {
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
      const query = `INSERT INTO engineer_skill (skill_id, engineer_id) VALUES('${skill_id}', '${engineer_id}')`;
      connection.query(query, (error, result) => {
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
      const query = `INSERT INTO engineer (user_id) VALUES('${user_id}')`;
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  }
}
