var express = require('express');
var router = express.Router();
let Usermodel = require('../models/user');
let util = require('../modules/util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* 1단계 - 에러처리 x
router.post('/signup',async(req,res)=>{
  const {id,name,password,email}= req.body;
  // 1. signup 페이지 body에서 id,name,password,email을 받아온다
  Usermodel.push({id,name,password,email});
  // 2. Usermodel에(../models/user 안에) 받아온다. 
  res.status(200).send(Usermodel);
  // 3. 성공한 상태와 동시에 Usermodel을 응답(res)으로 내보낸다.
})
*/

// 2단계
router.post('/signup',async(req,res)=>{
  const {id,name,password,email} = req.body;
  // request data 여부 확인
  if(!id || !name || !password || !email){
    return res.status(400).send(util.fail(400,'BAD REQUSET'));
  }
  // already data 여부 확인
  if(Usermodel.filter(user => user.id == id).length>0){
    return res.status(400).send(util.fail(400,'ALREADY ID'));
  }
  Usermodel.push({id,name,password,email});
  res.status(200).send(util.success(200, '회원가입 성공!', {userId: id}));
});

module.exports = router;