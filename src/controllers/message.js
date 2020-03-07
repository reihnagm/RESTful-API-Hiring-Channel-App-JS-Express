const Message = require('../models/Message');
const misc = require('../helpers/response');
module.exports = {
    get_conversation_lists: async (request, response) => {
        const user_session = request.params.user_session;
        try {
            const data = await Message.get_conversation_lists(user_session);
            let array = [];
            for(let i=0; i < data.length; i++) {
                let get_reply = await Message.get_last_reply(data[i].id);
                for(let z=0; z < get_reply.length; z++) {
                    array.push({
                        id: data[i].id,
                        avatar: data[i].avatar,
                        name: data[i].name,
                        reply: get_reply[z].reply
                    });
                }
            }
            misc.response(response, 200, false, 'Successfull get conversation lists.', array);
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
    get_reply_conversation_replies: async (request, response) => {
        const conversations_id = request.params.conversation_id;
        try {
            const data = await Message.get_reply_conversation_replies(conversations_id);
            misc.response(response, 200, false, 'Successfull get reply conversation replies.', data);
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
    get_conversations_last_id: async (request, response) => {
        const user_two = request.params.user_two;
        try {
			const data = await Message.get_conversations_last_id(user_two);
			if(data.length !== 0) {
				misc.response(response, 200, false, 'Successfull get conversations last id.', data[0].id);
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
		const user_one = request.params.user_one;
		const user_two = request.params.user_two;
		const message = request.body.message;
        try {
			const checkData = await Message.check_conversations(user_one, user_two);
			if(checkData.length === 0) {
				Message.insert_into_conversations(user_one, user_two).then(async data => {
					await Message.insert_into_conversation_replies(user_one, message, data.insertId);	
				});
			} else {
				await Message.insert_into_conversation_replies(user_one, message, checkData[0].id);	
			}
            misc.response(response, 200, false, 'Successfull insert into conversation replies.');
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
}
