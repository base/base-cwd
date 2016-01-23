/*!
 * base-cwd <https://github.com/jonschlinkert/base-cwd>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');

module.exports = function() {
  return function() {
    Object.defineProperty(this, 'cwd', {
      configurable: true,
      enumerable: true,
      set: function(cwd) {
        this.cache.cwd = path.resolve(cwd);
      },
      get: function() {
        return path.resolve(this.cache.cwd || this.options.cwd || process.cwd());
      }
    });
  }
};