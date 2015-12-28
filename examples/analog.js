var Phidget = require('../phidgetapi.js').Analog;

var analog=new Phidget();
analog.connect();

analog.whenReady(init)

function init(){
    console.log(analog.numberOfOutputs);
}
