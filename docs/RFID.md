#Phidget RFID Sensor

The PhidgetRFID library makes for intuitive and lightning fast development without any compromise. For a quick start into your RFID project see the [basic RFID example.](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/RFID.js)

ToDo : map out module and describe use

##Methods

The below information lists the parameters, events, and give you further information about your Phidgets RFID. For low level development, [see here](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams).

|Method call|Parameters|Description|
|---|---|---|
|phidget.connect|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the Phidget RFID|
|phidget.whenReady|function() |This executes a function when the Phidgets RFID is ready to be used.|

##Data
 
 |Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|This is an identifier, Phidget GPS will always return 'PhidgetGPS'|
|date|number|no|This returns the current date under UTC. Subkeys are broken up into __date.full__, __date.year__, __date.month__, __date.day__, __date.hour__, __date.min__, __date.sec__, and __date.ms__. They will return the value which they are respectively named after.|
|date.timeOffset|number|no|This returns the time offset from the computer or embedded system the Phidget GPS is attached to. |
|heading|number|no|This returns current heading Phidget GPS is on.|
|velocity|number|no|This returns the current speed in __km/h__. |
|alt|number|no|This returns current altitude Phidget GPS is in with units of __meters__.|
|lat|number|no|This returns current latitude Phidget GPS is in.|
|lon|number|no|This returns current longitude Phidget GPS is in.|
|fixed|bool|no|This true if the GPS location has been fully determined by the Phidgets GPS.|

##Getting Started

Initializing [Phidgets RFID Devices](http://www.phidgets.com/products.php?category=14) can be very easy, here is a basic example to help you get started.

    var Phidget = require('../phidgetapi').RFID;

    var RFID=new Phidget;

    RFID.observeBoard(update);

    RFID.whenReady(
        function(){
            //turn on the antenna when available and blink the LED so we know it is ready.
            RFID.antennaOn=1;
            RFID.LEDOn=1;
            setTimeout(
                function(){
                    RFID.LEDOn=0;
                },
                250
            )
        }
    );

    RFID.phidget.connect();

    function update(changes){
         for(var i in changes){
            var change=changes[i];
            //see specific info about each change
            //console.log(change);
        }

        //light the LED while the tag is present
        if(RFID.tagState==1 && RFID.LEDOn==0 && RFID.tag2.tag){
            RFID.LEDOn=1;
            console.log(RFID.tag2.tag);
        }

        //turn off the LED if no tag is present
        if(RFID.tagState==0){
            RFID.LEDOn=0;
        }

    }