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

// Something is being piped in.
if (!process.stdin.isTTY) {
  var finish = concat(function(data) {
    var lines = data.toString().split('\n');
    lines.forEach(function(line) {
      argv._.push(line);
    });
    tripify();
  });

  // The stdin stream is paused by default.
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.pipe(finish);
}

// Password(s) passed as argument(s).
else {
  tripify();
}