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

function main(changes){
    console.log('IR code received: ', IR.readRaw);

    IR.transmit;
    console.log('IR code transmitted');
}
