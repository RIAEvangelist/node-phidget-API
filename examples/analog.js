var Phidget = require('../phidgetapi').Analog;

var analog=new Phidget();

analog.observe(update)

analog.whenReady(init);

function init(){
    analog.enabled[0]=1; //turn analog on
    analog.voltage[0]=0; //zero voltage

    setTimeout(
        sineWave,
        500
    );

    setTimeout(
        powerdown,
        5000
    );
}

function update(changes){
    console.log('current board state', JSON.stringify(analog));
}

function powerdown(){
    analog.enabled[0]=1; //fake a hard power up just to be sure analog listens to power off command
    analog.enabled[0]=0; //power off
}

analog.connect();
