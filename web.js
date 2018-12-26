var express = require('express');
var app = express();
var router = express.Router();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/*', function(req, res) {
  res.render('index');
});

app.use(router);
var server = app.listen(3000);
console.log('Web Server started on port 3000');
