var express = require('express');
var router = express.Router();
let Post = require('../models/post');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let responseMessage = require('../modules/responseMessage');

router.get('/', function(req, res, next) {
    res.send('Welcome to post page!');
  });

router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    const post = Post.filter(post => post.id === id)[0];
    // 존재하는 아이디인지 확인 - 없다면 No user 반환 -> post에 맞게 이름 바꿔주자..!
    if (post === undefined) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        return;
    }

    const result= {
        id: post.id,
        author: post.author,
        name: post.name
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK,responseMessage.LOGIN_SUCCESS,result));
});

router.post('/post',async(req,res)=>{
    const {id,author,name} = req.body;
  // request data 여부 확인
  if(!id || !name || !author){
    return res.status(400).send(util.fail(400,'BAD REQUSET'));
  }
  // already data 여부 확인
  if(Post.filter(iter => iter.id == id).length>0){
    return res.status(400).send(util.fail(400,'ALREADY ID'));
  }
  const newpost ={id,author,name};

  Post.push(newpost);
  res.status(200).send(util.success(200, '게시글 생성 완료!', newpost));
});

router.put('/post/:id',async(req,res)=>{

});

router.delete('/post/:id',async(req,res)=>{
    
});

module.exports = router;