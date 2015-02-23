/*!
 * helper-resolve <https://github.com/jonschlinkert/helper-resolve>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var resolve = require('resolve');
var _ = require('lodash');

module.exports = function (name, opts, cb) {
  var ctx = {};

  // compatibility with template, verb and assemble.
  if (this && this.app && this.context) {
    ctx = _.merge({}, this.app.cache.data, this.context);
  }

  if (opts && opts.hash && opts.data) {
    opts = _.merge({}, opts, opts.hash);
  }

  opts = _.merge({}, ctx, opts);

  if (typeof cb !== 'function') {
    return path.relative(process.cwd(), resolve.sync(name, opts));
  }

  return resolve(name, opts, cb);
};
