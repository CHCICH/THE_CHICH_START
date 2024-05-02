const express = require('express');
const app = express();
const SERVER_PORT = 5000;
const {LoginRouter, CartRouter,pageRouter,UserDataRouter, SignUpRouter, productRouter} = require('../routes/MainRoute');
const {directTothepath} = require('../utils/direction');
const {DateForLog} = require('../middleware/Logs');
//other middlewares

app.use(express.static(directTothepath(__dirname,"PUBLIC_STATIC")+'front-end'));
app.use(express.json());
app.use(DateForLog)
//routes

app.use('/',pageRouter);
app.use('/api/login', LoginRouter);
app.use('/api/cart', CartRouter);
app.use('/api/user',UserDataRouter);
app.use('/api/signup',SignUpRouter)
app.use('/api/item',productRouter);
//

app.listen(SERVER_PORT, async ()=>{
    try{
        console.log(`the server is listening to port ${SERVER_PORT}`)
    }
    catch(err){
        console.log(err)
    }
});