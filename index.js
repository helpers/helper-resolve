/*!
 * helper-resolve <https://github.com/jonschlinkert/helper-resolve>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const path = require('path');
const clone = require('clone-deep');
const relative = require('relative');
const red = require('ansi-red');
const bold = require('ansi-bold');

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
    next(null, resolveSync(name));
  } catch (err) {
    next(err);
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
  const base = path.resolve(process.cwd(), 'node_modules', name);
  const pkg = tryResolve(path.join(base, 'package.json'));

  const res = clone(pkg);
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
  } catch (err) {
    console.error(red('helper-resolve cannot find'), bold(fp), err);
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
