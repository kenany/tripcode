var tripcode = require('../');
var test = require('tape');

test('basic characters', function(t) {
  t.plan(5);
  t.equal(tripcode('z$}yh}k@'), 'qJ2J/izs/Q');
  t.equal(tripcode('R}:gbrCg'), '/izs/F2ZEQ');
  t.equal(tripcode(',JFKr~CD'), 'ZZ3q/izs/s');
  t.equal(tripcode('f}EAmbA%'), '/izs/14Iuw');
  t.equal(tripcode('UU_,TW_+'), '.uIf/izs/E');
});

test('utf8 symbols', function(t) {
  t.plan(1);
  t.equal(tripcode('©'), 'AXcG6m9g5c');
});