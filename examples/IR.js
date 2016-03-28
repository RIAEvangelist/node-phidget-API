'use strict';

const Phidget = require('../phidgetapi').IR;
const IR = new Phidget();

//Power On/Off learn code: 200000000200000002000000e4a4010034020000502300009e110000340200009d060000340200004202000050230000cf0800003402000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000709400003200000020df10ef

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

    let code='20df10ef,32,0';
    code=code.split(',')[0];

    IR.transmit=code;
}
