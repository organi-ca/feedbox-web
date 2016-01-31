var CommentsCtrl = require('../../controllers/api/commentsCtrl');

var express = require('express');
var comments = express.Router();

comments.route('/')
  .get(CommentsCtrl.getComments)
  .post(CommentsCtrl.createComment);

comments.route('/:id')
  .get(CommentsCtrl.getComment)
  .put(CommentsCtrl.updateComment)
  .delete(CommentsCtrl.deleteComment);


module.exports = comments;
