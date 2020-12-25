const connection = require('../configs/db')

module.exports = {

  conversationLists: (userAuth) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT DISTINCT a.id, b.id, d.avatar, a.fullname 
      FROM users a, conversations b, conversation_replies c, engineers d 
      WHERE  
      CASE 
        WHEN b.user_one = '${userAuth}'
        THEN b.user_two = a.uid
        WHEN b.user_two = '${userAuth}'
        THEN b.user_one = a.uid
      END 
      AND d.user_uid = a.uid
      AND b.id = c.conversation_uid 
      AND (b.user_one = '${userAuth}' 
      OR b.user_two = '${userAuth}')
      GROUP BY c.id
      ORDER BY c.id DESC`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  lastReplies: (conversationUid) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.id, a.reply FROM conversation_replies a 
      WHERE a.conversation_uid = '${conversationUid}'
      ORDER BY a.id DESC LIMIT 1`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  conversationReplies: (uid) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.id, a.reply, b.fullname, a.user_uid, a.created_at 
      FROM conversation_replies a, users b 
      WHERE a.user_uid = b.id AND a.conversation_uid = '${uid}'`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  checkConversations: (userAuth, userTwo) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.id FROM conversations a
      WHERE a.user_one = '${userAuth}' AND a.user_two = '${userTwo}'
      OR a.user_one = '${userTwo}' AND a.user_two = '${userAuth}'`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  userTwo: (uid) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.user_one, a.user_two FROM conversations a WHERE a.uid = '${uid}'`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  conversationUid: (userTwo) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.id FROM conversations a
      WHERE a.user_two = '${userTwo}'
      ORDER BY a.id
      DESC limit 1`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  storeConversations: (uid, userOne, userTwo) => {
    return new Promise ((resolve, reject) => {
      const query = `INSERT INTO conversations (uid, user_one, user_two)
      VALUES ('${uid}','${userOne}','${userTwo}')`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  storeConversationReplies: (userUid, reply, conversationUid, createdAt) => {
    return new Promise ((resolve, reject) => {
      const query = `INSERT INTO conversation_replies (user_uid, reply, conversation_uid, created_at)
      VALUES ('${userUid}', '${reply}', '${conversationUid}', '${createdAt}')`
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
