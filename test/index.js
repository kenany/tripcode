var tripcode = require('../');
var forEach = require('lodash.foreach');
var size  = require('lodash.size');
var utf8 = require('utf8');
var test = require('tape');

var generateTripList = require('./generate-trip-list');

test('basic characters', function(t) {
  generateTripList(function(error, tripcodes) {
    if (error) throw error;

    t.plan(size(tripcodes));

    forEach(tripcodes, function(trip) {
      t.equal(tripcode(trip[0]), trip[1]);
    });

    t.end();
  });
});

test('characters that are escaped', function(t) {
  t.plan(1);
  t.equal(tripcode('&<>"\''), 'CgqvGaJbDQ');
});

// 4chan strips utf8
test('utf8 symbols', function(t) {
  t.plan(1);
  t.equal(tripcode('©'), '');
});

test('collisions, oh my!', function(t) {
  t.plan(1);

  // U+8A1B CJK UNIFIED IDEOGRAPH-8A1B
  // http://codepoints.net/U+8A1B
  //
  // !c8eDXvwFLQ
  t.equal(tripcode('fa'), tripcode(utf8.decode('\xE8\xA8\x9B')));
});