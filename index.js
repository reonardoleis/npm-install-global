/*!
 * npm-install-global (https://github.com/jonschlinkert/npm-install-global)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var spawn = require('cross-spawn');

/**
 * Execute `npm --global` with the given command and one or more package names.
 * This is the base for [install]() and [uninstall]().
 *
 * ```js
 * npm('install', 'verb', function(err) {
 *   if (err) throw err;
 * });
 * ```
 * @param {String|Array} `names` One or more package names.
 * @param {Function} `cb` Callback
 * @api public
 */

function npm(cmd, names, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('expected callback to be a function');
  }

  if (typeof names === 'string') {
    names = [names];
  }

  if (!Array.isArray(names)) {
    cb(new TypeError('expected names to be a string or array'));
    return;
  }

  var args = [cmd, '--global'].concat(names);
  spawn('npm', args, {stdio: 'inherit'})
    .on('error', cb)
    .on('close', function(code, err) {
      cb(err, code);
    });
}

/**
 * Execute `npm install --global` with one or more package `names`.
 *
 * ```js
 * npm.install('generate', function(err) {
 *   if (err) throw err;
 * });
 * ```
 * @param {String|Array} `names` One or more package names.
 * @param {Function} `cb` Callback
 * @api public
 */

npm.install = function(names, cb) {
  npm('install', names, cb);
};

/**
 * Execute `npm uninstall --global` with one or more package `names`.
 *
 * ```js
 * npm.uninstall('yeoman', function(err) {
 *   if (err) throw err;
 * });
 * ```
 * @param {String|Array} `names` One or more package names.
 * @param {Function} `cb` Callback
 * @api public
 */

npm.uninstall = function(names, cb) {
  npm('uninstall', names, cb);
};

/**
 * Expose `npm`
 */

module.exports = npm;