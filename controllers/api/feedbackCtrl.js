var models = require('../../models/models');

exports.getFeedbacks = function(req, res) {

  models.feedback.getFeedbacks({ owner: req.userId }, function(err, results){
    if (err) {
      res.send(err);
    } else {
      res.json({ feedbacks : results });
    }
  });
}

exports.getFeedback = function(req, res) {
  models.feedback.getFeedback(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ feedback : result });
    }
  });
}

exports.createFeedback = function(req, res) {
  var feedbackData = {
                       image_url: req.file.path,
                       owner: req.userId
                     };

  models.feedback.create(feedbackData, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ feedback : result });
    }
  });
}

exports.updateFeedback = function(req, res, next) {
  models.feedback.update(req.params.id, req.body, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ feedback : result });
    }
  });
}

exports.deleteFeedback = function(req, res) {
  models.feedback.destroy(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ feedback : result });
    }
  });
}