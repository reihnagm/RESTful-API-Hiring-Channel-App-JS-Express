const express = require("express")
const Route = express.Router()
const message = require("../controllers/message")

Route
    .get("/conversation-lists/:userAuthenticated", message.conversationList)
    .get("/conversation-replies/:conversationUid", message.conversationReplies)
    .get("/conversation-id/:userGuest", message.conversationUid)
    .get("/user-two/:conversationUid", message.userGuest)
    .get("/check-conversations/:userAuthenticated/:userGuest", message.checkConversations)
    .post("/conversation-replies/:userAuthenticated/:userGuest", message.storeConversationReplies)

module.exports = Route
