var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
	res.render('login');
});

router.post('/login', (req, res, next) => {
	console.log("login req.body: ");
	console.log(req.body);
	res.redirect('/');
});

module.exports = router;
