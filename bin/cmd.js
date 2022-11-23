#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const split = require('split');

const tripcode = require('../');

function tripify(value) {
  process.stdout.write('#' + value + ' => !' + tripcode(value) + '\n');
}

// Something is being piped in.
if (!process.stdin.isTTY) {
  // The stdin stream is paused by default.
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.pipe(split()).on('data', tripify);
}

// Password(s) passed as argument(s).
else {
  argv._.forEach(tripify);
}
