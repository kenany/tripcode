#!/usr/bin/env node

var tripcode = require('../');
var argv = require('optimist').argv;
var concat = require('concat-stream');
var forEach = require('lodash.foreach');

function tripify() {
  forEach(argv._, function(value) {
    process.stdout.write('#' + value + ' => !' + tripcode(value) + '\n');
  });
}

if (argv._.length < 1) {
  var finish = concat(function(data) {
    var lines = data.toString().split('\n');
    lines.forEach(function(line) {
      argv._.push(line);
    });
    tripify();
  });

  var stdin = process.openStdin();
  stdin.pipe(finish);
}
else {
  tripify();
}