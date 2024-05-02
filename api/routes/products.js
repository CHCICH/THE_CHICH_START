const express = require('express');
const productRouter = express.Router();
const {createNewItem} = require('../controllers/products');


productRouter.post('/',createNewItem);

module.exports = productRouter;





