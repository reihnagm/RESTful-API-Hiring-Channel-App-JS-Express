const express = require("express");
const Route = express.Router();
const MessageNotifications = require("../controllers/message_notification");
Route
    .get("/", MessageNotifications.getNotifications)
    .post("/send-notifications", MessageNotifications.sendNotifications);
module.exports = Route;