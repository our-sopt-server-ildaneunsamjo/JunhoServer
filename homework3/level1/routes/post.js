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
        name: post.name,
        content: post.content
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK,responseMessage.READ_POST_SUCESS,result));
});

router.post('/',async(req,res)=>{
  const {id,author,name} = req.body;
  // request data 여부 확인
  if(!id || !name || !content){
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'BAD REQUSET'));
  }
  // already data 여부 확인
  if(Post.filter(iter => iter.id == id).length>0){
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'ALREADY ID'));
  }
  const newpost ={id,name,content};

  Post.push(newpost);
  res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.POST_SUCCESS, newpost));
});

router.put('/:id',async(req,res)=>{
  const id = req.params.id;
  const {name,content} = req.body;
  
  if(!id || !name || !content){
    return res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
  }

  for(var i in Post){
    if(Post[i].id === id){
      Post[i].name = name;
      Post[i].content = content;

      res.status(statusCode.OK)
      .send(util.success(statusCode.OK,responseMessage.UPDATE_POST_SUCESS,Post[i]));
    }
  }
  res.status(statusCode.BAD_REQUEST,responseMessage.UPDATE_POST_FAIL);
});

router.delete('/:id',async(req,res)=>{
    const id = req.params.id;

    if(!id){
      res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
    }
    for(var i in Post){
      if(Post[i].id === id){
        Post[i].splice(i,1);
        res.status(statusCode.OK)
        .send(util.success(statusCode.OK,responseMessage.DELETE_POST_SUCESS,{deleteId: id}));
      }
    }
    res.status(statusCode.BAD_REQUEST)
    .send(statusCode.BAD_REQUEST,responseMessage.DELETE_POST_FAIL);
});
// 1. delete 해서 요소 지우고, filter로 null 값인 것을 걸러내서 새로 배열에 추가
// 2. splice 로 지우기
module.exports = router;