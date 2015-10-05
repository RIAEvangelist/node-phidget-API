var Phidget = require('../phidgetapi').TemperatureSensor;
var temp =new Phidget;


temp.connect();
console.log('here');
temp.whenReady(init);

function init(){
    console.log('Thermocouple Types Initially Connected ',temp.thermocoupleType); //Logs Initial Thermocouples Connected

    temp.observeAmbientTemperature(ambientTemperatureUpdates);
    temp.observeTemperature(temperatureUpdates);
}

function ambientTemperatureUpdates(changes){
    console.log('Ambient Temperatures', temp.ambientTemperature);
}

function temperatureUpdates(changes){
    console.log('Sensor Temperatures' , temp.temperature);
}
