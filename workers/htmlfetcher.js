var archive = require('../helpers/archive-helpers');
var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', function() {
  archive.readListOfUrls(function(err, data) {
    if (err) {
      console.log('line 6', err);
    } else {
      archive.downloadUrls(data.slice(0, data.length - 1));
    }   
  });
}, null, true, 'America/Los_Angeles');
job.start();

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
