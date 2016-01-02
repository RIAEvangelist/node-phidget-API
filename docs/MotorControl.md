# PhidgetMotorControl

The PhidgetMotorControl library makes for intuitive and lightning fast development without any interfaces to any project. [PhidgetMotorControl](http://www.phidgets.com/products.php?category=10) and their [Extensive Primer Guides](http://www.phidgets.com/docs/1065_User_Guide) are very easy to follow and advanced examples are coming soon!

## To Do

Test this portion of the Lib

## Methods
|Method call|Parameters|Description|
|-----------|----------|-----------|
|[connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the Phidget RFID|
|[quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the Phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected.|
|whenReady|function|This executes a function when the Phidget InterfaceKit is ready to be used. __If you set intervals on this event, you MUST clear them on the detach event! Otherwise, you could set multiple instances of the same interval if a Phidget is detached and re attached__|
|observeAcceleration|change handler function|Used for asynchronously observing the acceleration changes to the motor(s)|
|unobserveAcceleration|change handler function|Stops observing from the specified observeAcceleration's change handler function.|
|observeVelocity|change handler function|Used for asynchronously observing the velocity changes to the motor(s)|
|unobserveVelocity|change handler function|Stops observing from the specified observeVelocity's change handler function.|
|observeBackEMF|change handler function|Used for asynchronously observing the EMF changes to the motor(s)|
|unobserveEMF|change handler function|Stops observing from the specified observeEMF's change handler function.|
|observeBackEMF|change handler function|Used for asynchronously observing the EMF changes to the motor(s)|
|unobserveEMF|change handler function|Stops observing from the specified observeEMF's change handler function.|
|observeBraking|change handler function|Used for asynchronously observing the Braking changes to the motor(s)|
|unobserveBraking|change handler function|Stops observing from the specified observeBraking's change handler function.|
|observeBackEMF|change handler function|Used for asynchronously observing the EMF changes to the motor(s)|
|unobserveEMF|change handler function|Stops observing from the specified observeEMF's change handler function.|
|observeEncoderPosition|change handler function|Used for asynchronously observing the Encoder changes to the motor(s)|
|unobserveEncoderPosition|change handler function|Stops observing from the specified observeEncoderPosition's change handler function.|
|observeSensors|change handler function|Used for asynchronously observing the sensor changes to the Phidget InterfaceKit board with a range of `0 - 1024`.|
|unobserveSensors|change handler function|Stops observing from the specified observeSensors' change handler function.|
|observeRawSensors|change handler function|Used for asynchronously observing the sensor changes to the Phidget InterfaceKit board with a range of `0 - 4096`.|
|unobserveRawSensors|change handler function|Stops observing from the specified observeRawSensors' change handler function.|


## Data


|Key|Data Type|Writable|Description|
|---|---------|--------|-----------|
|type|string|no|`'PhidgetMotorControl'`|
|accelerationMax|array|no|Maximun acceleration possible by the motor(s)|
|accelerationMin|array|no|Minumum acceleration possible by the motor(s)|
|inputCount|number|no|Number of Inputs|
|motorCount|number|no|Number of Motors availible|
|encoderCount|number|no|Number of encoders availible|
|sensorCount|number|no|Number of sensors availible|
|supplyVoltage|number|no|Supplied voltage|
|inputs|number|no|Number of inputs|
|acceleration|array|yes|current acceleration value for motor(s)|
|velocity|array|yes|Velocity value for the motor(s)|
|current|array|no|Current draw of motors|
|encoderPosition|array|yes|Encoder position of the motor(s)|
|backEMFSensingState|array|yes|Current sensing state of the motor(s)|
|backEMF|array|no|Back EMF by the motor(s)|
|braking|array|yes|Braking state of the motor(s)|
|sensors|array|no|sensor values `0 - 1024`|
|rawSensors|array|no|sensor values `0 - 4096`|

## Getting Started

Initializing a [Phidget MotorControl](http://www.phidgets.com/products.php?category=10) can be very easy, here is a basic example to help you get started.

    var Phidget = new require('../phidgetapi.js').MotorControl;

    var motor = new Phidget;

    motor.whenReady(init);
    motor.observeVelocity(velocity);

    function init(){
        motor.velocity[0] = 5;
    }

    function velocity(changes){
        console.log('current motor velocity is :', motor.velocity[0]);
        console.log('and the voltage supplied is :',motor.supplyVoltage,' Volts');
        console.log('with a current draw of :', motor.current[0], ' Amps');
    }
