/*!
 * base-cwd <https://github.com/jonschlinkert/base-cwd>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');

module.exports = function(fn) {
  return function plugin() {
    fn = fn || this.options.validatePlugin;
    if (typeof fn === 'function' && !fn(this)) return;
    if (this.isRegistered('base-cwd')) return;

    Object.defineProperty(this, 'cwd', {
      configurable: true,
      enumerable: true,
      set: function(cwd) {
        this.cache.cwd = path.resolve(cwd);
      },
      get: function() {
        if (typeof this.cache.cwd === 'string') {
          return path.resolve(this.cache.cwd);
        }
        if (typeof this.options.cwd === 'string') {
          return path.resolve(this.options.cwd);
        }
        return process.cwd();
      }
    });

    return plugin;
  }
};
