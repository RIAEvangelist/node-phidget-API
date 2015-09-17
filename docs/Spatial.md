#Phidget Spatial Sensor
The PhidgetSpatial library makes for intuitive and lightning fast development without any compromise. All sensors on this board should be primed for accurate use, here are the [acceleration](http://www.phidgets.com/docs/Accelerometer_Primer), [gyroscopic](http://www.phidgets.com/docs/Gyroscope_Primer), and [magnetic field](http://www.phidgets.com/docs/Compass_Primer) primer guides. For a quick start into your Spatial project see this [basic PhidgetSpatial example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/spatial.js).

##Methods

|Method call|Parameters|Description|
|---|---|---|
|[__phidget__.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the Phidget Spatial|
|[__phidget__.whenReady](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|function |This executes a function when the Phidgets Spatial is ready to be used. __If you set intervals on this event, you MUST clear them on the detach event! Otherwise, you could set multiple instances of the same interval if a phidget is detached and re attached__|
|[__phidget__.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|observeGyro|gyro|Used for asynchronously observing the changes to the PhidgetSpatial board's gyroscopic sensors. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|
|observeAcceleration|accel|Used for asynchronously observing the changes to the PhidgetSpatial board's acceleration axes. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework. |
|observeMagneticField|mag|Used for asynchronously observing the changes to the PhidgetSpatial board's magnetic field sensors. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework. |
|zeroGyro|N/A| Re-zeroes the gyroscope.|
|setCompassCorrectionParameters|`magfield, offset0, offset1, offset2, gain0, gain1, gain2, T0, T1, T2, T3, T4, T5`|This function adjusts the parameters of the compass.|
|resetCompassCorrectionParameters|N/A|Resets the Compass Correction Parameters to default values:`(1,0,0,0,1,1,1,0,0,0,0,0,0)`|

##Data

|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|'PhidgetSpatial'|
|dataRateMax|number|no|Maximum data rate in samples per second|
|dataRateMin|number|no|Minimum data rate in samples per second|
|dataRate|number|yes|The number of times data is acquired per second|
|accelerationMin|number|no|Minimum acceleration in g|
|accelerationMax|number|no|Maximum acceleration in g|
|accelerationAxisCount|number|no|Number of acceleration sensors|
|acceleration|array|no|three axes of acceleration in g|
|angularRateMax|number|no|Minimum rotational speed in degrees per second |
|angularRateMin|number|no|Maximum rotational speed in degrees per second|
|gyroAxisCount|number|no|Number of gyroscopic sensors|
|gyro|array|no|three axes of rotational speed in degrees per second|
|magneticFieldMax|number|no|Maximum magnetic field in Gauss|
|magneticFieldMin|number|no|Minimum magnetic field in Gauss|
|compassAxisCount|number|no|Number of magnetic field sensors|
|magneticField|array|no|three axes of magnetic field in Gauss|


##Getting Started

Initializing [Phidgets Spatial Devices](http://www.phidgets.com/products.php?category=1) can be very easy, here is a basic example to help you get started.

    var Phidget = require('phidgetapi').Spatial;

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
