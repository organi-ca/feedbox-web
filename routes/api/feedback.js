var FeedbackCtrl = require('../../controllers/api/feedbackCtrl');

var express = require('express');
var feedback = express.Router();

var multer  =   require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads');
  },
  filename: function (req, file, callback) {
    var nameArry =  file.originalname.split('.');
    var extension = nameArry[nameArry.length - 1];
    console.log();
    callback(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});


var upload = multer({ storage : storage});



feedback.route('/')
  .get(FeedbackCtrl.getFeedbacks)
  .post(upload.single('file'), FeedbackCtrl.createFeedback);

feedback.route('/:id')
  .get(FeedbackCtrl.getFeedback)
  .put(FeedbackCtrl.updateFeedback)
  .delete(FeedbackCtrl.deleteFeedback);

module.exports = feedback;
