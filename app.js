
var express = require('express')
var app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var restify = require('express-restify-mongoose')
var router = express.Router()

mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.json())

restify.serve(router, mongoose.model('Customer', new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
})))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use(router);

app.listen(9999, function () {
  console.log('Example app listening on port 9999!')
})

require('./requester.js')();
