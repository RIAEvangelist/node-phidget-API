/*
 * Phidget Interface for node.js
 * Brandon Miller
 *
 * June 2012
 *
 */
var Phidget = require('./lib/Phidget.js').Phidget;
var Manager = require('./lib/Manager.js').Manager;
var GPS = require('./lib/GPS.js').Phidget;

exports.Phidget = Phidget;
exports.Manager = Manager;
exports.GPS     = GPS;

//backwards compatibilirty only below
exports.phidget = Phidget;
