'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var cwd = require('./');
var Base = require('base');
var app;

describe('base-cwd', function() {
  beforeEach(function() {
    app = new Base();
  });

  it('should validate the instance', function() {
    app.use(cwd(function(app) {
      return app.isFoo === true;
    }));
    assert(!app.cwd);

    app.isFoo = true;
    app.use(cwd(function(app) {
      return app.isFoo === true;
    }))
    assert(app.cwd);

    app.use(cwd(function(app) {
      return app.isFoo === true;
    }))
    assert(app.cwd);
  });
});

describe('base-cwd', function() {
  beforeEach(function() {
    app = new Base();
    app.use(cwd());
  });

  it('should export a function', function() {
    assert.equal(typeof cwd, 'function');
  });

  it('should add a `cwd` property to app', function() {
    assert.equal(typeof app.cwd, 'string');
  });

  it('should get the current working directory', function() {
    assert.equal(app.cwd, process.cwd());
  });

  it('should use the cwd defined on options', function() {
    app.options.cwd = 'foo/bar';
    assert.equal(app.cwd, path.resolve(process.cwd(), 'foo/bar'));
  });

  it('should set cwd directly', function() {
    app.cwd = 'foo/bar';
    assert.equal(app.cwd, path.resolve(process.cwd(), 'foo/bar'));
  });

  it('should set app.cache.cwd when defined directly', function() {
    app.cwd = 'foo/bar';
    assert.equal(app.cache.cwd, app.cwd);
  });
});
