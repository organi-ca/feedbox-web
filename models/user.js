var config = require('configure');

module.exports = function(mongoose){

  var Schema = mongoose.Schema,
      bcrypt = require('bcrypt');

  var UserSchema = new Schema({
    name:  String,
    first_name: String,
    last_name: String,
    email: { type: String, required: true, index: { unique: true, dropDups: true }},
    password: { type: String, required: true },
    access_tokens: String,
    gender: String,
    created_at: { type: Date, default: Date.now },
  });

  UserSchema.pre('save', function(next) {
    var user = this;

    user.name = user.first_name + ' ' + user.last_name;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt

    var salt = bcrypt.genSaltSync(parseInt(process.env.SALT_WORK_FACTOR) || config.SALT_WORK_FACTOR);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;

    next();
  });

  UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
  };

  var User = mongoose.model('User', UserSchema);

  function getUsers(filter, resultsCallback){
    var filter =  filter || {};

    User.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getUser(_id, resultsCallback){
    User.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function autenticate(email, password, resultsCallback){
    var filter = { email: email }
    User.findOne(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        if (!err) {
          result.comparePassword(password, function(error, isMatch) {
              if (!error) {
                if (isMatch) {
                  resultsCallback(err, result)
                }
              } else {
                resultsCallback(err, null);
              }
          });
        } else {
          resultsCallback(err, null);
        }
      }
    });
  }

  function create(attrs, resultsCallback){
    var user = new User(attrs);

    user.save(function(err) {
      if (err) return resultsCallback(err, null);
        getUser(user, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    User.findByIdAndUpdate(_id, attrs, resultsCallback)
  }

  function destroy(_id, resultsCallback){
    User.findByIdAndRemove(_id, resultsCallback)
  }

  var methods = {
    getUser: getUser,
    getUsers: getUsers,
    create: create,
    update: update,
    destroy: destroy,
    klass: User,
    autenticate: autenticate
  }

  return methods;
}