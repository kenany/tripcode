# tripcode

[![Build Status](https://travis-ci.org/KenanY/tripcode.png?branch=master)](https://travis-ci.org/KenanY/tripcode)

JavaScript implementation of 4chan's tripcode algorithm.

## Example

``` javascript
var tripcode = require('tripcode');

tripcode('f}EAmbA%');
// => '/izs/14Iuw'
```

## Installation

``` bash
$ npm install tripcode
```

## API

``` javascript
var tripcode = require('tripcode');
```

### tripcode(password)

Returns the tripcode generated from _String_ `password`.