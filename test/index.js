var tripcode = require('../');
var forOwn  = require('lodash.forown');
var test = require('tape');

var tripcodes = require('./tripcodes.json');

test('basic characters', function(t) {
  forOwn(tripcodes, function(value, key) {
    t.equal(tripcode(key), value);
  });
  t.end();
});

test('characters that are escaped', function(t) {
  t.plan(1);
  t.equal(tripcode('&<>"\''), 'CgqvGaJbDQ');
});

// 4chan actually strips symbols like these.
test('utf8 symbols', function(t) {
  t.plan(1);
  t.equal(tripcode('©'), 'AXcG6m9g5c');
});