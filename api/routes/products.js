const express = require('express');
const productRouter = express.Router();
const {createNewItem, editItem, deleteItem} = require('../controllers/products');


productRouter.post('/create',createNewItem);
productRouter.put('/editType/:ItemID',editItem);
productRouter.delete('/deleteItem',deleteItem);

module.exports = productRouter;





