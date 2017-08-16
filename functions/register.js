var mongo = require('mongojs');
var db = mongo('HookahMe', ['users']);

module.exports = function (username){
  console.log(username);
  db.users.findOne({username: username}, function(err, docs){
    return 'docs';
  });
}
