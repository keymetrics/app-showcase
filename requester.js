
var request = require('request');

module.exports = function() {
  var customers;

  setInterval(() => {
    global.Customer.remove({}, () => {
      console.log('ALl customers removed');
    });
  }, 1000 * 60 * 60);

  setInterval(function() {
    request.get('http://localhost:9999/api/v1/Customer/count', (err, req, body) => {
      console.log(body);
    });
  }, 1000);

  setInterval(function() {
    request.get('http://localhost:9999/api/v1/Customer', (err, req, body) => {
      customers = JSON.parse(body);
    });
  }, 1000);

  setInterval(function() {
    if (!customers) return false;
    var cust = customers[Math.floor(Math.random()*customers.length)];

    if (!cust) return;
    request.get('http://localhost:9999/api/v1/Customer/' + cust._id, (err, req, body) => {
      console.log(body);
    });
  }, 2000);

  setInterval(function() {
    var cust = customers[Math.floor(Math.random()*customers.length)];

    request.delete('http://localhost:9999/api/v1/Customer/' + cust._id, (err, req, body) => {
      console.log(body);
    });
  }, 15000);


  setInterval(function() {
    request.post({
      url : 'http://localhost:9999/api/v1/Customer',
      json : {
        name : Math.random().toString(36).substring(7),
        comment : 'xxxx'
      }
    }, (err, res, body) => {
      //console.log(err, res);
    });
  }, 8000);
};


// GET http://localhost/api/v1/Customer/count
// GET http://localhost/api/v1/Customer
// POST http://localhost/api/v1/Customer
// DELETE http://localhost/api/v1/Customer
// GET http://localhost/api/v1/Customer/:id
// GET http://localhost/api/v1/Customer/:id/shallow
// PUT http://localhost/api/v1/Customer/:id
// POST http://localhost/api/v1/Customer/:id
// PATCH http://localhost/api/v1/Customer/:id
// DELETE http://localhost/api/v1/Customer/:id
