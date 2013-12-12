'use strict';

// HAProxy can handle ~1800 active clients

// Choose a transport
function transformer() {
  // return 'websockets';
  // return 'browserchannel';
  // return 'engine.io';
  return 'sockjs';
}

// Connect directly to the server or through HAProxy
function serverAddress() {
  // return directServerAddress();
  return proxyServerAddress();
}


var _ = require('underscore')
  , http = require('http')
  , server = http.createServer()
  , Primus = require('primus')
  , primus = new Primus(server, {transformer: transformer()})
  , msgCounter = new Counter('msg', 10000)
  , reconnectCounter = new Counter('reconnect', 10000);


_.times(200, function() { 
  new Worker();
})


function Worker() {
  var socket = primus.Socket.connect(serverAddress());

  socket.on('reconnect', reconnectCounter.increment);

  socket.on('data', msgCounter.increment);

  setInterval(function() {
    socket.write('news');
  }, randomFromInterval(5500, 6500));
}

function proxyServerAddress() {
  return 'http://10.10.10.10';
}

function directServerAddress() {
  // return 'http://10.10.10.' + randomFromInterval(11, 12) + ':3333';
}

function randomFromInterval(from, to){
  return Math.floor(Math.random()*(to-from+1)+from)
}

function Counter(name, interval) {
  var count, time;

  function reset() {
    count = 0;
    time = new Date().getTime();
  }

  function log() {
    var elapsed = new Date().getTime() - time;
    console.log(name + ' rate:', 1000 * count / elapsed);
    reset();
  }

  reset();
  setInterval(log, interval);

  return {
    increment: function() {
      count++;
    }
  }
}

