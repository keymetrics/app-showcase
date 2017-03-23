
var express = require('express')
var app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var restify = require('express-restify-mongoose')
var router = express.Router()
var pmx = require('pmx');
var random = require('random-name');
var request = require('request');

var Probe = pmx.probe()

var MAINTENANCE_MODE = false;
mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.json())

app.use(function(req, res, next) {
  if (MAINTENANCE_MODE == true)
    return res.send({data: 'Maintenance'});
  next();
});

global.Customer = mongoose.model('Customer', new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
}));

restify.serve(router, global.Customer)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use(router);

app.listen(9999, function () {
  console.log('Example app listening on port 9999!')
})


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Probe.metric({
  name : 'Realtime Users',
  value : function() {
    console.log(getRandomArbitrary(5, 8));
    return getRandomArbitrary(5, 8);
  }
});

Probe.metric({
  name : 'Cached data',
  value : function() {
    return 30;
  }
});

var user_probe = Probe.metric({
  name : 'Tot. Users'
});

pmx.action('maintenance', {comment : 'Increment downloads'}, function(reply) {
  // Decrement the previous counter
  MAINTENANCE_MODE = !MAINTENANCE_MODE;
  reply({maintenance_mode : MAINTENANCE_MODE});
});

setInterval(function() {
  var name = random.first();

  pmx.emit('user:register', {
    user : name,
    email : name + '@gmail.com'
  });
  console.log('New user %s registered', name);
}, getRandomArbitrary(30, 320) * 1000);


require('./requester.js')();
