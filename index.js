var he = require('he');
var crypt = require('./lib/crypt');
var sjisconv = require('./lib/sjisconv');

var SALT_TABLE = '.............................................../0123456789A' +
  'BCDEFGABCDEFGHIJKLMNOPQRSTUVWXYZabcdefabcdefghijklmnopqrstuvwxyz..........' +
  '..........................................................................' +
  '.................................................';

function sjis(str) {
  var encoded = '';
  for (var i = 0; i < str.length; i++){
    var character = sjisconv[String.fromCharCode(str.charCodeAt(i))];
    if (character) encoded += character;
   }
   return encoded;
}

module.exports = function(key) {
  key = sjis(key);
  key = he.escape(key);
  if (!key.length) return '';

  var salt = '';
  for (var i = 1; i < 3; i++) {
    salt += SALT_TABLE[(key + 'H.').charCodeAt(i) % 256];
  }

  return crypt(key, salt).substring(3);
};