const express = require("express");
const { LogIn } = require("../controllers/login");
const LoginRouter = express.Router();

LoginRouter.get('/',LogIn)


module.exports = LoginRouter