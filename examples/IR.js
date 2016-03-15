var Phidget = require('../phidgetapi').IR;
var IR = new Phidget();

IR.connect();
console.log('Successfully connected');
IR.whenReady(init);

function init(){
    console.log('Phidget IR Receiver/Transmitter ready');
    console.log('Provide an IR signal input and the transmitter will echo that signal');

    IR.observe(main);
}

//IR.transmit='20df10ef,32,1';
//console.log('on');

function main(changes){
    var code=IR.readRaw;
    console.log('IR code received: ', code);

    IR.transmit=IR.readRaw;
    console.log('IR code transmitted: ', IR.transmit);
}
