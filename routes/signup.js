var express = require('express');
var router = express.Router();
var Signup = require('../models/Signup');
const _ = require('lodash');
var Email = require('../emailSend/emailSend');

/* GET users listing. */
router.get('/' ,function(req, res, next)
 {
  res.render('signup.ejs', { title : 'Sign up'});
});

router.get('/changePassword', function(req, res, next)
 {
  res.render('forgotpsd.ejs', { title : 'Forgot Password'});
});

router.post("/addname", (req, res) =>
{
  var body = _.pick(req.body, ['firstName','lastName','mobile','email', 'password']);
  var myData = new Signup(body);
	 myData.save().then(item =>
     {
 	     res.send("item saved to database");
 	   })
 	   .catch(err => {
        console.log(err);
 	     res.status(400).send("unable to save to database");
 	   });
});

router.get('/forgot/reset/:token',(req, res ) => {
  res.render('resetpsd.ejs', {title : " Reset Password"});
});

router.post('/forgot/reset/:token',(req, res ) => {
  console.log('token ' , req.params.token);
  console.log('password' , req.body.password);
   
      Signup.findOne({"resettokens": { $elemMatch: {"token":req.params.token, "expire" :{ $gt: Date.now() } } } }, function(err, user) {
        if (!user) {
           res.send('error', 'Password reset token is invalid or has expired.');
       }

       user.password = req.body.password;
       user.resettokens = undefined;
        user.save().then(item =>
          {
             res.send("password has been updated");
           })
           .catch(err => {
             console.log(err);
             res.status(400).send("Enter valid password");
           });
      });
  
});

router.post('/changePassword', (req, res )=>{
    var body = _.pick(req.body, ['email']);
    Signup.find({email : body.email},(err,user) =>{
      console.log('user', user);
      if(err)
      {
        return res.send('Email is not found ! Please Enter valid Email .');
      }
      if(user.length!==0)
      {
        return user[0].generateResetToken().then( (token) =>{
          res.send({"Mail has been sent to " : Email.sendEmail(user[0].email, token)}); 
        }).catch( (e) => {
          res.send('links has expire !');
        });  
      }
      else{
        res.send('user not found');
      }
    });
});


router.post("/user",(req, res) =>
{
    var body = _.pick(req.body, ['email', 'password']);
    Signup.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
       res.send({token});
        //res.render('welcome.ejs', {title: user.firstName +" "+ user.lastName});    
      });
     }).catch((e) => {
       console.log(e);
      res.status(400).send({status: 404 , value :'user not found'});
   });
    // Signup.find({username : req.body.username, password : req.body.password} , function(err, user)
    // {
    //      if(err)
    //      {
    //        console.log('throw', err);
    //      }
    //      if(user.length!==0)
    //      {
    //        console.log(user);
    //      res.render('welcome.ejs', {title: req.body.username});
    //      }
    //      else {
    //        {
    //          res.send('User not found');
    //        }
    //      }
    //  });
});



module.exports = router;
