// var {Signup} = require('../models/Signup');

// var authenticate = (token) => {
//   //var token = req.header('x-auth');
//   //var token = req.params.token;
//   console.log(token);
//   Signup.findByToken(token).then((user) => {
//     if (!user) {
//       return Promise.reject();
//     }
//     console.log(user);
//     return Promise.resolve(user);
//     //req.user = user;
//     //req.token = token;
//     next();
//   }).catch((e) => {
//     res.status(401).send();
//   });
// };

// authenticate('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjU5YTViNDg1ZTMyOTRjZjQ4YzUzY2YiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTMyOTMxNDUyfQ.E47R6KCxPyoEDKsGbgJVxwRll-v-k_e7cGPQvHS9jVo');
// module.exports = {authenticate};
