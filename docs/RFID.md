#Phidget RFID Sensor
The PhidgetRFID library makes for intuitive and lightning fast development without any compromise. For a quick start into your GPS project see the __Getting Started__ section.

##Methods

|Method call|Parameters|Description|
|---|---|---|
|phidget.connect|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the Phidget RFID|
|whenReady|function|This executes a function when the Phidgets RFID is ready to be used.|
|observeBoard|function|used for asynchronously observing the changes to the PhidgetRFID board. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|
|observeOutputs|function|used for asynchronously observing the changes to the Phidget RFID Outputs. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|

##Data
 
|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|This is an identifier, Phidget GPS will always return 'PhidgetRFID'|
|numberOfOutputs|number|no|This returns the number of outputs on the RFID board.|
|antennaOn|bool|yes|This controls and reports the power state of the antenna. __1 = on__, __0 = off__. Antenna frequency range is __125Hz__ - __150Hz__. |
|LEDon|bool|yes|This controls and reports the power state of the onboard LED. __1 = on__, __0 = off__. |
|lastTag|number|no|This returns the ID of the last detected tag.|
|tagState|bool|no|This returns the current detection of an RFID tag, __1 = tag detected__, __0 = no tag detected__.|
|tag2|object|no|This identifies the tag providing the ID as well as the encoding tag. Keys availible are __.protocol__, and __.tag__ which return the value they are respectively named after. |
|tagLoss2|object|no|This identifies the latest previously identified tag providing the ID as well as the encoding tag. Keys availible are __.protocol__, and __.tag__ which return the value they are respectively named after. |
|outputs|array|yes|This array identifies and controls the state of the outputs of the RFID board. |



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