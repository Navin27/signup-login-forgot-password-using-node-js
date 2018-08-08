var express = require('express');
var router = express.Router();
var Signup = require('../models/Signup');
var authenticate = require('../middleware/authenticate');

/* GET users listing. */
router.get('/home/:token' , function(req, res, next) {
  res.send(authenticate.authenticate(token));
  //  return authenticate.authenticate(token).then( (user) => {
  //   // Signup.findOne({
  //   //   _id: user._id
  //   //  }).then((user) => {
  //   //    console.log(user);
  //   //    //res.render('welcome.ejs' ,{title : user.firstName});
  //   //    res.send("welcome user");
  //   //  }).catch( () => {
  //   //     res.send('user not found !');
  //   //  });
  // }).catch(() => {
  //     res.send('Unautherised access');
  // });
  //res.redirect('/');
});

module.exports = router;
