var express = require('express');
var router = express.Router();
let Usermodel = require('../models/user');
let User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let responseMessage = require('../modules/responseMessage');
let encrypt = require('../modules/encrypt');
const jwt = require('../modules/jwt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('welcome to user page!');
});


// (1)signup : 회원가입 구현
router.post('/signup',async(req,res)=>{
  const {id,name,password,email} = req.body;
  // request data 여부 확인
  if(!id || !name || !password || !email){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
  }
  
  if(await User.checkUser(id)){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.ALREADY_ID));
  }
  
  const salt = encrypt.makesalt();
  const hashed = await encrypt.encrypt(password,salt);
  const index = User.signup(id,name,hashed,salt,email);
  if(index == -1){
    return res.status(statusCode.DB_ERROR)
      .send(util.fail(statusCode.DB_ERROR,responseMessage.DB_ERROR));
  }
  res.status(statusCode.OK)
    .send(util.success(statusCode.OK,responseMessage.CREATED_USER,{userId : index}));
});

// (2)signin : 로그인 구현
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
  
  // id 중복여부 확인
  if(!(await User.checkUser(id))){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_USER));
  }
  // pw 확인
  if(await User.signin(id,password) === false){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.MISS_MATCH_PW));
  }
  // 로그인 성공
  return res.status(statusCode.OK)
    .send(util.success(statusCode.OK,responseMessage.LOGIN_SUCCESS,{userId: id}));
});

// 프로필 조회
router.get('/profile/:id', async (req, res) => {
  // request params 에서 데이터 가져오기
  const id = req.params.id;
  // request data 여부 확인
  if(!id){
    return res.status(statusCode.BAD_REQUEST)
      .send(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE);
  }
 // 존재하는 id인지 확인 - 없다면 No user 반환
  const checkuser = await User.checkUser(id);
  if(!checkuser){
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_USER));
  }
  // 성공
  const user = await User.getUserById(id);
  return res.status(statusCode.OK)
    .send(util.success(statusCode.OK,responseMessage.READ_PROFILE_SUCCESS,{
      userId : user.id,
      userName : user.name,
      userEmail : user.email,
    }));
});

module.exports = router;