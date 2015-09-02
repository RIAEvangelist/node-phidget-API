#ServoParameters

Each PhidgetServo will have its own set of parameters. Documentation for [PhidgetServos can be seen here](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Servo.md) and a full list of PhidgetServo products [here](http://www.phidgets.com/products.php?category=10). 

##Methods
|Method call|Parameters|Description|
|---|---|---|
|servoParameters[0].usToDegrees|bool|`true` returns current Phidgets raw position data converted to degrees.|
|servoParameters[0].degreesToUs|bool|`true` returns current degrees position data converted to Phidgets raw position data.|
|servoParameters[0].usToDegreesVels|bool|`true` returns current Phidgets raw velocity data converted to degrees per second.|
|servoParameters[0].degreesToUsVels|bool|`true` returns current degrees per second data converted to Phidgets raw velocity data.|