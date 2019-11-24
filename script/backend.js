//dependencies
var express = require('express'); 
var mysql = require('mysql');
var faker = require('faker');
var bodyParser = require("body-parser");

var app = express(); //assign express

app.set('view engine','ejs'); //use embedded JS technology, by defailt look for the view folder
app.use(bodyParser.urlencoded({extended: true})); //parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request
app.use(express.static(__dirname + "/css")); //tell express to take whatever file is in the css directory

var connection = mysql.createConnection({ //setup mysql db connection
  host     : 'localhost',
  user     : 'root',     // the mySQL root username
  database : 'join_us'   // the name of the db
});

app.get("/", function(req, res) //home route
{
	let q = "SELECT COUNT(*) AS count FROM users"; //mySQL query - find the total count of users in the DB
	connection.query(q, function (error, results) //connect to the DB
	{
		if (error) throw error; //error handling
		var count = results[0].count; //query result and using the alias 'count' as the property
		//res.send('We have ' + count + ' users in the DB'); //response
		res.render('home', {data: count}); //render the ejs file using the count obj & assign it to data var
	});
});

app.post("/register", function(req, res) //register route (post request cant be hardcoded in the URL unlike GET)
{ 
	let q = 'INSERT INTO users SET ?'; //dynamic insert query

	var person = {
		email : req.body.email //store the email from the html form
	};
	
	connection.query(q, person, function (error, results) //connect to the DB
	{
		if (error) throw error; //error handling
		res.redirect("/"); //redirect to home page
		console.log('New person joined the group\n');
	});
});

app.listen(3000, function() //port where the server is runninn/waiting for operations to happen
{
	console.log('Server is running on port 3000');	//show this message if the server is running on port 3000
});
