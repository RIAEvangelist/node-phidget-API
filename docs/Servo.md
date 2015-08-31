#Phidget Spatial Sensor
The PhidgetServo library makes for intuitive and lightning fast development without any compromise. Servos can be primed for more accurate use, [here is the Servo Primer Guide](http://www.phidgets.com/docs/Servo_Motor_and_Controller_Primer). For a quick start into your Spatial project see this [basic PhidgetServo example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/servoMotor.js).

##Methods

|Method call|Parameters|Description|
|---|---|---|
|[phidget.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the PhidgetServo|
|[phidget.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget device.  The disconnected event will be dispatched when the connection has been successfully disconnected.|
|whenReady|function|This executes a function when the Phidget Servo is ready to be used.|
|observe|position|Used for asynchronously observing position changes by the Phidget Servo. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|


##Data

|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|`'PhidgetServo`|