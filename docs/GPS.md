#Phidget GPS Sensor

The PhidgetGPS library makes for intuitive and lightning fast development without any compromise. For a quick start into your project see the [Basic GPS example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/GPS.js).  

ToDo : map out module and describe use

##Getting Started

Initializing[Phidgets GPS Devices](http://www.phidgets.com/products.php?product_id=1040) will require 

    var Phidget = require('phidgeapi.js').GPS;

along with a variable name

    var GPS = new Phidget;

##Methods

The below information lists the parameters, events, and give you further information about your phidgets GPS. For low lever development, [see here](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams).

|Method call|Parameters|Description|
|---|---|---|
|phidget.connect|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This is the main initialize function.  Params is a JSON array of connection variables consisting of: __date__, __heading__, __velocity__, __altitude__, __latitude__, and __logintude__ respectively. |
|phidget.quit|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|phidget.observe|'update'|This calls for the Phidget GPS to be listened to at a maximum frequency of __10Hz__. Any changes to the Phidget are acknowledged and sent to the listeners. |

##Data

The PhidgetGPS object includes the below listed data. JSON.stringify can be used to list the entirety of it or can be individually selected using the keys as follows:


|Key|Data Type|Writable|Description|
|---|---|---|---|
|.type|string|No|This is an identifier, Phidget GPS will always return 'PhidgetGPS'|
|.date|Number|No|This returns the current date under UTC. Subkeys are broken up into __date.full__, __date.year__, __date.month__, __date.day__, __date.hour__, __date.min__, __date.sec__, and __date.ms__. They will return the value which they are respectively named after.|
|.heading|Number|No|This returns current heading Phidget GPS is on.|
|.velocity|Number|No|This returns the current speed Phidget GPS is on with linear velocity units of __km/h__. |
|.alt|Number|No|This returns current altitude Phidget GPS is in with units of __meters__.|
|.lat|Number|No|This returns current latitude Phidget GPS is in.|
|.lon|Number|No|This returns current longitude Phidget GPS is in.|