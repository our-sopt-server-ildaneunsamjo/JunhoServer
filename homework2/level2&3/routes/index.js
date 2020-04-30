var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api',require('./api'));
// /api/index.js에 선언한 걸 여기서 호출 즉 실행한다는 뜻!

module.exports = router;