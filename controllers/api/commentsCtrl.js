var models = require('../../models/models');

exports.getComments = function(req, res) {

  models.comment.getComments({ owner: req.commentId }, function(err, results){
    if (err) {
      res.send(err);
    } else {
      res.json({ comments : results });
    }
  });
}

exports.getComment = function(req, res) {
  models.comment.getComment(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ comment : result });
    }
  });
}

exports.createComment = function(req, res) {
  var commentData = req.body || { }

  commentData.feedback = req.feedbackId;

  models.comment.create(commentData, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ comment : result });
    }
  });
}

exports.updateComment = function(req, res, next) {
  models.comment.update(req.params.id, req.body, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ comment : result });
    }
  });
}

exports.deleteComment = function(req, res) {
  models.comment.destroy(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ comment : result });
    }
  });
}