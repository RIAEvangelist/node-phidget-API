var Phidget = require('../phidgetapi').IR;
var IR = new Phidget();

IR.connect();
console.log('Successfully connected');
IR.whenReady(init);
console.log(IR);

function init(){
    console.log('Phidget IR Receiver/Transmitter ready');
    console.log('Provide an IR signal input and the transmitter will echo that signal');

    IR.observe(receive);
}


function receive(changes){
    console.log('in function');

}

/*
var phidget = require('../phidgetapi').phidget;
var IR = new phidget();

IR.on(
    'changed',
    function(){
        if (!IR.data.RawData){
          return;
        }
        console.log(Number(`0x${IR.data.board.Code.split(',')[0]}`));

    }
);
*/
