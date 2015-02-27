/*!
 * helper-resolve <https://github.com/jonschlinkert/helper-resolve>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var relative = require('relative');
var chalk = require('chalk');

/**
 * Expose `resolve` helper
 */

module.exports = function resolve(fp, next) {
  return next(null, resolveSync(fp));
};

/**
 * Expose `resolve.sync` helper
 */

module.exports.sync = resolveSync;

function resolveSync(name) {
  var base = path.resolve(process.cwd(), 'node_modules', name);
  var pkg = tryRequire(path.join(base, 'package.json'));
  var cwd = path.join(base, pkg.main);

  var res = {};
  res.pkg = pkg;
  res.cwd = relative(cwd);
  res.dest = pkg.homepage;
  return res;
}

/**
 * Try to require a file, fail silently
 */

function tryRequire(fp) {
  if (typeof fp === 'undefined') {
    throw new Error('helpers-resolve: tryRequire() requires a string.');
  }
  try {
    return require(path.resolve(fp));
  } catch(err) {
    console.error(chalk.red('helper-resolve cannot find'), chalk.bold(fp), err);
  }
  return {};
};
