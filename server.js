var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var path = require('path');
var mongo = require('mongojs');
var db = mongo('HookahMe', ['argile']);
var register = require('./functions/register');
app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

// mongoose.connect('mongodb://localhost/HookahMe');
// var db = mongoose.connection;

// db.once('open', function(){
// 	console.log('connected to mongoDB');
// });
// db.on('error',function(err){
// 	console.log('Could not connect to mongoDB');
// });

// var argile = require('./models/argile');
app.use(express.static(__dirname + '/public/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/angular')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	db.users.findOne({username: username}, function(err, docs){
		if(docs){
			console.log('user already exists');
		}else{
			console.log('registered');
		}
	});
});

app.get('/about', function(req, res){
	var name = req.param('name');
	console.log(name);
	res.sendFile(__dirname + '/public/about.html');
});

app.listen(3000, function(){
	console.log('app listening to port 3000');
});
