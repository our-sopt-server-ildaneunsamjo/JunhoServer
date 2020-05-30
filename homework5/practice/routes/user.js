var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

// (1)signup : 회원가입 구현
router.post('/signup',userController.signup);
// (2)signin : 로그인 구현
router.post('/signin',userController.signin);
// (3)프로필 조회
router.get('/profile/:id',userController.getUserById);

module.exports = router;