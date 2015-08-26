#Phidget GPS Sensor

The PhidgetGPS library makes for intuitive and lightning fast development without any compromise. For a quick start into your GPS project see the [Basic Manager example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/GPS.js).
##Methods

|Method call|Parameters|Description|
|---|---|---|
<<<<<<< HEAD
|[phidget.connect](https://github.com/MaybeRex/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the Phidgets GPS |
|[phidget.quit](https://github.com/MaybeRex/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
=======
|[phidget.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the Phidgets GPS |
|[phidget.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|whenReady|function|This executes a function when the Phidgets GPS is ready to be used.|
>>>>>>> upstream/master
|observe|function|used for asynchronously observing the changes to the PhidgetGPS position. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|

##Data

|Key|Data Type|Writable|Description|
|---|---|---|---|
<<<<<<< HEAD
|type|string|no|This is an identifier, Phidget GPS will always return 'PhidgetGPS'|
|date.systemOffset|number|no|offset in milliseconds between system current time and the PhidgetGPS timestamp |
=======
|type|string|no|'PhidgetGPS'|
|date.systemOffset|number|no|offset in milliseconds between system current time and the Phidget GPS timestamp |
>>>>>>> upstream/master
|date.timestamp|timestamp|no|traditional milliseconds from epoch timestamp|
|date.full|String|no|full local date and time|
|date.year|number|no|year|
|date.month|number|no|month|
|date.day|number|no|day|
|date.hour|number|no|hour|
|date.min|number|no|minute|
|date.sec|number|no|second|
|date.ms|number|no|millisecond|
|heading|number|no|heading Phidget GPS is on.|
|velocity|number|no|speed in __km/h__ |
|alt|number|no|altitude Phidget GPS is in with units of __meters__|
|lat|number|no|latitude|
|lon|number|no|longitude|
|fixed|bool|no|true if the Phidget GPS has gotten a fix on its location|

##Getting Started

Initializing [Phidgets GPS Devices](http://www.phidgets.com/products.php?category=5) can be very easy, here is a basic example to help you get started. 

    var Phidget = require('phidgetapi.js').GPS;

    var GPS=new Phidget;

    GPS.observe(update);

    function update(changes){
        for(var i in changes){
            var change=changes[i];
            //see specific info about each change
            //console.log(change);
        }

        //see updated GPS data after all changes
        //console.log(changes[changes.length-1].object);

        //Or just the info you care about
        console.log(GPS.lat,GPS.lon);
    }

    /*
    // to see raw phidget transfer, helpful when trying to debug
    GPS.phidget.params.rawLog=true;
    GPS.phidget.on(
        'log',
        function(data){
            console.log(data)
        }
    );
    */

    /*
     * Connect to phidget 
     */
    GPS.phidget.connect();