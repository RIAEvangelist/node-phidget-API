#Phidget Spatial Sensor
More commonly known as an accelerometer, the PhidgetSpatial library makes for intuitive and lightning fast development without any compromise. All spacial directions must be defined by user, for an in dept guide into this, [here is a great guide](http://www.phidgets.com/docs/1044_User_Guide). For a quick start into your Spatial project see this [basic Manager example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/spatial.js).

##Methods

The below information lists the parameters, events, and give you further information about your __Phidgets Spatial__. For low level development, [see here](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams).

|Method call|Parameters|Description|
|---|---|---|
|[__phidget__.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the Phidget Spatial|
|[__phidget__.whenReady](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|function |This executes a function when the Phidgets RFID is ready to be used.|
|[__phidget__.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|__phidget__.observeGyro|'gyro'|This [observes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) for the gyroscope on the __Spatial__ board. |
|__phidget__.observeAcceleration|'accel'|This [observes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) for the acceleration sensors on the __Spatial__ board. |
|__phidget__.observeMagneticField|'mag'|This [observes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) for the magnetic sensors, needed for the compass feature, on the __Spatial__ board. |

##Data
 
|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|This is an identifier, Phidget GPS will always return 'PhidgetSpatial'|
|accelerationMin|number|no|This returns the maximum negative acceleration that the desired axis will report.|
|accelerationMax|number|no|This returns the maximum acceleration that the desired axis will report.|
|angularRateMax|number|no|This returns the maximum angular momentum that the desired axis will report.|
|angularRateMin|number|no|This returns the maximum angular momentum that the desired axis will report. |
|dataRate|number|yes|This controls and reports current data rate at which data is being handled. In depth guide [here](http://www.phidgets.com/docs/1044_User_Guide) |
|dataRateMax|number|no|This returns the maximum supported data rate.|
|dataRateMin|number|no|is returns the minimum supported data rate.|
|compassAxisCount|number|no|This returns the number of axes the PhidgetSpatial can measure magnetic field strength on. |
|gyroAxisCount|number|no|This returns the number of axes the PhidgetSpatial can measure angular momentum on. |
|accelerationAxisCount|number|no|This returns the number of axes the PhidgetSpatial can measure acceleration on. |
|magneticFieldMax|number|no|This returns the maximum magnetic field that this axis will report.|
|magneticFieldMin|number|no|This returns the maximum negative magnetic field that this axis will report.|
|observeAcceleration|listener|no|This [observes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) the PhidgetSpacial for any acceleration changes and reports their activity.|
|observeGyro|listener|no|This [observes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) the PhidgetSpacial for any changes in angular momentum and reports their activity.|
|observeMagneticField|listener|no|This [observes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) the PhidgetSpacial for any changes in magnetic fields and reports their activity.|
|acceleration|array|no|This contains three directions of acceleration with [user defined coordinates](http://www.phidgets.com/docs/1044_User_Guide) in __g__.|
|acceleration|array|no|This contains three directions of acceleration with [user defined coordinates](http://www.phidgets.com/docs/1044_User_Guide) in __g__.|
|gyro|array|no|This contains three directions of angular momentum with [user defined coordinates](http://www.phidgets.com/docs/1044_User_Guide) in __<sup>o</sup>/s__.|
|magneticField|array|no|This contains three directions of magnetic field with [user defined coordinates](http://www.phidgets.com/docs/1044_User_Guide) in __G (Gauss)__.|
|dataRate|number|yes|This controls and reports the rate at which data is acquired.|
|zeroGyro|function|no| This re-zeroes the gyroscope.|
|setCompassCorrectionParameters|function|no|This function alters the parameters of the compass, paramters are input in the following order: `magfield`, `offset0`, `offset1`, `offset2`, `gain0`, `gain1`, `gain2`, `T0`, `T1`, `T2`, `T3`, `T4`, `T5`.|
|resetCompassCorrectionParameters|function|no|This function resets the Compass Correction Parameters to default values.|

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