const express = require("express");
const Route = express.Router();
const Message = require("../controllers/message");
Route
    .get("/conversation-lists/:user_session", Message.conversationLists)
    .get("/conversation-replies/:conversation_id", Message.conversationReplies)
    .get("/user-two/:conversation_id", Message.userTwo)
    .get("/conversation-id/:user_two", Message.conversationId)
    .get("/check-conversations/:user_one/:user_two", Message.checkConversations)
    .post("/conversation-replies/:user_one/:user_two", Message.storeConversationReplies);
module.exports = Route;
