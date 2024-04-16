const express = require('express');
const app = express();
const SERVER_PORT = 5000;
const {LoginRouter, CartRouter,pageRouter,UserDataRouter} = require('../routes/MainRoute');
const {directTothepath} = require('../utils/direction');


app.use(express.static(directTothepath(__dirname,"PUBLIC_STATIC")+'front-end'));
app.use(express.json());

app.use('/',pageRouter);
app.use('/login', LoginRouter);
app.use('/cart', CartRouter);
app.use('/user',UserDataRouter)


app.listen(SERVER_PORT, async ()=>{
    try{
        console.log(`the server is listening to port ${SERVER_PORT}`)
    }
    catch(err){
        console.log(err)
    }
});