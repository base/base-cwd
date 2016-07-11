/*!
 * base-cwd <https://github.com/jonschlinkert/base-cwd>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var empty = require('empty-dir');
var isValid = require('is-valid-app');
var find = require('find-pkg');
var cached;

module.exports = function(types, options) {
  if (typeof types !== 'string' && !Array.isArray(types)) {
    options = types;
    types = undefined;
  }

  options = options || {};

  return function plugin(app) {
    if (!isValid(app, 'base-cwd', types)) return;

    Object.defineProperty(this, 'cwd', {
      configurable: true,
      enumerable: true,
      set: function(cwd) {
        cached = path.resolve(cwd);
        this.cache.cwd = cached;
        app.emit('cwd', cached);
      },
      get: function() {
        if (typeof cached === 'string') {
          return path.resolve(cached);
        }
        if (typeof this.options.cwd === 'string') {
          return path.resolve(this.options.cwd);
        }

        var cwd = process.cwd();
        if (options.findup === false) {
          cached = cwd;
          return cwd;
        }

        var isEmpty = empty.sync(cwd, function(fp) {
          return !/\.DS_Store/.test(fp);
        });

        if (isEmpty) {
          cached = cwd;
          return cwd;
        }

        var pkgPath = find.sync(cwd);
        if (pkgPath) {
          var dir = path.dirname(pkgPath);
          if (dir !== cwd) {
            cached = dir;
            app.emit('cwd', dir);
          }
          return dir;
        }
        return cwd;
      }
    });

    return plugin;
  }
};
