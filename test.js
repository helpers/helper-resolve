/*!
 * helper-resolve <https://github.com/jonschlinkert/helper-resolve>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
require('should');
var handlebars = require('handlebars');
var Template = require('template');
var template = new Template();
var resolve = require('./');

var expected = 'node_modules/jquery/index.js';

describe('resolve helper', function () {
  it('should work as a Template helper (works with any engine):', function () {
    var str = '<script src="<%= resolve("jquery") %>"></script>';
    template.helper('resolve', resolve);

    template.render(str, function (err, content) {
      if (err) console.log(err);
      content.should.equal('<script src="node_modules/jquery/dist/jquery.js"></script>');
    });
  });

  it('should work as a handlebars helper:', function () {
    var str = '{{resolve "jquery" cwd="test"}}';
    handlebars.registerHelper('resolve', resolve);
    handlebars.compile(str)().should.equal('node_modules/jquery/dist/jquery.js');
  });
});
