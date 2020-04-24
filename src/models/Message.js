const connection = require('../configs/db');
module.exports = {
  conversationLists: (userLoggedIn) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT DISTINCT a.id, b.id, d.avatar, a.name FROM 
      user a, conversations b, conversation_replies c, engineer d 
      WHERE  
      CASE 
        WHEN b.user_one = '${userLoggedIn}'
        THEN b.user_two = a.id
        WHEN b.user_two = '${userLoggedIn}'
        THEN b.user_one = a.id
      END 
      AND d.user_id = a.id
      AND b.id = c.conversation_id 
      AND (b.user_one = '${userLoggedIn}' 
      OR b.user_two = '${userLoggedIn}')
      GROUP BY c.id
      ORDER BY b.id DESC`;
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  lastReplies: (conversation_id) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.id, a.reply FROM conversation_replies a 
      WHERE a.conversation_id = '${conversation_id}'
      ORDER BY a.id DESC LIMIT 1`;
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  conversationReplies: (id) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.id, a.reply, b.name, a.user_id, a.created_at 
      FROM conversation_replies a, user b 
      WHERE a.user_id = b.id 
      AND a.conversation_id = '${id}'`;
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  checkConversations: (user_one, user_two) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.id FROM conversations a
      WHERE a.user_one = '${user_one}' AND a.user_two = '${user_two}'
      OR a.user_one = '${user_two}' AND a.user_two = '${user_one}'`;
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  userTwo: (id) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.user_one, a.user_two FROM conversations a WHERE a.id = '${id}'`;
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  conversationId: (user_two) => {
    return new Promise ((resolve, reject) => {
      const query = `SELECT a.id FROM conversations a
      WHERE a.user_two = '${user_two}'
      ORDER BY a.id
      DESC limit 1`;
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  storeConversations: (user_one, user_two) => {
    return new Promise ((resolve, reject) => {
      const query = `INSERT INTO conversations (user_one, user_two)
      VALUES ('${user_one}','${user_two}')`;
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  storeConversationReplies: (user_id, reply, conversation_id, created_at) => {
    return new Promise ((resolve, reject) => {
      const query = `INSERT INTO conversation_replies (user_id, reply, conversation_id, created_at)
      VALUES ('${user_id}', '${reply}', '${conversation_id}', '${created_at}')`;
      connection.query(query, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
}
