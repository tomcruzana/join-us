//dependencies
var mysql = require('mysql');
var faker = require('faker');

var connection = mysql.createConnection({ //setup mysql db connection
  host     : 'localhost',
  user     : 'root',     // the mySQL root username
  database : 'join_us'   // the name of the db
});

//bulk insertion of users using faker
var data = [];
for (var i = 0; i < 500; i++) 
{
	data.push([ //stack emails and timestamps
		faker.internet.email(),
		faker.date.past()
	]);
}

var query = 'INSERT INTO users (email, created_at) VALUES ?' //dynamic insertion

connection.query(query, [data], function (error, results) 
{
	if (error) throw error; //error handling
	console.log(results);
});

connection.end(); //terminate db connection