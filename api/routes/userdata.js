const express = require("express");
const UserDataRouter = express.Router();
const {editInfo} = require('../controllers/userdata');

UserDataRouter.put('/editInfo',editInfo);







module.exports = UserDataRouter