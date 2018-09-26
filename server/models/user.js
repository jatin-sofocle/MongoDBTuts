const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


//user schema----type...required...and all
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email.',
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens:[{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});



//toJSON: chose what goes back to user---
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

//for login...find by credentials-------
UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (error, result) => {
          if (result) {
            resolve(user);
          } else {
            reject();
          }
      });
    });
  });
}


//generateAuthToken and saves it in the user instance----
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, '<SaltingKeyXYZ>').toString();
  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
}


//find by token: adding model method---
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded ;

  try {
    decoded = jwt.verify(token, '<SaltingKeyXYZ>');
  } catch (e) {
    return Promise.reject();
  };


  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}


//removing token----
UserSchema.methods.removeToken = function (token) {
  user = this;
  return user.update({
    $pull: {
      tokens:{token}
    }
  });
}


//Salting passwords
UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')){
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


//creating model from schema-----
var User = mongoose.model('user', UserSchema);



//exports----
module.exports = {User};
