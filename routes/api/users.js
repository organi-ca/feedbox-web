var UsersCtrl = require('../../controllers/api/usersCtrl');

var express = require('express');
var users = express.Router();

users.route('/')
  .get(UsersCtrl.getUsers)
  .post(UsersCtrl.createUser);

users.route('/:id')
  .get(UsersCtrl.getUser)
  .put(UsersCtrl.updateUser)
  .delete(UsersCtrl.deleteUser);

module.exports = users;
