const express = require("express");
const Route = express.Router();
const message = require("../controllers/message");
Route
    .get("/conversation-lists/:user_session", message.conversationLists)
    .get("/conversation-replies/:conversation_id", message.conversationReplies)
    .get("/user-two/:conversation_id", message.userTwo)
    .get("/conversation-id/:user_two", message.conversationId)
    .get("/check-conversations/:user_one/:user_two", message.checkConversations)
    .post("/conversation-replies/:user_one/:user_two", message.storeConversationReplies);
module.exports = Route;
