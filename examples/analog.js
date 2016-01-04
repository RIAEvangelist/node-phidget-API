var Phidget = require('../phidgetapi.js').Analog;

var analog=new Phidget();
analog.connect();

analog.whenReady(init)
analog.observeVoltage(voltage);

function init(){
    setInterval(
        function(){
            if(analog.voltage[0] === 0){
                analog.voltage[0] = 5;
            }else{
                analog.voltage[0] = 0;
            }
            if(analog.enabled === 0){
                analog.enabled = 1;
            }else{
                analog.enabled = 0;
            }
        },
        5000
    );
}

function voltage(changes){
    console.log(analog.voltage);
}
