const express = require("express")
const Route = express.Router()
const messageNotifications = require("../controllers/message_notification")

Route
    .get("/", messageNotifications.getNotifications)
    .post("/send-notifications", messageNotifications.sendNotifications)

module.exports = Route
