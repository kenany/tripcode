var tripcode = require('../');
var forOwn  = require('lodash.forown');
var utf8 = require('utf8');
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

test('collisions, oh my!', function(t) {
  t.plan(1);
  t.equal(tripcode('fa'), tripcode(utf8.decode('\xE8\xA8\x9B')));
});