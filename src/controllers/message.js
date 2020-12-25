const { v4: uuidv4 } = require("uuid")
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
            uid: conversationList[i].uid,
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
    const conversationUid = request.params.conversationUid
    try {
      const data = await Message.conversationReplies(conversationUid)
      misc.response(response, 200, false, null, data)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  conversationUid: async (request, response) => {
    const userGuest = request.params.userGuest
    try {
			const data = await Message.conversationUid(userGuest)
			if(data.length !== 0) {
				misc.response(response, 200, false, null, data[0].uid)
			}
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  userGuest: async (request, response) => {
    const conversationUid = request.params.conversationUid
    try {
      const data = await Message.userTwo(conversationUid)
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
    let objInsertId1, objInsertId2, payload
    const userAuthenticated = request.params.userAuthenticated
    const userGuest = request.params.userGuest
    const message = request.body.message
    const username = request.body.usernameAuthenticated
    const createdAt = request.body.created_at
    try {
			const checkConversations = await Message.checkConversations(userAuthenticated, userGuest)
			if(checkConversations.length === 0) {
        try {
          objInsertId1 = await Message.storeConversations(userAuthenticated, userGuest)
        } catch(error) {
          console.log(error.message) // in-development
          misc.response(response, 500, true, 'Server Error.')
        } finally {
          objInsertId2 = await Message.storeConversationReplies(uuidv4(), userAuthenticated, message, uuidv4(), createdAt)
          payload = {
            'id':  objInsertId2.insertId,
            'uid': uuidv4(),
            'reply': message,
            'user_uid': parseInt(userAuthenticated),
            'name': username,
            'created_at': createdAt
          }
        }
			} else {
        objInsertId2 = await Message.storeConversationReplies(uuidv4(), userAuthenticated, message, checkConversations[0].uid, createdAt)
        payload = {
          'id': objInsertId2.insertId,
          'uid': uuidv4(), 
          'reply': message,
          'user_uid':  parseInt(userAuthenticated),
          'name': username,
          'created_at': createdAt
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
