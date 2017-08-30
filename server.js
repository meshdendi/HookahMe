var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var path = require('path');
var mongo = require('mongojs');
var db = mongo('HookahMe', ['argile']);
var register = require('./functions/register');
var session = require('express-session');
var expressValidator = require('express-validator');

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
// app.use(express.static(__dirname + '/public/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/angular')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/public/styles'));
app.use(expressValidator());
// app.use(session({secret: 'kksdf7a7sdf67ds0f7', resave:false, saveUninitialized: true, cookie: {secure: true}}));

var sess = {
  secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

app.get('/', function(req, res){
	res.render(__dirname + '/public/views/index');
});
app.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var errors = [];

	req.check('username', 'invalid email adress').isEmail();
	req.getValidationResult().then(function(result){
		if(((result.array()).length > 0) && ((result.array()) != undefined)){
			errors = result.array();
			res.render('index', {errors: errors});
		}else{
			db.users.findOne({username: username, password: password}, function(err, docs){
				if(docs){
					console.log('user already exiss');
					res.status('404').send('welcome 404');
				}else{
					console.log('registered');
				}
			});
		}
	});
});

app.get('/about', function(req, res){
	res.sendFile(__dirname + '/public/views/about.html');
});

app.listen(3000, function(){
	console.log('app listening to port 3000');
});
