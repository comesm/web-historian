var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  
  fs.readFile(exports.paths.list, 'utf8', (err, data) => { 
    if (err) {
      console.log(err);
    } else {
      var data = data.split("\n");
     
      callback(err, data);
    }
      //return body.split('\n');
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if(err) {
      console.log(err);
    }
    var data = data.split("\n");
    if(data.indexOf(url) > -1) {
      callback(err, true);
    } else {
      callback(err, false);
    } 
  });

};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(exports.paths.list, url, (err) => {
    if(err) {
      console.log(err);
    } else {
      callback(err);
    }
  });

};

exports.isUrlArchived = function(url, callback) {
  fs.stat(url, (err, stats) => {
    if(err) {
      console.log(err);
      //callback(err);
    }
    else {
      if(stats.path === url) {
        console.log('76');
        callback(err, true);
      } else {
      callback(err, false);
      //if(stats )
      //callback(err, url);
      }
    }
  });

};

exports.downloadUrls = function() {
};
