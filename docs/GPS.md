#Phidget GPS Sensor

[Basic GPS example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/GPS.js)

ToDo : map out module and describe use

##Mathods

|method call|parameters|description|
|---|---|---|
|phidget.connect|[__phidget__.params object](#connecting--phidgetparams)|This is the main initialize function.  Params is a JSON array of connection variables                   (date, heading, velocity, altitude, latitude, and logintude) .  The phidgetReady event will be dispatched upon connection and initialization success. You may wish to bind other listeners to your __phidget__ inside a listener for this event.|
|phidget.set|[__phidget__.set object](#setting-information-phidgetset)|This method is used to set any output or setable device ( onboard led etc ) on your Phidget. See your __phidget__.data object for possible outputs. Remember this is case sensative so match that case exactly as it is in the __phidget__.data object for your device.
|phidget.quit| This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|phidget.on|"event name", eventHandler| this is how you bind to the phidget devices events.|
