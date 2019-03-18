const express = require('express');
const bodyParser= require('body-parser');
const mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Database Connection attribute
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'pj_escalon'
});


//Start the server on port number 3000
app.listen(4000, function() {
  console.log('listening on 4000')
})

app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('index');
});

app.get('/quotelisting', function (request, response) {
    var quotes=[];
    connection.query('SELECT * FROM `quotes`',function(error, results, fields){
         if (results.length > 0) {
           for(var i=0;i<results.length;i++){
            quotes.push(results[i]);
            //console.log(results.id);
          }

         }
         response.render('quotelisting',{'quotes':quotes});
    });


});
app.post('/quotes', function (request, response){
      var name =  request.body.name;
      var quote=request.body.quote;
      if (name && quote) {
          var is_inserted=connection.query("insert into quotes set  name='"+name+"' ,quote='"+quote+"'");
          //console.log(is_inserted);
          if(is_inserted){
               response.send("Thank you we have successfully recieve your request");
          }

      }
});

app.post('/login', function (request, response){
      var uname =  request.body.username;
      var pwd=request.body.password;
      if (uname==="kumar" && pwd==="1234") {
          response.redirect("quotelisting");

      }else{
				  response.send("Invalid Login");
			}
});
