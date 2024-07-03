const express = require("express");
const pageRouter = express.Router();


pageRouter.get('/:id',(req,res)=>{
    console.log(req.params);
    res.send('e')
})






module.exports = pageRouter