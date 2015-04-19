/*!
 * helper-resolve <https://github.com/jonschlinkert/helper-resolve>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha jquery */
require('should');
var handlebars = require('handlebars');
var Template = require('template');
var resolve = require('./');
var template;

describe('resolve helper', function () {
  beforeEach(function () {
    template = new Template();
    template.engine('*', require('engine-lodash'));
  });

  it('should work as an async helper with Template:', function () {
    var str = '<script src="<%= resolve("jquery") %>"></script>';

    template.asyncHelper('resolve', function (fp, cb) {
      resolve(fp, function (err, resolved) {
        cb(null, resolved.main);
      });
    });

    template.render(str, function (err, content) {
      if (err) console.log(err);
      content.should.equal('<script src="node_modules/jquery/dist/jquery.js"></script>');
    });
  });

  it('should work as a sync helper with Template:', function () {
    var str = '<script src="<%= resolve("jquery").main %>"></script>';
    template.helper('resolve', resolve.sync);

    template.render(str, function (err, content) {
      if (err) console.log(err);
      content.should.equal('<script src="node_modules/jquery/dist/jquery.js"></script>');
    });
  });

  it('should work as a handlebars helper:', function () {
    var str = '{{resolve "jquery"}}';
    handlebars.registerHelper('resolve', function (fp) {
      return resolve.sync(fp).main;
    });

    handlebars.compile(str)().should.equal('node_modules/jquery/dist/jquery.js');
  });
});
