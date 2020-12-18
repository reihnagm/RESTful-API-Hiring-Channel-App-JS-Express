const Message = require('../models/Message')
const misc = require('../helpers/response')
const pusher = require('../configs/pusher')

module.exports = {

  conversationList: async (request, response) => {
    const userAuthenticated = request.params.userAuthenticated
    try {
      const conversationList = await Message.conversationLists(userAuthenticated)
      let data = []
      for(let i = 0; i < conversationList.length; i++) {
        let lastReplies = await Message.lastReplies(conversationList[i].id)
        for(let z = 0; z < lastReplies.length; z++) {
          data.push({
            id: conversationList[i].id,
            avatar: conversationList[i].avatar,
            name: conversationList[i].name,
            reply: conversationList[z].reply
          })
        }
      }
      misc.response(response, 200, false, null, data)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  conversationReplies: async (request, response) => {
    const conversationId = request.params.conversationId
    try {
      const data = await Message.conversationReplies(conversationId)
      misc.response(response, 200, false, null, data)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  conversationId: async (request, response) => {
    const userGuest = request.params.userGuest
    try {
			const data = await Message.conversationId(userGuest)
			if(data.length !== 0) {
				misc.response(response, 200, false, null, data[0].id)
			}
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  userGuest: async (request, response) => {
    const conversationId = request.params.conversationId
    try {
      const data = await Message.userTwo(conversationId)
      misc.response(response, 200, false, null, data)
    } catch (error) {
        console.log(error.message) // in-development
        misc.response(response, 500, true, 'Server Error.')
    }
  },

  checkConversations: async (request, response) => {
    const userAuthenticated = request.params.userAuthenticated
    const userGuest = request.params.userGuest
    try {
      const data = await Message.checkConversations(userAuthenticated, userGuest)
      misc.response(response, 200, false, null, data)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  storeConversationReplies: async (request, response) => {
    let objInsertId, objInsertId2, payload
    const userAuthenticated = request.params.userAuthenticated
    const userGuest = request.params.userGuest
    const message = request.body.message
    const username = request.body.user_session_name
    const created_at = request.body.created_at
    try {
			const checkConversations = await Message.checkConversations(userAuthenticated, userGuest)
			if(checkConversations.length === 0) {
        try {
          objInsertId = await Message.storeConversations(userAuthenticated, userGuest)
        } catch(error) {
          console.log(error.message) // in-development
          misc.response(response, 500, true, 'Server Error.')
        } finally {
          objInsertId2 = await Message.storeConversationReplies(userAuthenticated, message, objInsertId.insertId, created_at)
          payload = {
            'id':  objInsertId2.insertId,
            'reply': message,
            'user_id': parseInt(user_one),
            'name': username,
            'created_at': created_at
          }
        }
			} else {
        objInsertId2 = await Message.storeConversationReplies(userAuthenticated, message, checkConversations[0].id, created_at)
        payload = {
          'id':  objInsertId2.insertId,
          'reply': message,
          'user_id':  parseInt(user_one),
          'name': username,
          'created_at': created_at
        }
      }
      pusher.trigger('my-channel', 'my-event', payload)
      misc.response(response, 200, null, false)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },
  
}
