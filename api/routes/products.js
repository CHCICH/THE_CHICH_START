const express = require('express');
const productRouter = express.Router();
const {createNewItem} = require('../controllers/products');


productRouter.post('/newitem',createNewItem);

module.exports = productRouter;





