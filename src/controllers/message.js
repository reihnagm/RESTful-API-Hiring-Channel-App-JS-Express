const Message = require('../models/Message');
const misc = require('../helpers/response');
const Pusher = require('pusher');

let pusher = new Pusher({
  appId: '965811',
  key: '20b3b98bfc23f9164876',
  secret: '0345558e3bb824e35d9f',
  cluster: 'ap1',
  encrypted: true
});

module.exports = {
    get_conversation_lists: async (request, response) => {
        const user_session = request.params.user_session;
        try {
            const data = await Message.get_conversation_lists(user_session);
            let array = [];
            for(let i=0; i < data.length; i++) {
                let get_last_reply = await Message.get_last_reply(data[i].id);
                for(let z=0; z < get_last_reply.length; z++) {
                    array.push({
                        id: data[i].id,
                        avatar: data[i].avatar,
                        name: data[i].name,
                        reply: get_last_reply[z].reply
                    });
                }
            }
            misc.response(response, 200, false, 'Successfull get conversation lists.', array);
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
    get_reply_conversation_replies: async (request, response) => {
        const conversation_id = request.params.conversation_id;   
        try {
            const data = await Message.get_reply_conversation_replies(conversation_id);
            misc.response(response, 200, false, 'Successfull get reply conversation replies.', data);
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
    get_conversation_id: async (request, response) => {
        const user_two = request.params.user_two;
        try {
			const data = await Message.get_conversation_id(user_two);
			if(data.length !== 0) {
				misc.response(response, 200, false, 'Successfull get conversation id.', data[0].id);
			}
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
    get_user_two: async (request, response) => {
        const conversation_id = request.params.conversation_id;
        try {
            const data = await Message.get_user_two(conversation_id);
			misc.response(response, 200, false, 'Successfull get user two.', data);
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
    check_conversations: async (request, response) => {
        const user_one = request.params.user_one;
        const user_two = request.params.user_two;
        try {
            const data = await Message.check_conversations(user_one, user_two);
            misc.response(response, 200, false, 'Successfull get conversations id.', data);
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
    insert_into_conversation_replies: async (request, response) => {
        let objInsertId;
		const user_one = request.params.user_one;
		const user_two = request.params.user_two;
        const message = request.body.message;
        const user_session_name = request.body.user_session_name;
        const created_at = request.body.created_at;
        try {
			const check_conversations = await Message.check_conversations(user_one, user_two);
			if(check_conversations.length === 0) {
                try {
                    objInsertId = await Message.insert_into_conversations(user_one, user_two);
                } catch(error) {}
                finally {
                    pusher.trigger('my-channel', 'my-event', {
                        "id": new Date(),
                        "reply": message,
                        "name": user_session_name,
                        "created_at": created_at,
                    });
                    await Message.insert_into_conversation_replies(user_one, message, objInsertId.insertId, created_at);	
                }
			} else {
			    await Message.insert_into_conversation_replies(user_one, message, check_conversations[0].id, created_at);	
            }
            misc.response(response, 200, false, 'Successfull insert into conversation replies.');
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
}
