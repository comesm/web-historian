var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var pathURL = req.url === '/' ? archive.paths.siteAssets + '/index.html' : archive.paths.archivedSites + req.url.trim();
  console.log('line 9', pathURL);
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
    console.log('post listen');
    res.end();
  } else {
    res.end();
  }

};

// var getURL = req.url
// getURL = [localhost]/website
