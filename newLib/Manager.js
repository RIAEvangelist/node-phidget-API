'use strict';

const Phidget = require('./Phidget.js');

class Manager extends Phidget{
    constructor(){
        super();
        this.type = 'PhidgetManager';
    }
}

module.exports = Manager;
