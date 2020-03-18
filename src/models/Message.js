const connection = require('../configs/db');
module.exports = {
    get_conversation_lists: (user_session) => {
        return new Promise ((resolve, reject) => {
            connection.query(`
                SELECT DISTINCT a.id, b.id, d.avatar, a.name FROM 
                user a, conversations b, conversation_replies c, engineer d 
                WHERE  
                CASE 
                    WHEN b.user_one = '${user_session}'
                    THEN b.user_two = a.id
                    WHEN b.user_two = '${user_session}'
                    THEN b.user_one = a.id
                END 
                AND d.user_id = a.id
                AND b.id = c.conversation_id 
                AND (b.user_one = '${user_session}' OR b.user_two = '${user_session}')
                GROUP BY c.id
                ORDER BY b.id DESC
                `, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    get_last_reply: (conversations_id) => {
        return new Promise ((resolve, reject) => {
            connection.query(`
                SELECT a.id, a.reply FROM conversation_replies a 
                WHERE a.conversation_id = '${conversations_id}'
                ORDER BY a.id DESC LIMIT 1
                `, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    get_reply_conversation_replies: (conversation_id) => {
        return new Promise ((resolve, reject) => {
            connection.query(`
                SELECT a.id, a.reply, b.name, a.created_at 
                FROM conversation_replies a, user b 
                WHERE a.user_id = b.id 
                AND a.conversation_id = '${conversation_id}'
                `, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    check_conversations: (user_one, user_two) => {
        return new Promise ((resolve, reject) => {
            connection.query(`
                    SELECT a.id FROM conversations a
                    WHERE a.user_one = '${user_one}' AND a.user_two = '${user_two}'
                    OR a.user_one = '${user_two}' AND a.user_two = '${user_one}'
                    `, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    get_user_two: (conversation_id) => {
        return new Promise ((resolve, reject) => {
            connection.query(`
                    SELECT a.user_one, a.user_two FROM conversations a WHERE a.id = '${conversation_id}'
                    `, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    get_conversation_id: (user_two) => {
        return new Promise ((resolve, reject) => {
            connection.query(`
                    SELECT a.id FROM conversations a
                    WHERE a.user_two = '${user_two}'
                    ORDER BY a.id
                    DESC limit 1
                    `, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    insert_into_conversations: (user_one, user_two) => {
        return new Promise ((resolve, reject) => {
            connection.query(`
                    INSERT INTO conversations (user_one, user_two)
                    VALUES ('${user_one}','${user_two}')
                    `, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    insert_into_conversation_replies: (user_id, message, conversation_id, created_at) => {
        return new Promise ((resolve, reject) => {
            connection.query(`
                    INSERT INTO conversation_replies (user_id, reply, conversation_id, created_at)
                    VALUES ('${user_id}', '${message}', '${conversation_id}', '${created_at}')
                    `, (error, result) => {
                if(error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
}
