var tripcode = require('../');
var forEach = require('lodash.foreach');
var size  = require('lodash.size');
var utf8 = require('utf8');
var test = require('tape');

var generateTripList = require('./generate-trip-list');

test('\nbasic characters', function(t) {
  generateTripList(function(error, tripcodes) {
    if (error) throw error;

    t.plan(size(tripcodes));

    forEach(tripcodes, function(trip) {
      t.equal(tripcode(trip[0]), trip[1]);
    });

    t.end();
  });
});

test('\ncharacters that are escaped', function(t) {
  var ESCAPE_TEST = [
    ['&', 'MhCJJ7GVT.'],
    ['<', 'D1YGKrvmeg'],
    ['>', 'afqVxck0Ts'],
    ['"', 'gt1azVccY2'],
    // ['\'', '8/08awL.AE'],
    ['&<>"\'', 'CgqvGaJbDQ']
  ];

  t.plan(ESCAPE_TEST.length);

  forEach(ESCAPE_TEST, function(trip) {
    t.equal(tripcode(trip[0]), trip[1]);
  });
});

// 4chan strips utf8
test('\nutf8 symbols', function(t) {
  t.plan(1);
  t.equal(tripcode('©'), '');
});

test('\ncollisions, oh my!', function(t) {
  t.plan(1);

  // U+8A1B CJK UNIFIED IDEOGRAPH-8A1B
  // http://codepoints.net/U+8A1B
  //
  // !c8eDXvwFLQ
  t.equal(tripcode('fa'), tripcode(utf8.decode('\xE8\xA8\x9B')));
});