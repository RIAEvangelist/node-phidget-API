var Phidget = new require('../phidgetapi.js').MotorControl;

var motor = new Phidget;

motor.whenReady(init);
motor.observeVelocity(velocity);

function init(){
    motor.velocity[0] = 5;
}

function velocity(changes){
    console.log('current motor velocity is :', motor.velocity[0]);
    console.log('and the voltage supplied is :',motor.supplyVoltage,' Volts');
    console.log('with a current draw of :', motor.current[0], ' Amps');
}
