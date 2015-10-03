var Phidget = require('../phidgetapi').TemperatureSensor;
var temp =new Phidget;


temp.connect();

temp.whenReady(init);

function init(){
    console.log('Initiated');
    temp.observeAmbientTemperature(temperatureUpdates);
    //console.log(temp.phidget.data);

    //console.log(temp.thermocoupleType);
}

function temperatureUpdates(changes){

    // for(var i in changes){
    //     var change=changes[i];
    //     //see specific info about each change
    //     console.log(change);
    // }
    //console.log(changes);
    console.log(temp.ambientTemperature);

}
