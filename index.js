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
    if (!isValidInstance(this, fn)) return;

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

function isValidInstance(app, fn) {
  fn = fn || app.options.validatePlugin;
  if (typeof fn === 'function' && !fn(app)) {
    return false;
  }
  if (app.isRegistered('base-cwd')) {
    return false;
  }
  if (app.isCollection || app.isView) {
    return false;
  }
  return true;
}
