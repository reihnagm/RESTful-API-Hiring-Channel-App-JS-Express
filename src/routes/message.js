const express = require("express");
const Route = express.Router();
const Message = require("../controllers/message");
Route
    .get("/get_conversation_lists/:user_session", Message.get_conversation_lists)
    .get("/get_reply_conversation_replies/:conversation_id", Message.get_reply_conversation_replies)
    .get("/get_user_two/:conversation_id", Message.get_user_two)
    .get("/get_conversation_id/:user_two", Message.get_conversation_id)
    .get("/check_conversations/:user_one/:user_two", Message.check_conversations)
    .post("/insert_into_conversation_replies/:user_one/:user_two", Message.insert_into_conversation_replies);
module.exports = Route;
