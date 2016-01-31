var SessionsCtrl = require('../../controllers/api/SessionsCtrl');

var express = require('express');
var sessions = express.Router();


sessions.route('/')
  .post(SessionsCtrl.signIn)
  .delete(SessionsCtrl.signOut);

sessions.route('/register')
  .post(SessionsCtrl.createUser);

module.exports = sessions;
