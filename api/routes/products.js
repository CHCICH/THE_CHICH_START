const express = require('express');
const productRouter = express.Router();
const {createNewItem, editItem, deleteItem,deleteAllItems} = require('../controllers/products');


productRouter.post('/create',createNewItem);
productRouter.put('/editType/:ItemID',editItem);
productRouter.delete('/deleteItem',deleteItem);
productRouter.delete('/deleteAllItems',deleteAllItems);


module.exports = productRouter;





