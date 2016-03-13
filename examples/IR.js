var Phidget = require('../phidgetapi').IR;
var IR = new Phidget();

IR.connect();
console.log('Successfully connected');
IR.whenReady(init);

function init(){
    console.log('Phidget IR Receiver/Transmitter ready');
    console.log('Provide an IR signal input and the transmitter will echo that signal');

    IR.observe(receive);
}


function receive(changes){
    console.log('IR code received: ', `0x${IR.readRaw.split(',')[0]}`);
    IR.transmit(receive);
}

function send(){
    console.log('IR code transmitted: ', `0x${IR.readRaw.split(',')[0]}`);
}
