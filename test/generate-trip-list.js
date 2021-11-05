const concat = require('concat-stream');
const fs = require('graceful-fs');
const forEach = require('lodash.foreach');
const path = require('path');

module.exports = function(callback) {
  const write = concat(function(data) {
    const trips = [];

    const lines = data.toString().split('\n');
    forEach(lines, function(line) {
      const pair = line.split('!');
      if (pair[3]) {
        trips.push([pair[0], pair[1]]);
      }
    });

    callback(null, trips);
  });
  const quest = fs.createReadStream(
    path.resolve(__dirname, './fixtures/tripcodes.txt')
  );
  quest.pipe(write);
};
