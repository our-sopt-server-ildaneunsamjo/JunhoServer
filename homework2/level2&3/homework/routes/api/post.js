var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    const post ={
        title:'how to use express Easy❔',
        author:'juno_o',
        content: '✔express 사용법 알아보기✔'
    }
    res.status(200).send(post);
});

module.exports = router;