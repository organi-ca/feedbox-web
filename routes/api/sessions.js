var SessionsCtrl = require('../../controllers/api/SessionsCtrl');

var express = require('express');
var sessions = express.Router();


sessions.route('/')
     .post(SessionsCtrl.signIn);

sessions.route('/')
     .delete(SessionsCtrl.signOut);

module.exports = sessions;
