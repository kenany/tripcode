var tripcode = require('../');
var forEach = require('lodash.foreach');
var size  = require('lodash.size');
var utf8 = require('utf8');
var test = require('tape');

var generateTripList = require('./generate-trip-list');

test('huge list of tripcodes', function(t) {
  generateTripList(function(error, tripcodes) {
    if (error) throw error;

    t.plan(size(tripcodes));

    forEach(tripcodes, function(trip) {
      t.equal(tripcode(trip[0]), trip[1]);
    });

    t.end();
  });
});

test('anything not alphanumeric', function(t) {
  var SYMBOLS = [
    ['!', 'KNs1o0VDv6'],
    ['@', 'z0MWdctOjE'],
    ['$', 'yflOPYrGcY'],
    ['%', '1t98deumW.'],
    ['^', 'gBeeWo4hQg'],

    ['&', 'MhCJJ7GVT.'],
    ['*', 'o8gKYE6H8A'],
    ['(', 'SGn2Wwr9CY'],
    [')', 'E9k1wjKgHI'],
    ['-', 'tHbGiobWdM'],

    ['_', 'm3eoQIlU/U'],
    ['=', 'wmxP/NHJxA'],
    ['+', 'IHLbs/YhoA'],

    ['<', 'D1YGKrvmeg'],
    ['>', 'afqVxck0Ts'],
    ['"', 'gt1azVccY2'],
    ['\'', '8/08awL.AE'],
    ['&<>"\'', 'CgqvGaJbDQ'],
    [' ', 'wqLZLRuzPQ']
  ];

  t.plan(SYMBOLS.length);

  forEach(SYMBOLS, function(trip) {
    t.equal(tripcode(trip[0]), trip[1]);
  });
});

test('symbols that are ignored', function(t) {
  var SYMBOLS = [
    '©'
  ];

  t.plan(SYMBOLS.length);

  forEach(SYMBOLS, function(trip) {
    t.equal(tripcode(trip), '');
  });
});

test('collisions', function(t) {
  t.plan(1);

  // U+8A1B CJK UNIFIED IDEOGRAPH-8A1B
  // http://codepoints.net/U+8A1B
  //
  // !c8eDXvwFLQ
  t.equal(tripcode('fa'), tripcode(utf8.decode('\xE8\xA8\x9B')));
});