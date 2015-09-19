#Phidget RFID
The PhidgetRFID library makes for intuitive and lightning fast development without any compromise. For a quick start into your GPS project see the __Getting Started__ section.

##Methods

|Method call|Parameters|Description|
|-----------|----------|-----------|
|[connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the Phidget RFID|
|[quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|whenReady|function|This executes a function when the Phidgets RFID is ready to be used. __If you set intervals on this event, you MUST clear them on the detach event! Otherwise, you could set multiple instances of the same interval if a phidget is detached and re attached__|
|observeBoard|function|Used for asynchronously observing the changes to the PhidgetRFID board.|
|observeOutputs|function|Used for asynchronously observing the changes to the Phidget RFID Outputs.|

##Data

|Key|Data Type|Writable|Description|
|---|---------|--------|-----------|
|type|string|no|'PhidgetRFID'|
|numberOfOutputs|number|no|number of outputs on the RFID board|
|antennaOn|bool|yes|antenna state : ` 1 ` is On, ` 0 ` is Off |
|LEDon|bool|yes|LED state  : ` 1 ` is On, ` 0 ` is Off|
|lastTag|number|no|` ID ` of the last detected tag|
|tagState|bool|no|RFID tag present : ` 1 ` is Present, ` 0 ` is Not Present|
|tag2.protocol|number|no|Protocol info|
|tag2.tag|number|no|ID of current tag|
|tagLoss2.protocol|number|no|Protocol info of last found tag|
|tagLoss2.tag|number|no|ID of last found tag|
|outputs|array|yes|state of the outputs ` 1 ` is On, ` 0 ` is Off |



##Getting Started

Initializing [Phidgets RFID Devices](http://www.phidgets.com/products.php?category=14) can be very easy, here is a basic example to help you get started.

    var Phidget = require('phidgetapi').RFID;

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
