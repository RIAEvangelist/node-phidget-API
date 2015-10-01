var Phidget = require('../phidgetapi').TemperatureSensor;
var temp =new Phidget;


temp.connect();

temp.whenReady(init);

function init(){
    console.log('Initiated');
    temp.observeAmbientTemperature(outputs);
    //console.log(temp.phidget.data);

}

function outputs(changes){

    for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        console.log(change);
    }

    //see updated IK data after all changes
    //console.log(temp.phidget.data);
}
