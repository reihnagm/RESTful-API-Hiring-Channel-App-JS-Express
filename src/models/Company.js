const connection = require('../configs/db')

module.exports = {

  total: () => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT COUNT(*) total FROM companies`
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
    let preventAmbigiousSortby = `a.${sortby}`
    return new Promise((resolve, reject) => {
      const query = `SELECT a.*, b.slug
      FROM companies a INNER JOIN users b ON a.user_uid = b.uid
      WHERE (a.name LIKE '%${search}%' OR a.location LIKE '%${search}%')
      ORDER BY ${preventAmbigiousSortby} ${sort} LIMIT ${offset}, ${limit}`
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  allv2: (offset, limit, sort, sortby, search) => {
    if(search) {
      offset = 0
    }
    let preventAmbigiousSortby = `a.${sortby}`
    return new Promise((resolve, reject) => {
      const query = `SELECT a.uid, a.slug, b.logo, a.title, a.content, a.salary
      FROM post_jobs a 
      INNER JOIN companies b ON a.company_uid = b.uid 
      WHERE (a.title LIKE '%${search}%' OR b.location LIKE '%${search}%')
      ORDER BY ${preventAmbigiousSortby} ${sort} LIMIT ${offset}, ${limit}`
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
      const query = `INSERT INTO companies SET ?`
      connection.query(query, data, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  edit: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM companies WHERE id = '${id}'`
      connection.query(query, (error, result) => {
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
      const query = `UPDATE companies SET ? WHERE uid = ?`
      connection.query(query, [data, uid], (error, result) => {
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
      connection.query('DELETE FROM companies WHERE id = ?', id, (error, result) => {
        if (error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  updateNameUser: (name, slug, id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE users SET name = '${name}', slug = '${slug}' WHERE id = '${id}'`
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
      const query = `SELECT a.logo, a.name, a.email, a.location, a.description, a.telephone, b.fullname AS username 
      FROM companies a, users b WHERE a.user_uid = b.uid AND b.uid = '${userUid}'`  
      connection.query(query,
      (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  getProfilev2: (userUid) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT c.content, a.uid, a.logo, a.name, a.email, a.location, a.description, a.telephone, b.fullname AS username 
      FROM companies a 
      LEFT JOIN post_jobs c ON a.uid = c.company_uid
      INNER JOIN users b ON a.user_uid = b.uid
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

  getProfileBySlug: (slug) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT c.title, c.content, c.salary, c.uid, c.slug, a.logo, a.name, a.email, a.location, a.description, a.telephone 
      FROM companies a
      LEFT JOIN post_jobs c ON a.uid = c.company_uid
      INNER JOIN users b ON a.user_uid = b.uid 
      WHERE a.user_uid = b.uid AND c.slug = '${slug}'`
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

  getSkillsBasedOnProfile: (postJobUid) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.uid, a.name, a.color FROM skills a INNER JOIN post_job_skills b ON a.uid = b.skill_uid
      WHERE b.post_job_uid = '${postJobUid}'`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  getJobTypesBasedOnProfile: (postJobUid) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.uid, a.name FROM job_types a INNER JOIN post_job_types b ON a.uid = b.job_type_uid
      WHERE b.post_job_uid = '${postJobUid}'`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result[0])
        }
      })
    })
  },

  insertDataUser: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO companies SET ?`
      connection.query(query, data, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  storePostJob: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO post_jobs (uid, title, content, salary, company_uid, slug) VALUES('${data.uid}', '${data.title}', "${data.content}", '${data.salary}', '${data.company_uid}', '${data.slug}')`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  storePostJobSkills: (postJobSkillsUid, skillUid, postJobUid) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO post_job_skills (uid, skill_uid, post_job_uid, created_at, updated_at) VALUES('${postJobSkillsUid}', '${skillUid}', '${postJobUid}', NOW(), NOW())`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  storePostJobTypes: (postJobTypesUid, jobTypeUid, postJobUid) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO post_job_types (uid, job_type_uid, post_job_uid, created_at, updated_at) VALUES('${postJobTypesUid}', '${jobTypeUid}', '${postJobUid}', NOW(), NOW())`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },
  
}
