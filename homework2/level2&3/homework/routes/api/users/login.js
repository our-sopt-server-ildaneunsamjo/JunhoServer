var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    const message = '🎁welcome to Login page🎁'
    res.send(message);
});

module.exports=router;