const Message = require('../models/Message');
const misc = require('../helpers/response');
const pusher = require('../configs/pusher');

module.exports = {
  conversationLists: async (request, response) => {
    const user_session = request.params.user_session;
    try {
      const conversation_lists = await Message.conversationLists(user_session);
      let data = [];
      for(let i = 0; i < conversation_lists.length; i++) {
        let last_replies = await Message.lastReplies(conversation_lists[i].id);
        for(let z = 0; z < last_replies.length; z++) {
          data.push({
            id: conversation_lists[i].id,
            avatar: conversation_lists[i].avatar,
            name: conversation_lists[i].name,
            reply: last_replies[z].reply
          });
        }
      }
      misc.response(response, 200, false, null, data);
    } catch (error) {
      console.log(error.message); // in-development
      misc.response(response, 500, true, 'Server Error.');
    }
  },
  conversationReplies: async (request, response) => {
    const conversation_id = request.params.conversation_id;
    try {
      const data = await Message.conversationReplies(conversation_id);
      misc.response(response, 200, false, null, data);
    } catch (error) {
      console.log(error.message); // in-development
      misc.response(response, 500, true, 'Server Error.');
    }
  },
  conversationId: async (request, response) => {
    const user_two = request.params.user_two;
    try {
			const data = await Message.conversationId(user_two);
			if(data.length !== 0) {
				misc.response(response, 200, false, null, data[0].id);
			}
    } catch (error) {
      console.log(error.message); // in-development
      misc.response(response, 500, true, 'Server Error.');
    }
  },
  userTwo: async (request, response) => {
    const conversation_id = request.params.conversation_id;
    try {
      const data = await Message.userTwo(conversation_id);
      misc.response(response, 200, false, null, data);
    } catch (error) {
        console.log(error.message); // in-development
        misc.response(response, 500, true, 'Server Error.');
    }
  },
  checkConversations: async (request, response) => {
    const user_one = request.params.user_one;
    const user_two = request.params.user_two;
    try {
      const data = await Message.checkConversations(user_one, user_two);
      misc.response(response, 200, false, null, data);
    } catch (error) {
      console.log(error.message); // in-development
      misc.response(response, 500, true, 'Server Error.');
    }
  },
  storeConversationReplies: async (request, response) => {
    let objInsertId, objInsertId2, payload;
    const user_one = request.params.user_one;
    const user_two = request.params.user_two;
    const message = request.body.message;
    const user_session_name = request.body.user_session_name;
    const created_at = request.body.created_at;
    try {
			const check_conversations = await Message.checkConversations(user_one, user_two);
			if(check_conversations.length === 0) {
        try {
          objInsertId = await Message.storeConversations(user_one, user_two);
        } catch(error) {
          console.log(error.message); // in-development
          misc.response(response, 500, true, 'Server Error.');
        } finally {
          objInsertId2 = await Message.storeConversationReplies(user_one, message, objInsertId.insertId, created_at);
          payload = {
            'id':  objInsertId2.insertId,
            'reply': message,
            'user_id':  parseInt(user_one),
            'name': user_session_name,
            'created_at': created_at
          }
        }
			} else {
        objInsertId2 = await Message.storeConversationReplies(user_one, message, check_conversations[0].id, created_at);
        payload = {
          'id':  objInsertId2.insertId,
          'reply': message,
          'user_id':  parseInt(user_one),
          'name': user_session_name,
          'created_at': created_at
        }
      }

      pusher.trigger('my-channel', 'my-event', payload);
      misc.response(response, 200, null, false);
    } catch (error) {
      console.log(error.message); // in-development
      misc.response(response, 500, true, 'Server Error.');
    }
  },
}
