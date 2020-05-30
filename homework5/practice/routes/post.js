var express = require('express');
var router = express.Router();
let Post = require('../models/post');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let responseMessage = require('../modules/responseMessage');

// (1) 게시글 조회(전체)
router.get("/", async (req, res) => {
  const result = await Post.postSearchAll();
  return res.status(statusCode.OK)
    .send(util.success(statusCode.OK,responseMessage.READ_POST_SUCESS,result));
});

// (2) 게시글 조회
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  // 유효성 확인
  if(!id){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
  }
  // DB에서 확인
  if(!(await Post.checkPost(id))){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_POST));
  }
  const result = await Post.postSearch(id);
  return res.status(statusCode.OK)
    .send(util.success(statusCode.OK,responseMessage.READ_POST_SUCESS,result));
});

// (3) 게시글 생성
router.post('/',async(req,res)=>{
  const {id, author, title, content, createdAt} = req.body;
  // 유효성 확인
  if(!id || !author || !title || !content || !createdAt){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,'BAD REQUSET'));
  }
  // post 생성 성공
  const result = await Post.postCreate(id,author,title,content,createdAt);
  return res.status(statusCode.OK)
    .send(util.success(statusCode.OK,responseMessage.POST_SUCCESS, result));
});

// (4) 게시글 수정
router.put('/:id',async(req,res)=>{
  const id = req.params.id;
  const {title,content,updatedAt} = req.body;
  // 유효성 검사
  if(!title || !content || !updatedAt){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
  }
  // 존재하는 id 여부 확인
  if(!(await Post.checkPost(id))){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_ID));
  }
  // post 수정 성공
  const result = await Post.postUpdate(id,title,content,updatedAt);
  return res.status(statusCode.OK)
    .send(util.success(statusCode.OK,responseMessage.UPDATE_POST_SUCESS,result));
});

// (5) 게시글 삭제
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if(!id) {
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  if(!(await Post.checkPost(id))){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST),responseMessage.NO_ID);
  }
  const result = await Post.postDelete(id);
  res.status(statusCode.OK)
    .send(util.success(statusCode.OK,responseMessage.DELETE_POST_SUCESS),result);
});
module.exports = router;