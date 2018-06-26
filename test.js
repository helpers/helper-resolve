/*!
 * helper-resolve <https://github.com/jonschlinkert/helper-resolve>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha jquery */
const assert = require('assert');
const handlebars = require('handlebars');
const resolve = require('./');

describe('resolve helper', function() {
  it('should work as a handlebars helper:', function() {
    const str = '{{resolve "jquery"}}';
    handlebars.registerHelper('resolve', function(fp, key) {
      return resolve.sync(fp)[typeof key === 'string' ? key : 'main'];
    });
    assert.equal(handlebars.compile(str)(), 'node_modules/jquery/dist/jquery.js');
  });
});
