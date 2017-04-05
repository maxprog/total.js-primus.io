require('total.js')

var Primus = require('primus.io');

F.on("load", function() {
this.primus = new Primus(this.server);

var room = "chat-1";

this.primus.on('connection', function (spark) {
  spark.on('join', function (_room) {

      if(_room!=='chat-1') { 
          console.log('Invalid room '+_room);
          return; 
        }

       console.log('User joined to room: '+room);
       spark.join(room, function () {
       spark.send(room, 'Welcome on chat based on primus.io. You joined room ' + room);
       spark.room(room).except(spark.id).send(room, 'New user joined room ' + room);
       
    });
  });

  spark.on('message', function (message) {
       
        console.log('message: '+message);
        spark.room(room).except(spark.id).send(room,message);
  });

  spark.on('leave', function (room) {
       spark.leave(room, function () {
       spark.send(room, 'you left room ' + room);
    });
  });
});
});

F.http('debug');
