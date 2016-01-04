var Phidget = require('../phidgetapi').MotorControl;

var motor = new Phidget;

motor.connect();

motor.whenReady(init);

function init(){
    console.log(motor.phidget.data.board);
    //console.log(motor.supplyVoltage);
}
