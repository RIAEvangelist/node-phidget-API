#Phidget Spatial Sensor
More commonly known as an accelerometer, the PhidgetSpatial library makes for intuitive and lightning fast development without any compromise. All spacial directions must be defined by user, for an in dept guide into this, [see your board's user guide](http://www.phidgets.com/products.php?category=1). For a quick start into your Spatial project see this [basic Manager example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/spatial.js).

##Methods

|Method call|Parameters|Description|
|---|---|---|
|[__phidget__.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the Phidget Spatial|
|[__phidget__.whenReady](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|function |This executes a function when the Phidgets RFID is ready to be used.|
|[__phidget__.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|observeGyro|gyro|used for asynchronously observing the changes to the PhidgetSpatial board's gyroscopic sensors. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|
|observeAcceleration|accel|used for asynchronously observing the changes to the PhidgetSpatial board's accelereration axes. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework. |
|observeMagneticField|mag|used for asynchronously observing the changes to the PhidgetSpatial board's magnetic field sensors. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework. |
|zeroGyro|N/A| This re-zeroes the gyroscope.|
|setCompassCorrectionParameters|`magfield, offset0, offset1, offset2, gain0, gain1, gain2, T0, T1, T2, T3, T4, T5`|This function adjusts the parameters of the compass.|
|resetCompassCorrectionParameters|N/A|This function resets the Compass Correction Parameters to default values:`(1,0,0,0,1,1,1,0,0,0,0,0,0)`|

##Data
 
|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|This is an identifier, Phidget GPS will always return 'PhidgetSpatial'|
|accelerationMin|number|no|Access to value for minimum acceleration.|
|accelerationMax|number|no|Access to value for maximum acceleration.|
|angularRateMax|number|no|Access to value for minimum angular momentum.|
|angularRateMin|number|no|Access to value for maximum angular momentum.|
|dataRate|number|yes|The number of times data is acquired per second. |
|dataRateMax|number|no|Access to supported max data rate value in sample/s.|
|dataRateMin|number|no|Access to supported min data rate value in sample/s.|
|compassAxisCount|number|no|Access to number of magnetic field sensors on your board.|
|gyroAxisCount|number|no|Access to number of gyroscopic sensors on your board.|
|accelerationAxisCount|number|no|Access to number of acceleration sensors on your board.|
|magneticFieldMax|number|no|Access to value for maximum magnetic field.|
|magneticFieldMin|number|no|Access to value for maximum magnetic field.|
|acceleration|array|no|This contains three directions of acceleration with user defined coordinates in g.|
|gyro|array|no|This contains three directions of angular momentum with user defined coordinates in degrees/s.|
|magneticField|array|no|This contains three directions of magnetic field with user defined coordinates in G (Gauss).|


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