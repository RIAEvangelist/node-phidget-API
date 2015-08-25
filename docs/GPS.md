#Phidget GPS Sensor

The PhidgetGPS library makes for intuitive and lightning fast development without any compromise. For a quick start into your GPS project see the [basic GPS example.](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/GPS.js).  


##Getting Started

Initializing [Phidgets GPS Devices](http://www.phidgets.com/products.php?category=5) will require:

    var Phidget = require('phidgeapi.js').GPS;

along with a variable name:

    var GPS = new Phidget;

##Methods

The below information lists the parameters, events, and give you further information about your phidgets GPS. For low level development, [see here](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams).

|Method call|Parameters|Description|
|---|---|---|
|phidget.connect|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects the Phidgets GPS |
|phidget.quit|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|phidget.observe|'update'|This method is used for asynchronously observing the changes to the PhidgetGPS. It provides a stream of changes in the order in which they occur at maximum __10Hz__. |

##Data

The PhidgetGPS object includes the below listed data. JSON.stringify can be used to list the entirety of it or can be individually selected using the keys as follows:


|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|This is an identifier, Phidget GPS will always return 'PhidgetGPS'|
|date|number|no|This returns the current date under UTC. Subkeys are broken up into __date.full__, __date.year__, __date.month__, __date.day__, __date.hour__, __date.min__, __date.sec__, and __date.ms__. They will return the value which they are respectively named after.|
|date.timeOffset|number|no|This returns the time offset from the computer or embedded system the Phidget GPS is attached to. |
|heading|number|no|This returns current heading Phidget GPS is on.|
|velocity|number|no|This returns the current speed Phidget GPS is on with linear velocity units of __km/h__. |
|alt|number|no|This returns current altitude Phidget GPS is in with units of __meters__.|
|lat|number|no|This returns current latitude Phidget GPS is in.|
|lon|number|no|This returns current longitude Phidget GPS is in.|
|fixed|bool|no|This true if the GPS location has been fully determined by the Phidgets GPS.|