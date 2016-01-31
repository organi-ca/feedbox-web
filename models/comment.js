module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;

  var CommentSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    feedback: { type: Schema.Types.ObjectId, ref: 'Feedback' },
    comment: String,
    created_at: { type: Date, default: Date.now }
  });

  var Comment = mongoose.model('Comment', CommentSchema);

  function getComments(filter, resultsCallback){
    filter =  filter || {};

    Comment.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getComment(_id, resultsCallback){
    Comment.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var user = new Comment(attrs);

    user.save(function(err) {
      if (err) return resultsCallback(err, null);

      getComment(user, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    Comment.findByIdAndUpdate(_id, attrs, function(err, result){
      getComment(_id, resultsCallback);
    });
  }

  function destroy(_id, resultsCallback){
    Comment.findByIdAndRemove(_id, resultsCallback)
  }

  var methods = {
    getComment: getComment,
    getComments: getComments,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}