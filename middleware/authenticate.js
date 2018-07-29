var {Signup} = require('../models/Signup');

var authenticate = (token) => {
  //var token = req.header('x-auth');
  //var token = req.params.token;
  console.log(token);
  Signup.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    
    return Promise.resolve(user);
    //req.user = user;
    //req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
