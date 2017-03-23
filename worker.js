

var pmx = require('pmx');

var Probe = pmx.probe()

var queue = 13;

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function getRandomQueue(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push({
      date : randomDate(new Date(2017, 0, 1), new Date()),
      name : 'collision',
      p1 : getRandomArbitrary(10, 60),
      p2 : getRandomArbitrary(60, 120)
    });
  }
  return arr;
};

Probe.metric({
  name : 'Queue',
  value : function() {
    return queue;
  }
});

var act_sec = 0;

setInterval(function() {
  console.log('[Worker] New action processed');
  act_sec = getRandomArbitrary(1, 5);
}, 5000);

Probe.metric({
  name : 'Actions/sec',
  value : function() {
    return act_sec;
  }
});

pmx.action('Flush Queue', function(reply) {
  queue = 0;
  reply({msg : 'Queue Successfully Flushed'});
});

pmx.action('Check Queue', function(reply) {
  var rd = getRandomQueue(queue);
  reply(rd);
});

setInterval(function() {
  queue++;
}, 4000);

setInterval(function() {
  queue--;
}, 5000);

setInterval(function() {
  queue = 0;
}, 60 * 1000 * 60);
