#Phidget GPS Sensor

The PhidgetGPS library makes for intutive and lightning fast development without any comprimise. For a quick start into your project see the [Basic GPS example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/GPS.js).  

If you create anything you think others would like, ***Please do a pull request!*** Your rockstar work could help others too. And we would be happy to help you help others!

ToDo : map out module and describe use

##Getting Started

Intializing [Phidgets GPS Devices](http://www.phidgets.com/products.php?product_id=1040) will require 

    var Phidget = require('../phidgeapi.js').GPS;

along with a variable name

    var GPS1 = new Phidget;
    var GPS2 = new Phidget;

##Methods

|method call|parameters|description|
|---|---|---|
|phidget.connect|[__phidget__.params object](#connecting--phidgetparams)|This is the main initialize function.  Params is a JSON array of connection variables consisting of: __date__, __heading__, __velocity__, __altitude__, __latitude__, and __logintude__ respectively.  The phidgetReady event will be dispatched upon connection and initialization success. You may wish to bind other listeners to your __phidget__ inside a listener for this event.|
|phidget.set|[__phidget__.set object](#setting-information-phidgetset)|This method is used to set any output or setable device ( onboard led etc ) on your Phidget. See your __phidget__.data object for possible outputs. Remember this is case sensative so match that case exactly as it is in the __phidget__.data object for your device.
|phidget.quit| This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|phidget.on|"event name", eventHandler| this is how you bind to the phidget devices events.|
