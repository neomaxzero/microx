'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:{ type: String, lowercase: true },
  name: String,
  email: String,
  role:{
    type: String,
    default:'user'
  },  
  hashedPassword:String,
  provider:String,
  salt:String
});

//Get/Set Password
UserSchema
  .virtual('password')
  .set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function(){
    return this._password;
  });


// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 **/

  //Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword){
    return hashedPassword.length;
  },'Password cannot be blank');

//Validate username unique
UserSchema
  .path('username')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({username: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, 'The specified username is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

//Hook detects if password is not empty or null
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword))
      next(new Error('Invalid password'));
    else
      next();
  });


/**
 * Methods
 **/

UserSchema.methods = {
  //Check if the passwords are the same
  authenticate: function(plainText){
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
  //Make random salt
  makeSalt:function () {
    return crypto.randomBytes(16).toString('base64');
  },
  encryptPassword:function (password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password,salt,10000,64).toString('base64');
  }
};

module.exports = mongoose.model('User',UserSchema);