# helper-resolve [![NPM version](https://img.shields.io/npm/v/helper-resolve.svg?style=flat)](https://www.npmjs.com/package/helper-resolve) [![NPM monthly downloads](https://img.shields.io/npm/dm/helper-resolve.svg?style=flat)](https://npmjs.org/package/helper-resolve)  [![NPM total downloads](https://img.shields.io/npm/dt/helper-resolve.svg?style=flat)](https://npmjs.org/package/helper-resolve) [![Linux Build Status](https://img.shields.io/travis/helpers/helper-resolve.svg?style=flat&label=Travis)](https://travis-ci.org/helpers/helper-resolve) [![Windows Build Status](https://img.shields.io/appveyor/ci/helpers/helper-resolve.svg?style=flat&label=AppVeyor)](https://ci.appveyor.com/project/helpers/helper-resolve)

> Templates helper to resolve the path to a file in node_modules. This is mostly useful during development.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save helper-resolve
```

## Usage

```js
const resolve = require('helper-resolve');
const Handlebars = require('handlebars');

handlebars.registerHelper('resolve', function (name, key) {
  return resolve.sync(fp)[typeof key === 'string' ? key : 'main'];
});
handlebars.compile('<script src=\"{{resolve "jquery" "main"}}\"></script>')();
//=> '<script src="node_modules/jquery/dist/jquery.js"></script>'

handlebars.compile('{{resolve "jquery" "homepage"}}')();
//=> 'http://jquery.com'
```

## Assemble example

Register the helper with [assemble](https://github.com/assemble/assemble) v0.6.x to use with any template engine:

```js
const assemble = require('assemble');
assemble.helper('resolve', function (name, key) {
  return resolve.sync(fp)[typeof key === 'string' ? key : 'main'];
});
```

**async helper**

```js
assemble.asyncHelper('resolve', function (name, key, cb) {
  if (typeof key === 'function') {
    cb = key;
    key = 'main';
  }

  resolve(name, function (err, res) {
    cb(null, res[key]);
  });
});
```

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2018, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.7.0, on June 26, 2018._