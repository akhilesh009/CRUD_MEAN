
/*var databaseURI = "localhost:27017/somedb";
var collections = ["users", "blogs"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;

and then just require it where you need to connect to mongo like:

var db = require("./db");
*/


var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('AddressBook', ['Persons']);

var bodyParser = require('body-parser');
var http = require('http');
var server = app.listen(3000);
//var io = require('socket.io').listen(server);



/*var server = http.createServer(app);
var io = require('socket.io');  //pass a http.Server instance*/


var devloperJson =  [];
//{"id":1 , "name":"aa" , "email":"aa.aa@gmail.com" , "number":12345, "role":"", "distanceFromOthersKM": "" }

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/persons', function(req, res){
	console.log('Received find all persons request');
	res.json(devloperJson);
	/*db.Persons.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})*/

});

app.get('/person/:id', function(req, res){
	console.log('Received findOne person request');

	for(i=0; i< devloperJson.length; i++){
		if(devloperJson[i].id == req.params.id){
			res.json(devloperJson[i]);
		}
	}

	/*db.Persons.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})*/
});

app.post('/addPerson', function(req, res){
	
	if(devloperJson.length != 0 ){
		var id = devloperJson[devloperJson.length -1].id+1;
		req.body.id = id;	
	}else{
		req.body.id = 1;
	}
	
	req.body.distanceFromOthersKM = 5; //default

	if(devloperJson.length == 0){
		req.body.role = "Admin";
	}else{
		req.body.role = "NonAdmin";
	}

	devloperJson.push(req.body);
	//socket.emit('message', {'message': 'User Added Successfully'});
	/*db.Persons.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})*/
});

app.delete('/deletePerson/:id', function(req, res){
	console.log("Received delete one person request...");

	for(i = 0; i<devloperJson.length; i++ ){
		console.log("in")
		if (devloperJson[i].id == req.params.id) 
	  	{
	  		console.log("in")
	    	if(devloperJson.length != 0 && devloperJson[i].role == 'Admin'){
	    		console.log("change role");
	    		devloperJson[i+1].role = 'Admin';

	    	}
	    	devloperJson.splice(i, 1);
	  	}
	}

	/*db.Persons.remove({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});*/
});

app.put('/updatePerson', function(req, res){
	console.log("Received updatePerson request");

	for(i=0; i< devloperJson.length; i++){
		if(devloperJson[i].id == req.body.id){
			devloperJson[i] = req.body;
		}
	}
	/*db.Persons.findAndModify({query: {"_id": new mongojs.ObjectId(req.body._id)}, 
										update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}
										}, function(err, docs){
											console.log(docs);
											res.json(docs);
										})*/
	});

//app.use(express.static(__dirname + "/app/views"));
/*app.listen(3000);
console.log("server running on port 3000");
io.listen(server);*/

