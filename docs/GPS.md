#Phidget GPS Sensor

The PhidgetGPS library makes for intutive and lightning fast development without any comprimise. For a quick start into your project see the [Basic GPS example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/GPS.js).  

ToDo : map out module and describe use

##Getting Started

Intializing [Phidgets GPS Devices](http://www.phidgets.com/products.php?product_id=1040) will require 

    var Phidget = require('phidgeapi.js').GPS;

along with a variable name

    var GPS = new Phidget;

##Methods

The below information lists the parameters, events, and give you further information about your phidgets GPS. For low lever development, [see here](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams).

|Method call|Parameters|Description|
|---|---|---|
|phidget.connect|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This is the main initialize function.  Params is a JSON array of connection variables consisting of: __date__, __heading__, __velocity__, __altitude__, __latitude__, and __logintude__ respectively. |
|phidget.quit|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|phidget.on|"event name", eventHandler| This is how you bind to the phidget devices events.|

##Events

|Event name| Paramaters| Description |
|---|---|---|
|phidgetReady|N/A|The phidget is attached and fully initialized|
|error|{ message:String, type:String  }|emitted whenever a phidget may have an error, or when it can not handle your request|
|changed|__phidget__.event|Emitted whenever a phidget or sensor has data which has changed.|
|attached or added|__phidget__.data|Phidget attached|
|detached or removed|__phidget__.data|Phidget attached|
|log|String or Err|When rawLog set to true this event will be fired as data comes over the raw phidget socket.|
|disconnected|N/A| The phidget socket was closed or lost|

##Data

|Data Type|Key|Description|
|---|---|---|
|phidgetReady|N/A|the phidget is attached and fully initialized|
|error|{ message:String, type:String  }|emitted whenever a phidget may have an error, or when it can not handle your request|
|changed|__phidget__.event|emitted whenever a phidget or sensor has data which has changed.|
|attached or added|__phidget__.data|phidget attached|
|detached or removed|__phidget__.data|phidget attached|
|log|String or Err|when rawLog set to true this event will be fired as data comes over the raw phidget socket.|
|disconnected|N/A| the phidget socket was closed or lost|