#Phidget Spatial Sensor
More commonly known as an accelerometer, the PhidgetSpatial library makes for intuitive and lightning fast development without any compromise. For a quick start into your Spatial project see this [basic Manager example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/spatial.js).

##Methods

The below information lists the parameters, events, and give you further information about your __Phidgets Spatial__. For low level development, [see here](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams).

|Method call|Parameters|Description|
|---|---|---|
|[__phidget__.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the Phidget Spatial|
|[__phidget__.whenReady](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|function |This executes a function when the Phidgets RFID is ready to be used.|
|[__phidget__.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|__phidget__.observeGyro|'gyro'|This [observes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) for the gyroscope on the __Spatial__ board. |
|__phidget__.observeAcceleration|'accel'|This [observes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) for the acceleration sensors on the __Spatial__ board. |
|__phidget__.observeMagneticField|'mag'|This [observes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) for the magnetic sensors on the __Spatial__ board. |

##Data
 
|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|This is an identifier, Phidget GPS will always return 'PhidgetRFID'|
|observeBoard|listener|no|This observes the board for any changes and reports inputs.|
|observeOutputs|listener|no|This observes the board for any outputs and reports their activity.|
|numberOfOutputs|number|no|This returns the number of outputs on the RFID board.|
|antennaOn|bool|yes|This controls and reports the power state of the antenna. __1 = on__, __0 = off__. Antenna frequency range is __125Hz__ - __150Hz__. |
|LEDon|bool|yes|This controls and reports the power state of the onboard LED. __1 = on__, __0 = off__. |
|lastTag|number|no|This returns the ID of the last detected tag.|
|tagState|bool|no|This returns the current detection of an RFID tag, __1 = tag detected__, __0 = no tag detected__.|
|tag2|object|no|This identifies the tag providing the ID as well as the encoding tag. Keys availible are __.protocol__, and __.tag__ which return the value they are respectively named after. |
|tagLoss2|object|no|This identifies the latest previously identified tag providing the ID as well as the encoding tag. Keys availible are __.protocol__, and __.tag__ which return the value they are respectively named after. |
|outputs|array|yes|This array identifies and controls the state of the outputs of the RFID board. |



##Getting Started

Initializing [Phidgets Spatial Devices](http://www.phidgets.com/products.php?category=1) can be very easy, here is a basic example to help you get started.

    var Phidget = require('../phidgetapi.js').Spatial;

    var spatial=new Phidget;
    spatial.observeGyro(gyro);
    spatial.observeAcceleration(accel);
    spatial.observeMagneticField(mag);

    function gyro(changes){
        for(var i in changes){
            var change=changes[i];
            //see specific info about each change
            //console.log(change);
        }

        //see updated Spatial data after all changes
        //console.log(changes[changes.length-1].object);

        //Or just the info you care about
        console.log('gyro : ',spatial.gyro);
    }

    function accel(changes){
        for(var i in changes){
            var change=changes[i];
            //see specific info about each change
            //console.log(change);
        }

        //see updated Spatial data after all changes
        //console.log(changes[changes.length-1].object);

        //Or just the info you care about
        console.log('accel : ',spatial.acceleration);
    }

    function mag(changes){
        for(var i in changes){
            var change=changes[i];
            //see specific info about each change
            //console.log(change);
        }

        //see updated Spatial data after all changes
        //console.log(changes[changes.length-1].object);

        //Or just the info you care about
        console.log('magnetic field : ',spatial.magneticField);
    }

    spatial.phidget.connect();