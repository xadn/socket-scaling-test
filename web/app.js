'use strict';

// Choose a transport
function transformer() {
  // return 'websockets';
  // return 'browserchannel';
  // return 'engine.io';
  return 'sockjs';
}


var express = require('express')
  , Primus = require('primus')
  , http = require('http')
  , app = express()
  , server = http.createServer(app);

  server.listen(3333);
  
  // Primus server
  var primus = new Primus(server, {transformer: transformer()});
  
  primus.on('connection', function(spark) {
    console.log('connection', spark.id);

    spark.on('data', function(data) {
      spark.write('news', 'hello world');
    });
  });


  // Express server
  app.set('views', __dirname + '/views')
     .set('view engine', 'jade')

  app.get('/', function(req, res) {
    res.render('index', {title: 'Demo', ipAddress: ipAddress()})
  })

  function ipAddress() {
    return require('os').networkInterfaces().eth1[0].address
  }
