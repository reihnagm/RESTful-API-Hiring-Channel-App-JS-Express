const express = require('express');
const Route = express.Router();
const Message = require('../controllers/message');
Route
    .get('/get_conversation_lists/:user_session', Message.get_conversation_lists)
    .get('/get_reply_conversation_replies/:conversations_id', Message.get_reply_conversation_replies)
    .get('/check_conversations/:user_one/:user_two', Message.check_conversations)
    .get('/get_conversations_last_id/:user_two', Message.get_conversations_last_id)
    .post('/insert_into_conversations/:user_one/:user_two', Message.insert_into_conversations)
    .post('/insert_into_conversation_replies/:user_session/:conversations_id', Message.insert_into_conversation_replies);
module.exports = Route;
