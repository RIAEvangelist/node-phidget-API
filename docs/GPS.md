#Phidget GPS Sensor

The PhidgetGPS library makes for intutive and lightning fast development without any comprimise. For a quick start into your project see the [Basic GPS example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/GPS.js).  

ToDo : map out module and describe use

##Getting Started

Intializing [Phidgets GPS Devices](http://www.phidgets.com/products.php?product_id=1040) will require 

    var Phidget = require('phidgeapi.js').GPS;

along with a variable name

    var GPS = new Phidget;

##Methods

You can use the below information to create low level or custom Phidget Modules. If you create anything you think others would like, ***Please do a pull request!*** Your rockstar work could help others too. And we would be happy to help you help others!

|method call|parameters|description|
|---|---|---|
|phidget.connect|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This is the main initialize function.  Params is a JSON array of connection variables consisting of: __date__, __heading__, __velocity__, __altitude__, __latitude__, and __logintude__ respectively. |
|phidget.set|[__phidget__.set object](#setting-information-phidgetset)|This method is used to set any output or setable device ( onboard led etc ) on your Phidget. See your __phidget__.data object for possible outputs. Remember this is case sensative so match that case exactly as it is in the __phidget__.data object for your device.
|phidget.quit| This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|phidget.on|"event name", eventHandler| this is how you bind to the phidget devices events.|
