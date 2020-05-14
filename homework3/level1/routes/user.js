var express = require('express');
var router = express.Router();
let Usermodel = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let responseMessage = require('../modules/responseMessage');
let encrypt = require('../modules/encrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('welcome to user page!');
});

// 회원가입 2단계 - 에러처리, 에러메시지 객체로
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

  const salt = encrypt.makesalt();
  const hashed = await encrypt.encrypt(password,salt);

  Usermodel.push({id,name,hashed,email});
  res.status(200).send(util.success(200, '회원가입 성공!', 
  {
    userId: id,
    userpw: hashed
  }
  ));
});

// 로그인 구현
router.post('/signin',async(req,res)=>{
  //1. req의 body에서 data 받아오기
  const{
    id,
    password
  }=req.body;
  //2. request data 확인(data가 제대로 들어왔는지 여부)
  if(!id || !password){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
    return;
  }
  //3. 존재하는 id인지 확인
  const user = Usermodel.filter(user=>user.id == id);
  // filter 함수 -> 주어진 콜백함수를 통과하는 요소들로 새로운 배열을 만듦, user라는 새로운 배열을 만듦
  if(user.length == 0){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_USER));
    return;
  }
  //4. 존재하는 pw인지 확인
  if(user[0].password !== password){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.MISS_MATCH_PW));
    return;
  } 
  //5. 성공(login success와 함께 userId 반환)
  res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {userId: id}));
});

// 프로필 조회
router.get('/profile/:id', async (req, res) => {
  // request params 에서 데이터 가져오기
  const id = req.params.id;
  const user = Usermodel.filter(user => user.id == id)[0];
  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  if (user === undefined) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      return;
  }
  const result = {
      id: user.id,
      name: user.name,
      email: user.email
  }
  // 성공 - login success와 함께 user Id 반환
  res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.READ_PROFILE_SUCCESS, result));
});

router.get('/debug',(req,res)=>{
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  res.send("HI")
});
module.exports = router;