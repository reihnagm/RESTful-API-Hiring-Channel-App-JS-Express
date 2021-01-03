const MessageNotifications = require('../models/MessageNotifications')
const misc = require('../helpers/helper')
module.exports = {
  
  getNotifications: async (request, response) => {
    try {
      const data = await MessageNotifications.getNotifications()            
      misc.response(response, 200, false, null, data)
    } catch(error) {    
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  sendNotifications: async (request, response) => {
    const content = request.body.content
    const conversation_id = request.body.conversation_id
    const user_id = request.body.user_id
    const data = { 
      content,
      conversation_id,
      user_id
    }
    try {
      await MessageNotifications.sendNotifications(data)
      misc.response(response, 200, false, null)
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  }

}   