/*!
 * helper-resolve <https://github.com/jonschlinkert/helper-resolve>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var clone = require('clone-deep');
var relative = require('relative');
var chalk = require('chalk');

/**
 * Asynchronously get the resolved path to "main" file for
 * the given module.
 *
 * ```js
 * resolve('micromatch', function(err, fp) {
 *   //=> 'node_modules/micromatch/index.js'
 * });
 * ```
 *
 * @param  {String} `name` The name of the module to resolve.
 * @param  {Function} `next` Callback function
 * @return {String} File path to the module
 */

function resolve(name, next) {
  try {
    return next(null, resolveSync(name));
  } catch(err) {
    next(err);
    return;
  }
}

/**
 * Synchronously get the resolved path to "main" file for
 * the given module.
 *
 * ```js
 * var fp = resolve.sync('micromatch');
 * //=> 'node_modules/micromatch/index.js'
 * ```
 *
 * @param  {String} `name` The name of the module to resolve.
 * @param  {Function} `next` Callback function
 * @return {String} File path to the module
 */

function resolveSync(name) {
  var base = path.resolve(process.cwd(), 'node_modules', name);
  var pkg = tryResolve(path.join(base, 'package.json'));

  var res = clone(pkg);
  res.main = relative(path.join(base, pkg && pkg.main));
  return res;
}

/**
 * Try to require a file, fail silently if unsuccesful
 *
 * @param  {String} `fp`
 * @return {String} Resolved filepath
 */

function tryResolve(fp) {
  if (typeof fp === 'undefined') {
    throw new Error('helpers-resolve: tryResolve() requires a string.');
  }
  try {
    return require(path.resolve(fp));
  } catch(err) {
    console.error(chalk.red('helper-resolve cannot find'), chalk.bold(fp), err);
  }
  return {};
};

/**
 * Expose `resolve` helper
 */

module.exports = resolve;

/**
 * Expose `resolve.sync` helper
 */

module.exports.sync = resolveSync;
