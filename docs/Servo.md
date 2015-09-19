#Phidget Servo
The PhidgetServo library makes for intuitive and lightning fast development without any compromise. For a quick start into your Spatial project see this [basic PhidgetServo example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/servoMotor.js).

##Methods

|Method call|Parameters|Description|
|---|---|---|
|[phidget.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the PhidgetServo|
|[phidget.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget device.  The disconnected event will be dispatched when the connection has been successfully disconnected.|
|whenReady|function|This executes a function when the Phidget Servo is ready to be used. __If you set intervals on this event, you MUST clear them on the detach event! Otherwise, you could set multiple instances of the same interval if a phidget is detached and re attached__|
|observe|function|Used for asynchronously observing changes to the Phidget Servo. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|
|[servoParameters](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/ServoParameters.md)|see individual methods|array of [ServoParams Methods](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/ServoParameters.md) for each attached motor|

##Data

|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|`'PhidgetServo'`|
|positionMaxLimit|number|no|Global upper position Limit in `degrees`|
|positionMinLimit|number|no|Global lower position Limit in `degrees`|
|numberOfMotors|number|no|Number of motors|
|engaged|array|yes|Power state of motors: `1` = on, `0` = off|
|positions|array|yes|Position of each motor in ` degrees `|
|positionMax|array|no|Max position of each servo in ` degrees `|
|positionMin|array|no|Min position of each servo in ` degrees `|


##Getting Started

Initializing [Phidget Servos](http://www.phidgets.com/products.php?category=10) can be very easy, here is a basic example to help you get started.


    var Phidget = require('phidgetapi').Servo;

    var servo=new Phidget();
    var motor;

    servo.observe(moved)

    servo.whenReady(init);

    function init(){
        servo.engaged[0]=1; //turn motor on, automatic on most servos
        servo.positions[0]=0; //zero motor position

        setTimeout(
            moveTo180,
            500
        );

        setTimeout(
            powerdown,
            1000
        );
    }

    function moved(changes){
        console.log('moved to', servo.positions[0]);
    }

    function moveTo180(){
        servo.positions[0]=180;
    }

    function powerdown(){
        //this will stop servo from moving if it has not completed its motion.
        servo.engaged[0]=1; //fake a hard power up just to be sure servo listens to power off command
        servo.engaged[0]=0; //power off
    }

    servo.phidget.connect();
