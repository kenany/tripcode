var he = require('he');
var utf8 = require('utf8');
var crypt = require('./lib/crypt');

var SALT_TABLE = '.............................................../0123456789A' +
  'BCDEFGABCDEFGHIJKLMNOPQRSTUVWXYZabcdefabcdefghijklmnopqrstuvwxyz..........' +
  '..........................................................................' +
  '.................................................';

module.exports = function(key) {
  key = utf8.encode(key);
  key = he.escape(key);
  if (!key.length) return '';

  var salt = '';
  for (var i = 1; i < 3; i++) {
    salt += SALT_TABLE[(key + 'H.').charCodeAt(i) % 256];
  }

  return crypt(key, salt).substring(3);
};