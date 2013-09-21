var concat = require('concat-stream');
var fs = require('graceful-fs');
var hyperquest = require('hyperquest');

var write = concat(function(data) {
  var result = {};
  var lines = data.toString().split('\n');
  forEach(function(lines) {
    var pair = lines.split('!');
    result[pair[0]] = pair[1];
  });
  fs.writeFileSync('./test/tripcodes.json', JSON.stringify(result));
});

hyperquest('http://www.pageoftext.com/PH_plain&nm_page=secure_tripcode_dictionary').pipe(write);