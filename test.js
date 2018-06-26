/*!
 * helper-resolve <https://github.com/jonschlinkert/helper-resolve>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha jquery */
require('should');
var handlebars = require('handlebars');
var resolve = require('./');
var template;

describe('resolve helper', function () {
  it('should work as a handlebars helper:', function () {
    var str = '{{resolve "jquery"}}';
    handlebars.registerHelper('resolve', function (fp, key) {
      return resolve.sync(fp)[typeof key === 'string' ? key : 'main'];
    });
    handlebars.compile(str)().should.equal('node_modules/jquery/dist/jquery.js');
  });
});
