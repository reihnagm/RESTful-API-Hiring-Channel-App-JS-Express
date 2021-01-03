const { v4: uuidv4 } = require("uuid")
const Message = require('../models/Message')
const misc = require('../helpers/helper')
const pusher = require('../configs/pusher')

module.exports = {

  conversationList: async (request, response) => {
    const userAuthenticatedUid = request.params.userAuthenticatedUid
    try {
      const conversationList = await Message.conversationLists(userAuthenticatedUid)
      let data = []
      for(let i = 0; i < conversationList.length; i++) {
        let lastReplies = await Message.lastReplies(conversationList[i].conversation_uid)
        for(let z = 0; z < lastReplies.length; z++) {
          data.push({
            uid: conversationList[i].conversation_uid,
            user_uid: conversationList[i].user_uid,
            avatar: conversationList[i].avatar,
            fullname: conversationList[i].fullname,
            reply: lastReplies[z].reply
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
    const userGuestUid = request.params.userGuestUid
    try {
			const data = await Message.conversationUid(userGuestUid)
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
      const data = await Message.userGuest(conversationUid)
      misc.response(response, 200, false, null, data)
    } catch (error) {
        console.log(error.message) // in-development
        misc.response(response, 500, true, 'Server Error.')
    }
  },

  checkConversations: async (request, response) => {
    const userAuthenticatedUid = request.params.userAuthenticatedUid
    const userGuestUid = request.params.userGuestUid
    try {
      const data = await Message.checkConversations(userAuthenticatedUid, userGuestUid)
      misc.response(response, 200, false, null, data)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  storeConversationReplies: async (request, response) => {
    let objInsertId1, objInsertId2, payload
    const conversastionUid = uuidv4()
    const payloadUid =uuidv4()
    const userAuthenticatedUid = request.params.userAuthenticatedUid
    const userGuestUid = request.params.userGuestUid
    const reply = request.body.reply
    const fullname = request.body.userAuthenticatedName
    const createdAt = request.body.createdAt 

    try {
			const checkConversations = await Message.checkConversations(userAuthenticatedUid, userGuestUid)
			if(checkConversations.length === 0) {
        try {
          await Message.storeConversations(conversastionUid, userAuthenticatedUid, userGuestUid)
        } catch(error) {
          console.log(error.message) // in-development
          misc.response(response, 500, true, 'Server Error.')
        } finally {
          await Message.storeConversationReplies(uuidv4(), userAuthenticatedUid, reply, conversastionUid, createdAt)
          payload = {
            'uid': payloadUid,
            'reply': reply,
            'user_uid': userAuthenticatedUid,
            'fullname': username,
            'createdAt': createdAt
          }
        }
			} else {
        await Message.storeConversationReplies(uuidv4(), userAuthenticatedUid, reply, checkConversations[0].uid, createdAt)
        payload = {
          'uid': payloadUid, 
          'reply': reply,
          'user_uid': userAuthenticatedUid,
          'fullname': fullname,
          'createdAt': createdAt
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
