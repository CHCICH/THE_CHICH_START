const express = require('express');
const productRouter = express.Router();
const {createNewItem, editItem, deleteItem,deleteAllItems,showProductsOfUser,showRandomFeed} = require('../controllers/products');


productRouter.post('/create',createNewItem);
productRouter.put('/editType/:ItemID',editItem);
productRouter.delete('/deleteItem',deleteItem);
productRouter.delete('/deleteAllItems',deleteAllItems);
productRouter.get('/showself',showProductsOfUser)
productRouter.get('/showfeed',showRandomFeed)

module.exports = productRouter;





