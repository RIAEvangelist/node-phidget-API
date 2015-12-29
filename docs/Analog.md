#Phidget Analog
The PhidgetAnalog library makes for intuitive and lightning fast development without any compromise. For a quick start into your Analog Output project see this [Basic PhidgetAnalog Example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/AnalogSource.js), and see this [Analog Primer Guide](http://www.phidgets.com/docs/Analog_Output_Primer) to get the most out of your Phidget!

##Methods

|Method call|Parameters|Description|
|-----------|----------|-----------|
|[connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the PhidgetAnalog|
|[quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the Phidget device.  The disconnected event will be dispatched when the connection has been successfully disconnected.|
|whenReady|function|This executes a function when the Phidget Analog is ready to be used. __If you set intervals on this event, you MUST clear them on the detach event! Otherwise, you could set multiple instances of the same interval if a Phidget is detached and re attached__|
|observe|change handler function|Used for asynchronously observing changes to the Phidget Analog.|

##Data

|Key|Data Type|Writable|Description|
|---|---------|--------|-----------|
|type|string|no|'PhidgetAnalog'|
|voltageMaxLimit|number|no|Global upper voltage in Volts|
|voltageMinLimit|number|no|Global lower voltage in Volts|
|numberOfOutputs|number|no|Number of Voltage Sources|
|enabled|array|yes|Power state of Voltage Sources: `1` = on, `0` = off|
|voltage|array|yes|Output of each Voltage Source in Volts|

##Getting Started

Initializing [PhidgetAnalog](http://www.phidgets.com/products.php?category=0) devices can be very easy. here is a basic exmple to help get you started

    var Phidget = require('../phidgetapi').source;

    var source=new Phidget();

    source.observe(board)

    source.whenReady(init);

    function init(){
        source.enabled[0]=1; //turn source on
        source.voltage[0]=0; //zero voltage

        setTimeout(
            sineWave,
            500
        );

        setTimeout(
            powerdown,
            5000
        );
    }

    function board(changes){
        console.log('current board state', JSON.stringify(source));
    }

    function moveTo180(){
        for(var i = 0, i < 361, i++){
            source.voltage[0] = Math.sin(i)
            console.log(source.voltage[0])
        }
    }

    function powerdown(){
        source.enabled[0]=1; //fake a hard power up just to be sure source listens to power off command
        source.enabled[0]=0; //power off
    }

    source.connect();
