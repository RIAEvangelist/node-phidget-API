var Phidget = require('../phidgetapi').source;

var source=new Phidget();

source.observe(board)

source.whenReady(init);

function init(){
    source.enabled[0]=1; //turn source on
    source.voltage[0]=0; //zero voltage

    setTimeout(
        sineWave,
        500
    );

    setTimeout(
        powerdown,
        5000
    );
}

function board(changes){
    console.log('current board state', JSON.stringify(source));
}

function moveTo180(){
    for(var i = 0, i < 361, i++){
        source.voltage[0] = Math.sin(i)
        console.log(source.voltage[0])
    }
}

function powerdown(){
    source.enabled[0]=1; //fake a hard power up just to be sure source listens to power off command
    source.enabled[0]=0; //power off
}

source.connect();
