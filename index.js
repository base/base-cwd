/*!
 * base-cwd <https://github.com/jonschlinkert/base-cwd>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var isValid = require('is-valid-app');
var find = require('find-pkg');

module.exports = function(types) {
  return function plugin(app) {
    if (!isValid(app, 'base-cwd', types)) return;
    var cached;

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
        var pkgPath = find.sync(process.cwd());
        if (pkgPath) {
          var dir = path.dirname(pkgPath);
          if (dir !== process.cwd()) {
            cached = dir;
            app.emit('cwd', dir);
          }
          return dir;
        }
        return process.cwd();
      }
    });

    return plugin;
  }
};
