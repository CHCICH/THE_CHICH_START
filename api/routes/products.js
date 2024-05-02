const express = require('express');
const productRouter = express.Router();
const {createNewItem, editItem} = require('../controllers/products');


productRouter.post('/create',createNewItem);
productRouter.put('/editType/:ItemID',editItem);


module.exports = productRouter;





