module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;

  var FeedbackSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    proyect: { type: Schema.Types.ObjectId, ref: 'Proyect' },
    image_url: String,
    data_os: String,
    data_plataform: String,
    data_screen: String,
    notes: String,
    created_at: { type: Date, default: Date.now }
  });

  var Feedback = mongoose.model('Feedback', FeedbackSchema);

  function getFeedbacks(filter, resultsCallback){
    filter =  filter || {};

    console.log(filter);

    Feedback.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getFeedback(_id, resultsCallback){
    Feedback.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var user = new Feedback(attrs);

    user.save(function(err) {
      if (err) return resultsCallback(err, null);

      getFeedback(user, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    Feedback.findByIdAndUpdate(_id, attrs, function(err, result){
      getFeedback(_id, resultsCallback);
    });
  }

  function destroy(_id, resultsCallback){
    Feedback.findByIdAndRemove(_id, resultsCallback)
  }

  var methods = {
    getFeedback: getFeedback,
    getFeedbacks: getFeedbacks,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}