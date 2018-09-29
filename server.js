var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongo = require('mongojs');
var db = mongo('HookahMe', ['argile']);
<<<<<<< HEAD
var session = require('express-session');
var expressValidator = require('express-validator');
var favicon = require('serve-favicon');
// var userSchema = require('./models/user.js');
// var sess = {
//   secret: 'keyboard cat'
// 	resave: false,
// 	saveUninitialized: true
// }

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

app.use(favicon(path.join(__dirname + '/public/Images/favicon.png')));
app.use(function(req, res, next){
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
});

//error handling
// app.use(function(req,res){
// 	res.status(404).send('<h1>Page not found</h1>');
// });

// app.use(session({secret: 'kksdf7a7sdf67ds0f7', resave:false, saveUninitialized: true, cookie: {secure: true}}));
// app.use(session(sess));



app.get('/logout', function(req, res){
	if(req.session){
		req.session.destroy(function(err){
			if(err){
				return next(err);
			}else{
				return res.redirect('/');
			}
		});
	}
});

app.get('/', function(req, res){
	res.render('index');
});

app.post('/home', function(req, res){
	// if(req.session.userId){
	// 	console.log(req.session.userId);
	// }else{
		var errors = [];
		db.users.findOne({username: req.body.username, password: req.body.password}, function(err, docs){
			if(docs){
				//req.session.userId = docs._id;
				res.render('home');
			}else{
				errors.push({msg:'Wrong username or password'});
				res.render('index', {errors: errors, last_try: req.body.username});
			}
		});
	// }
});




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

			db.users.findOne({username: username}, function(err, docs){
				if(docs){
					errors = [];
					errors.push({msg:'User already exists!'});
					res.render('index', {errors: errors});
				}else{
					db.users.insert({username: username, password: password}, function(err, result){
						//res.render('home');
          });

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

app.get('/users/:username', function(req, res){
	if(req.params.username === 'abed'){
		console.log(req.params.username);
	}

});

app.listen(3000, function(){
	console.log('app listening to port 3000');
});
