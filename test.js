/*!
 * helper-resolve <https://github.com/jonschlinkert/helper-resolve>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var handlebars = require('handlebars');
var Template = require('template');
var template = new Template();
var resolve = require('./');
require('should');

var expected = 'node_modules/jquery/index.js';

describe('resolve helper', function () {
  it('should work as a Template helper (works with any engine):', function () {
    var str = '<script src="<%= resolve("jquery") %>"></script>';
    template.asyncHelper('resolve', function (fp, cb) {
      resolve(fp, function (err, res) {
        cb(null, res.cwd);
      });
    });

    template.render(str, function (err, content) {
      if (err) console.log(err);
      content.should.equal('<script src="node_modules/jquery/dist/jquery.js"></script>');
    });
  });

  it('should work as a handlebars helper:', function () {
    var str = '{{resolve "jquery" cwd="test"}}';
    handlebars.registerHelper('resolve', function (fp) {
      return resolve.sync(fp).cwd;
    });

    handlebars.compile(str)().should.equal('node_modules/jquery/dist/jquery.js');
  });
});
