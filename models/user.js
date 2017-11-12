var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/HookahMe');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String
});

mongoose.model('user', userSchema);

var instance = new userSchema();
console.log(instance);

module.exports = mongoose.model('user', userSchema);
