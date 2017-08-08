var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongojs');
var db = mongo('HookahMe', ['argile']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
//app.use('/api', api); // redirect API calls
app.use(express.static(__dirname + '/views'));
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/angular')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


app.get('/types', function(req, res){
	db.argile.find(function(err, docs){
		res.json(docs);
		console.log(docs);
	});
});


app.listen(3000, function(){
	console.log('app listening to port 3000');
});