var express = require('express');
var router = express.Router();
var Signup = require('../models/Signup');

/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('login.ejs', { title: 'Login' });
});

// router.get('/books',function(req, res)
// {
//     res.render('book.ejs',{title: 'to Books'});
// });

module.exports = router;
