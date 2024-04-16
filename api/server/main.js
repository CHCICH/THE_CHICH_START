const express = require('express');
const app = express();
const SERVER_PORT = 5000;

app.get('/',(req,res)=>{
    res.status(200).send('hello guys')
})



app.listen(SERVER_PORT,()=>{
    console.log(`server listening to port ${SERVER_PORT}`);
})