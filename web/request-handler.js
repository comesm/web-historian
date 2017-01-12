var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var pathURL = req.url === '/' ? archive.paths.siteAssets + '/index.html' : archive.paths.archivedSites + req.url.trim();
  if (req.method === 'GET') {    
    fs.readFile(pathURL, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end();
      } else {
        res.end(data);
      }
    });
  } else if (req.method === 'POST') {
    res.statusCode = 302;
    var body = ''; 
    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function() {
      siteURL = body.split('=')[1] + '\n';
      fs.appendFile(archive.paths.list, siteURL, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end();
        } else {
          var pathURL = archive.paths.siteAssets + '/loading.html'; 
          fs.readFile(pathURL, 'utf8', (err, data) => {
            if (err) {
              res.statusCode = 404;
              res.end();
            } else {
              res.end(data);
            }
          });
        }
      });
    });
  } else {
    res.end();
  }
};
