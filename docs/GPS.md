#Phidget GPS

The PhidgetGPS library makes for intuitive and lightning fast development without any compromise. For a quick start into your GPS project see the [Basic GPS example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/GPS.js).

##Methods

|Method call|Parameters|Description|
|-----------|----------|-----------|
|[connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the Phidgets GPS |
|[quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the Phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|whenReady|change handler function|This executes a function when the Phidgets GPS is ready to be used. __If you set intervals on this event, you MUST clear them on the detach event! Otherwise, you could set multiple instances of the same interval if a Phidget is detached and re attached__|
|observe|change handler function|Used for asynchronously observing the changes to the PhidgetGPS position.|
|unobserve|change handler function|Stops observing from the specified observe's change handler function.|

##Data

|Key|Data Type|Writable|Description|
|---|---------|--------|-----------|
|type|string|no|'PhidgetGPS'|
|date.systemOffset|number|no|offset in milliseconds between system current time and the Phidget GPS timestamp |
|date.timestamp|timestamp|no|traditional milliseconds from epoch timestamp|
|date.full|String|no|full local date and time|
|date.year|number|no|year|
|date.month|number|no|month|
|date.day|number|no|day|
|date.hour|number|no|hour|
|date.min|number|no|minute|
|date.sec|number|no|second|
|date.ms|number|no|millisecond|
|heading|number|no|heading|
|velocity|number|no|speed in km/h |
|alt|number|no|altitude in meters|
|lat|number|no|latitude|
|lon|number|no|longitude|
|fixed|bool|no|true if the Phidget GPS has gotten a fix on its location|

##Getting Started

Initializing [Phidgets GPS Devices](http://www.phidgets.com/products.php?category=5) can be very easy, here is a basic example to help you get started.

    var Phidget = require('phidgetapi').GPS;

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
    GPS.connect();
