const express = require('express');
const SignUpRouter = express.Router();
const {createAccount} = require('../controllers/signUp');



SignUpRouter.post('/',createAccount);



module.exports = SignUpRouter;