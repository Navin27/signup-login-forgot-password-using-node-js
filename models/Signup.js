var mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')
const config = require('../config/config');


var Schema = new mongoose.Schema({
	firstName : { type : String,  require : true  },
  lastName : { type : String, require : true  },
  mobile : { type : Number, require : true,  maxlength : 10, minlength : 10 },
	password : {
    type: String,
    require: true,
    minlength: 6
  },
	email : {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  resettokens: [{
    expire: {
      type: Date,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

Schema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  });
  
  Schema.methods.generateResetToken = function () {
    var user = this;
    var expire =  Date.now() + 3600000;
    var token = jwt.sign({_id: user._id.toHexString(), expire}, config.secret).toString();
    user.resettokens.push({expire, token});
    //user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() => {
      return token;
    });
  };


  Schema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, config.secret).toString();
    user.tokens.push({access, token});
    //user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() => {
      return token;
    });
  };


Schema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, config.secret);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};


  Schema.statics.findByCredentials = function (email, password) {
    var User = this;
  
    return User.findOne({email}).then((user) => {
      if (!user) {
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        // Use bcrypt.compare to compare password and user.password
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    });
  };


var Signup = mongoose.model('signup', Schema, 'signups');

module.exports = Signup;
