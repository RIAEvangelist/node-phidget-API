# Phidget Temperature Sensor Boards

The PhidgetTemperature library makes for intuitive and lightning fast development without any compromise. For a quick start into your Temperature Sensor project see the [Basic Temperature example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/temperature.js).

## Methods

|Method call|Parameters|Description|
|-----------|----------|-----------|
|[connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the PhidgetTemperature |
|[quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the Phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|whenReady|change handler function|This executes a function when the PhidgetTemperature is ready to be used. __If you set intervals on this event, you MUST clear them on the detach event! Otherwise, you could set multiple instances of the same interval if a Phidget is detached and re attached__|
|observeTemperature|change handler function|Used for asynchronously observing the changes to Sensor Temperature.|
|unobserveTemperature|change handler function|Stops observing from the specified observeTemperature's change handler function.|
|observeAmbientTemperature|change handler function|Used for asynchronously observing the changes to Ambient Temperature.|
|unobserveAmbientTemperature|change handler function|Stops observing from the specified observeAmbientTemperature's change handler function.|

## Data

|Key|Data Type|Writable|Description|
|---|---------|--------|-----------|
|type|string|no|'PhidgetTemperature'|
|ambientTemperature|number|no|Ambient temperature in Celsius|
|ambientTemperatureMax|number|no|Max ambient temperature in Celsius|
|ambientTemperatureMin|number|no|Min ambient temperature in Celsius|
|temperature|number|no|Sensor temperature in Celsius|
|temperatureMax|number|no|Max sensor temperature in Celsius|
|temperatureMin|number|no|Min sensor temperature in Celsius|
|potential|number|no|Thermocouple potential in Millivolts|
|potentialMin|number|no|Min Thermocouple potential|
|potentialMax|number|no|Max Thermocouple potential|
|thermocoupleType|number|no|Thermocouple [Key](http://www.phidgets.com/docs/Thermocouple_Primer)|

## Getting Started

Initializing [PhidgetTemperature](http://www.phidgets.com/products.php?category=35) Devices can be very easy, here is a basic example to help you get started.

```javascript
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
```
