var Phidget = require('../phidgetapi.js').Analog;

var weight=new Phidget();
weight.connect();

weight.whenReady(init)
weight.observeWeight(weight);

function init(){
    //your init stuff here
}

function weight(changes){
    console.log(weight.voltage);
}
