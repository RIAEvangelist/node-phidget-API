var Phidget = require('../phidgetapi').MotorControl;

var motor = new Phidget;

motor.connect();

motor.whenReady(init);

function init(){
    motor.observeEncoderPosition(observerCallback);
}

function observerCallback(changes) {
    console.log(motor.EncoderPosition);
}
