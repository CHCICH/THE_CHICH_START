const express = require("express");
const pageRouter = express.Router();


pageRouter.get('/api/user',(req,res)=>{
    res.json([1,2,3,4])
})






module.exports = pageRouter