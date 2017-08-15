var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongojs');
var db = mongo('HookahMe', ['argile']);

app.use(express.static(__dirname + '/public', {index:'login.html'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/angular')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


app.get('/types', function(req, res){
	db.argile.find(function(err, docs){
		res.json(docs);
	});
});

app.get('/users', function(req, res){
db.users.find(function(err, doc){
		res.json(doc);
	});
});

app.get('/product/:id', function(req, res){
    var id = req.params.id;
    db.argile.findOne({_id: mongo.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.get('/about', function(req, res){
	var name = req.param('name');
	console.log(name);
	res.sendFile(__dirname + '/public/about.html');
});

app.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	console.log(username + ' ' + password);
});




app.listen(3000, function(){
	console.log('app listening to port 3000');
});
