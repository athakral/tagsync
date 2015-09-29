'use strict';

var Primus = require('primus')
, express = require('express')
, http = require('http')
, app = express()
, fs = require('fs');

var server = http.createServer(app);

var primus =new Primus(server, {transformer: 'websockets',parser: 'JSON'});

primus.on('connection', function(spark) {
    spark.write('Client Connected');

    var serverHandlers = {};
    serverHandlers.tagAdded = function(addedTag){
      //console.log('New Tag Raised');
      primus.forEach(function (spark, id, connections) {
        spark.write({msgType:'newTag',addedTag:addedTag});
      });

      //spark.write()
    };

    spark.on('data',function (data){
      //console.log(data);
      serverHandlers[data.msgType](data.param);
    });
});

primus.save(__dirname +'/client/saved_primus.js');
primus.save(__dirname +'/../desktop/app/vendor/primus.js');


primus.on('disconnection',function (spark) {

});

app.use('/',express.static(__dirname + '/client'));

app.use('/bower_components',express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
  });




server.listen(8080,function(){
    console.log('Server listening on 8080');
});
