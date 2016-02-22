# Phidget InterfaceKit Boards

The PhidgetInterfaceKit library makes for intuitive and lightning fast development without any compromise to any [Phidget InterfaceBoard](http://www.phidgets.com/products.php?category=0). For accurate use, see the [sensors](http://www.phidgets.com/docs/Analog_Input_Primer), [digital inputs](http://www.phidgets.com/docs/Digital_Input_Primer), and [digital outputs](http://www.phidgets.com/docs/Digital_Output_Primer) primers. For a quick start into your InterfaceKit project, see this [basic InterfaceKit example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/InterfaceKit.js).

## Methods

|Method call|Parameters|Description|
|-----------|----------|-----------|
|[connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the Phidget RFID|
|[quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the Phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected.|
|whenReady|function|This executes a function when the Phidget InterfaceKit is ready to be used. __If you set intervals on this event, you MUST clear them on the detach event! Otherwise, you could set multiple instances of the same interval if a Phidget is detached and re attached__|
|observeOutputs|change handler function|Used for asynchronously observing the digital output changes to the Phidget InterfaceKit board.|
|unobserveOutputs|change handler function|Stops observing from the specified observeOutputs' change handler function.|
|observeInputs|change handler function|Used for asynchronously observing the digital input changes to the Phidget InterfaceKit board.|
|unobserveInputs|change handler function|Stops observing from the specified observeInputs' change handler function.|
|observeSensors|change handler function|Used for asynchronously observing the sensor changes to the Phidget InterfaceKit board with a range of `0 - 1024`.|
|unobserveSensors|change handler function|Stops observing from the specified observeSensors' change handler function.|
|observeRawSensors|change handler function|Used for asynchronously observing the sensor changes to the Phidget InterfaceKit board with a range of `0 - 4096`.|
|unobserveRawSensors|change handler function|Stops observing from the specified observeRawSensors' change handler function.|

## Data

|Key|Data Type|Writable|Description|
|---|---------|--------|-----------|
|type|string|no|`'PhidgetInterfaceKit'`|
|dataRateMax|number|no|Maximum data rate in samples per second|
|dataRateMin|number|no|Minimum data rate in samples per second|
|dataRates|array|yes|The number of times data is acquired per second|
|ratiometric|number|yes|Sets ratiometric setting to either `0` or `1` [More info](http://www.phidgets.com/docs/Analog_Input_Primer#Ratiometric_Configuration)|
|outputs|array|yes|Outputs of the InterfaceKit|
|inputs|array|no|Digital inputs of the InterfaceKit|
|sensors|array|no|sensor values `0 - 1024`|
|rawSensors|array|no|sensor values `0 - 4096`|
|triggers|array|yes|Minumum activation for input sensors|

## Getting Started

Initializing a [Phidget InterfaceKit](http://www.phidgets.com/products.php?category=0) can be very easy, here is a basic example to help you get started.
```javascript
    var Phidget = require('../phidgetapi').InterfaceKit;

    var IK=new Phidget;
    /*
    In this example IK is a Phidget InterfaceKit 8/8/8
    this same code would work for other InterfaceKits, however
    the code for sensor input may never execute as those
    boards may not have sensors.
    */

    IK.observeOutputs(outputs);
    IK.observeInputs(inputs);
    IK.observeSensors(sensors);
    IK.observeRawSensors(rawSensors);

    //Uncomment to stop observing after 8 seconds
    // setTimeout(
    //     function(){
    //         IK.unobserveRawSensors(rawSensors);
    //         IK.unobserveSensors(sensors);
    //         IK.unobserveInputs(inputs);
    //         IK.unobserveOutputs(outputs);
    //     },
    //     8000
    // );


    IK.whenReady(init);

    IK.connect();

    function init(){
        console.log('init');
        //do some initial set up here... like blinking an led.
        setInterval(
        function(){
            if(IK.outputs[0]==0){
                IK.outputs[0]=1;
            }else{
                IK.outputs[0]=0;
            }
        },
        1000
    );
    }

    function sensors(changes){
        for(var i in changes){
            var change=changes[i];
            //see specific info about each change
            //console.log(change);
        }

        //see updated IK data after all changes
        console.log('Sensors',IK.sensors);

        //do something with the sensor info like turn another LED on.
        if(IK.sensors[7]>500){
            IK.outputs[1]=1;
        }else{
            IK.outputs[1]=0;
        }
    }

    function rawSensors(changes){
        for(var i in changes){
            var change=changes[i];
            //see specific info about each change
            //console.log(change);
        }

        //see updated IK data after all changes
        console.log('Raw Sensors',IK.rawSensors);
    }

    function outputs(changes){
        for(var i in changes){
            var change=changes[i];
            //see specific info about each change
            //console.log(change);
        }

        //see updated IK data after all changes
        console.log('Outputs',IK.outputs);
    }

    function inputs(changes){
        for(var i in changes){
            var change=changes[i];
            //see specific info about each change
            //console.log(change);
        }

        //see updated IK data after all changes
        console.log('Inputs',IK.inputs);
    }
```
