var express= require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

var static_path = path.join(__dirname, './');

app.enable('trust proxy');
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));                                


app.route('/').get(function(req, res) {
    res.header('Cache-Control', "max-age=60, must-revalidate, private");
    res.sendFile('index.html', {
        root: static_path
    });
});

app.route(/api\/.*/).post(proxy);
app.route(/api\/.*/).get(proxy);
app.route(/api\/.*/).put(proxy);


function proxy(req, response) {
  request(
    {
      method: req.method,
      url: "https://api.api.ai/v1/" + req.url.replace("/api/", ""), 
      headers: {
        'content-type': 'application/json',
        'authorization': req.headers.authorization
      },
      body: JSON.stringify(req.body),
    },
    function(err, res, body) {
      response.status(res.statusCode).send(body)
    }
  )
}


function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

app.use('/', express.static(static_path, {
    maxage: 31557600
}));

var server = app.listen(process.env.PORT || 5000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
