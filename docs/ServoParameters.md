# ServoParameters

Each PhidgetServo will have its own set of parameters. Documentation for [PhidgetServos can be seen here](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Servo.md),a full list of PhidgetServo products [here](http://www.phidgets.com/products.php?category=10), and a full servo primer guide [here](http://www.phidgets.com/docs/Servo_Motor_and_Controller_Primer).

## Methods

|Method call|Parameters|Description|
|-----------|----------|-----------|
|servoParameters[index].usToDegrees|bool|`true` returns current Phidgets raw position data converted to degrees.|
|servoParameters[index].degreesToUs|bool|`true` returns current degrees position data converted to Phidgets raw position data.|
|servoParameters[index].usToDegreesVels|bool|`true` returns current Phidgets raw velocity data converted to degrees per second.|
|servoParameters{index].degreesToUsVels|bool|`true` returns current degrees per second data converted to Phidgets raw velocity data.|

To Do: Document advanced Servo Controller
