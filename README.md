# tripcode demo

A demo.

``` bash
$ npm install tripcode
& browserify -r tripcode --standalone tripcode > bundle.js
$ uglifyjs -b beautify=false,max-line-len=500,ascii-only bundle.js > bundle.min.js
```