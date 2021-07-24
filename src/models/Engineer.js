const connection = require('../configs/db')

module.exports = {
  
  total: () => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT COUNT(*) AS total FROM engineers`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  all: (offset, limit, sort, sortby, search) => {
    if(search) {
      offset = 0
    }
    return new Promise((resolve, reject) => {
      const query = `SELECT DISTINCT a.*, e.fullname, e.email, e.slug,
      GROUP_CONCAT(c.name SEPARATOR ', ') skills
      FROM engineers a
      LEFT JOIN engineer_skills b ON a.uid = b.engineer_uid
      LEFT JOIN skills c ON c.uid = b.skill_uid
      INNER JOIN users e ON a.user_uid = e.uid
      WHERE LOWER(e.fullname) LIKE '%${search}%' GROUP BY a.id
      ORDER BY ${sortby} ${sort} LIMIT ${offset}, ${limit}`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  allWithPagination: (offset, show, sort, sortby, search) => {
    if(search) {
      offset = 0
    }
    let preventAmbigiousSortby = `e.${sortby}`
    return new Promise((resolve, reject) => {
      const query = `SELECT a.uid, a.avatar, a.salary, e.fullname, e.slug
      FROM engineers a
      LEFT JOIN engineer_skills b ON a.uid = b.engineer_uid
      LEFT JOIN skills c ON c.uid = b.skill_uid
      INNER JOIN users e ON a.user_uid = e.uid
      WHERE LOWER(e.fullname) LIKE '%${search}%' OR LOWER(c.name) LIKE '%${search}%'
      GROUP BY a.id
      ORDER BY ${preventAmbigiousSortby} ${sort} LIMIT ${offset}, ${show}`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  allWithInfiniteScroll: (offset, show, sort, sortby, search) => {
    if(search) {
      offset = 0
    }    
    let preventAmbigiousSortby = `e.${sortby}`
    return new Promise((resolve, reject) => {
      const query = `SELECT a.uid, a.avatar, a.salary, e.fullname, e.slug
      FROM engineers a
      LEFT JOIN engineer_skills b ON a.uid = b.engineer_uid
      LEFT JOIN skills c ON c.uid = b.skill_uid
      INNER JOIN users e ON a.user_uid = e.uid
      WHERE LOWER(e.fullname) LIKE '%${search}%' OR LOWER(c.name) LIKE '%${search}%'
      GROUP BY a.id
      ORDER BY ${preventAmbigiousSortby} ${sort} LIMIT ${offset}, ${show}`
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
      const query = `INSERT INTO engineers SET ?`
      connection.query(query, data, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  update: (data, uid) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE engineers SET ? WHERE uid = ?`
      connection.query(query, [data, uid], (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  delete: (uid) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM engineers WHERE uid = ?`
      connection.query(query, id, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  deleteUser: (userUid) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM users WHERE uid = ?`
      connection.query(query, userUid, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  updateNameUser: (fullname, nickname, slug, userUid) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE users SET fullname = '${fullname}', nickname = '${nickname}', slug = '${slug}' WHERE uid = '${userUid}'`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  getProfile: (userUid) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.uid, a.avatar, a.location, a.showcase, a.telephone, a.salary, 
      a.description, a.birthdate, d.fullname, d.nickname, d.email 
      FROM engineers a
      INNER JOIN users d ON a.user_uid = d.uid
      WHERE a.user_uid = '${userUid}'`
      connection.query(query,
      (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result[0])
        }
      })
    })
  },

  getProfileByEngineer: (engineerUid) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.uid, a.avatar, a.location, a.showcase, a.telephone, a.salary, 
      a.description, a.birthdate, d.uid AS userUid, d.fullname, d.nickname, d.email 
      FROM engineers a
      INNER JOIN users d ON a.user_uid = d.uid
      WHERE a.uid = '${engineerUid}'`
      connection.query(query,
      (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result[0])
        }
      })
    })
  },

  getProfileBySlug: (slug) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.uid, a.avatar, a.location, a.showcase, a.telephone, a.salary, 
      a.description, a.birthdate, a.user_uid, d.fullname, d.nickname, d.email
      FROM engineers a
      INNER JOIN users d ON a.user_uid = d.uid
      WHERE d.slug = '${slug}'`
      connection.query(query,
      (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result[0])
        }
      })
    })
  },
  
  getSkillsBasedOnProfile: (engineerUid) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.uid, a.name, a.color FROM skills a INNER JOIN engineer_skills b ON a.uid = b.skill_uid
      WHERE b.engineer_uid = '${engineerUid}'`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },
    
  checkSkills: (skillUid, engineerUid) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM engineer_skills WHERE skill_uid = '${skillUid}' AND engineer_uid = '${engineerUid}'`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  storeSkills: (engineerSkillsUid, skillUid, engineerUid) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO engineer_skills (uid, skill_uid, engineer_uid) VALUES('${engineerSkillsUid}', '${skillUid}', '${engineerUid}')`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },
  
  destroySkills: (skillUid, engineerUid) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM engineer_skills WHERE skill_uid = '${skillUid}' AND engineer_uid = '${engineerUid}'`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },
  
  insertDataUser: (uid, userUid) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO engineers (uid, avatar, user_uid) VALUES('${uid}', 'avatar.png', '${userUid}')`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  }

}
