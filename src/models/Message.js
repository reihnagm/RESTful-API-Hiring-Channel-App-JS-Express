const connection = require('../configs/db')

module.exports = {

  conversationLists: (userAuthenticatedUid) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT DISTINCT a.uid AS user_uid, b.uid AS conversation_uid, d.avatar, a.fullname 
      FROM users a, conversations b, conversation_replies c, engineers d 
      WHERE  
      CASE 
        WHEN b.user_authenticated_uid = '${userAuthenticatedUid}'
        THEN b.user_guest_uid = a.uid
        WHEN b.user_guest_uid = '${userAuthenticatedUid}'
        THEN b.user_authenticated_uid = a.uid
      END 
      AND d.user_uid = a.uid
      AND b.uid = c.conversation_uid 
      AND (b.user_authenticated_uid = '${userAuthenticatedUid}' 
      OR b.user_guest_uid = '${userAuthenticatedUid}')
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

  conversationReplies: (uid) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.uid, a.reply, b.fullname, a.user_uid, a.created_at 
      FROM conversation_replies a, users b 
      WHERE a.user_uid = b.uid AND a.conversation_uid = '${uid}'`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  checkConversations: (userAuthenticatedUid, userGuestUid) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.uid FROM conversations a
      WHERE a.user_authenticated_uid = '${userAuthenticatedUid}' AND a.user_guest_uid = '${userGuestUid}'
      OR a.user_authenticated_uid = '${userGuestUid}' AND a.user_guest_uid = '${userAuthenticatedUid}'`
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
      const query = `SELECT a.reply FROM conversation_replies a 
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

  userGuest: (uid) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.user_authenticated_uid, a.user_guest_uid FROM conversations a WHERE a.uid = '${uid}'`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  conversationUid: (userGuestUid) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.uid FROM conversations a
      WHERE a.user_guest_uid = '${userGuestUid}'
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

  storeConversations: (uid, userAuthenticatedUid, userGuestUid) => {
    return new Promise ((resolve, reject) => {
      const query = `INSERT INTO conversations (uid, user_authenticated_uid, user_guest_uid)
      VALUES ('${uid}','${userAuthenticatedUid}','${userGuestUid}')`
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error))
        } else {
          resolve(result)
        }
      })
    })
  },

  storeConversationReplies: (uid, userUid, reply, conversationUid, createdAt) => {
    return new Promise ((resolve, reject) => {
      const query = `INSERT INTO conversation_replies (uid, user_uid, reply, conversation_uid, created_at)
      VALUES ('${uid}', '${userUid}', '${reply}', '${conversationUid}', '${createdAt}')`
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
