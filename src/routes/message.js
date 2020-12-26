const express = require("express")
const Route = express.Router()
const message = require("../controllers/message")

Route
    .get("/conversation-lists/:userAuthenticatedUid", message.conversationList)
    .get("/conversation-replies/:conversationUid", message.conversationReplies)
    .get("/conversation-uid/:userGuestUid", message.conversationUid)
    .get("/user-guest/:conversationUid", message.userGuest)
    .get("/check-conversations/:userAuthenticatedUid/:userGuestUid", message.checkConversations)
    .post("/conversation-replies/:userAuthenticatedUid/:userGuestUid", message.storeConversationReplies)

module.exports = Route
