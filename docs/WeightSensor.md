#Phidget Weight Sensor Boards

The PhidgetWeightSensor library makes for intuitive and lightning fast development without any compromise. For a quick start into your Temperature Sensor project see the [Basic weightSensor example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/weightSensor.js).

# TO DO

This addition has yet to be tested, so if issues are found please file an issue or submit a PR.

##Methods

|Method call|Parameters|Description|
|-----------|----------|-----------|
|[connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the PhidgetTemperature |
|[quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the Phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|whenReady|change handler function|This executes a function when the PhidgetTemperature is ready to be used. __If you set intervals on this event, you MUST clear them on the detach event! Otherwise, you could set multiple instances of the same interval if a Phidget is detached and re attached__|
|observeWeight|change handler function|Used for asynchronously observing the changes to Weight.|
|unobserveWeight|change handler function|Stops observing from the specified observeWeight's change handler function.|

##Data

|Key|Data Type|Writable|Description|
|---|---------|--------|-----------|
|type|string|no|'PhidgetWeightSensor'|
|WeightChangeTrigger|number|yes|gets and sets the change trigger|

##Getting Started

Initializing [PhidgetTemperature](http://www.phidgets.com/products.php?category=35) Devices can be very easy, here is a basic example to help you get started.

    var Phidget = require('phidgetapi').TemperatureSensor;
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
