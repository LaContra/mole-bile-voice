var express= require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var archiver = require('archiver');

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
app.route(/api\/.*/).delete(proxy);
app.route(/project\/.*/).post(createAndroidProject);


function createAndroidProject(req, res) {
  console.log(req.body.clientKey)

  var inFilePath = path.join(static_path, 'data/Config.java')
  var outFilePath = path.join(static_path, 'data/api-ai-android-sdk-master-uber/apiAISampleApp/src/main/java/ai/api/sample/Config.java')
  
  var timestamp = Math.floor(Date.now());
  var outputZip = fs.createWriteStream(path.join(static_path, 'data/zip/android-project-'+timestamp+'.zip'));

  // Read config file from server
  fs.readFile(inFilePath, {encoding: 'utf-8'}, function(err, data){
    if (!err){   
      if ( req.body.clientKey != '') {
        data = data.replace("CLIENT_KEY", req.body.clientKey)
      }

      // Write file to the project
      fs.writeFile(outFilePath, data, function(err) {
        if (!err) {
          res.attachment('android-project.zip');
    
          // Zip and send android project
          var archive = archiver.create('zip', {});

          archive.on('error', function (err) {
            res.status(500).send({error: err.message});
          })
          archive.on('end', function() {
            console.log('Archive wrote %d bytes', archive.pointer());
          });

          // archive.pipe(res);
          archive.pipe(outputZip);

          archive.bulk([{ 
            expand: true, cwd: './data/api-ai-android-sdk-master-uber/', 
            src: ['**/*'] 
          }]).finalize();

          res.json({'filename': 'android-project-'+timestamp+'.zip'})
        }
        else {
          console.log('Error creating config.java');
        }
      });
    }
    else {
      console.log(err);
    }
  });
}

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
