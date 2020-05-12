var express = require('express');
var router = express.Router();
let Post = require('../models/post');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let responseMessage = require('../modules/responseMessage');

router.get('/post/:id',async(req,res)=>{
    const id = req.params.id;
    const post = Post.filter(post => post.id == id)[0];
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (post === undefined) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        return;
    }

    const result= {
        id = post.id,
        author = post.author,
        name = post.name
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK,responseMessage.LOGIN_SUCCESS,result));
});

router.post('/post',async(req,res)=>{

});

router.put('/post/:id',async(req,res)=>{

});

router.delete('/post/:id',async(req,res)=>{

});

module.exports = router;