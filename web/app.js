var PORT = 3333;

var express = require('express')
  , app = express();


app.get('/', function(req, res){
  res.send('Hello World');
});


app.listen(PORT);
console.log('Listening on port ' + PORT);