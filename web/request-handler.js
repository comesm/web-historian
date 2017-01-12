var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') { 
    var pathURL = archive.paths.siteAssets + '/index.html';
    helpers.serveAssets(res, pathURL, function() {});
  } else if (req.method === 'POST') {
    res.statusCode = 302;
    var body = ''; 
    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function() {
      var loadingURL = archive.paths.siteAssets + '/loading.html';
      archive.isUrlArchived(body.split('=')[1], function (err, exists) {
        if (!err) {
          if (exists === true) { 
            var archivedSiteURL = archive.paths.archivedSites + '/' + body.split('=')[1]; 
            helpers.serveAssets(res, archivedSiteURL, function() {});
          } else {
            archive.isUrlInList(body.split('=')[1], function(err, data) {
              if (err) {
                console.log(err);
              } else if (data === true) {
                helpers.serveAssets(res, loadingURL, function() {});
              } else {
                siteURL = body.split('=')[1] + '\n';
                archive.addUrlToList(siteURL, function(err) {
                  if (err) {
                    console.log(err);
                  }  
                });
                helpers.serveAssets(res, loadingURL, function() {});
              }
            }); 
          } 
        } else { 
          done(err); 
        }
      });
    });
  } else { // for options method
    res.end();
  }
};
