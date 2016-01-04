var Phidget = require('../phidgetapi').MotorControl;

var motor = new Phidget;

motor.connect();

motor.whenReady(init);

function init(){
    //console.log(motor.phidget.data.board);

    motor.observeEncoderPosition(observerCallback);

    //console.log(motor.supplyVoltage);
}


function observerCallback(changes) {
    console.log(motor.accelerationMin);
}
