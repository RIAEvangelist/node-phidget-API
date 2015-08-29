#Phidget InterfaceKit Boards

The PhidgetInterfaceKit library makes for intuitive and lightning fast development without any compromise to any [Phidget InterfaceBoard](http://www.phidgets.com/products.php?category=0). For accurate use, see the [analog input](http://www.phidgets.com/docs/Analog_Input_Primer), [digital input](http://www.phidgets.com/docs/Digital_Input_Primer), and [digital output](http://www.phidgets.com/docs/Digital_Output_Primer) primers. For a quick start into your InterfaceKit project, see this [basic InterfaceKit example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/InterfaceKit.js).

##Methods

|Method call|Parameters|Description|
|---|---|---|
|[phidget.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the Phidget RFID|
|[phidget.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected.|
|whenReady|function|This executes a function when the Phidget InterfaceKit is ready to be used.|
|observeOutputs|outputs|Used for asynchronously observing the digital output changes to the Phidget InterfaceKit board. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|
|observeInputs|inputs|Used for asynchronously observing the digital input changes to the Phidget InterfaceKit board. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|
|observeSensors|sensors|Used for asynchronously observing the analog input changes to the Phidget InterfaceKit board with a range of `0 - 1024`. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|
|observeRawSensors|rawSensors|Used for asynchronously observing the analog input changes to the Phidget InterfaceKit board with a range of `0 - 4096`. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|

##Data

|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|'PhidgetInterfaceKit'|
|dataRateMax|number|no|Maximum data rate in samples per second|
|dataRateMin|number|no|Minimum data rate in samples per second|
|dataRate|number|yes|The number of times data is acquired per second|
|ratiometric|bool|yes|Sets ratiometric setting. [More info](http://www.phidgets.com/docs/Analog_Input_Primer#Ratiometric_Configuration)|
|outputs|array|yes|Outputs of the InterfaceKit|
|inputs|array|no|Digital inputs of the InterfaceKit|
|sensors|array|no|Analog inputs of the InterfaceKit with a range of `0 - 1024`|
|rawSensors|array|no|Analog inputs of the InterfaceKit with a range of `0 - 4096`|
|triggers|array|yes|Minumum activation for input sensors|
|datarates|array|yes|Data rates in milliseconds|

##Getting Started

Initializing [Phidget InterfaceKits](http://www.phidgets.com/products.php?category=0) can be very easy, here is a basic example to help you get started.

    var Phidget = require('phidgetapi').InterfaceKit;

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

    IK.whenReady(init);

    IK.phidget.connect();

    function init(){
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