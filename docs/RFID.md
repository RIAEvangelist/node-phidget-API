#Phidget RFID Sensor

The PhidgetRFID library makes for intuitive and lightning fast development without any compromise. For a quick start into your RFID project see the [basic RFID example.](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/RFID.js)

ToDo : map out module and describe use

##Getting Started

Initializing [Phidgets RFID Devices](http://www.phidgets.com/products.php?category=14) will require:

    var Phidget = require('phidgetapi.js').RFID;
    
along with a variable name:

    var RFID = new Phidget;
    
##Methods

The below information lists the parameters, events, and give you further information about your Phidgets RFID. For low level development, [see here](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams).

|Method call|Parameters|Description|
|---|---|---|
|phidget.connect|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This is the main initialize function.  Params is a JSON array of connection variables consisting of: __type__, __observeBoard__, __observeOutputs__, __numberOfOutputs__, __antennaOn__, __LEDon__, __lastTag__, __tagState__, __tag2__, __tagLoss2__, and __outputs__ respectively. |
|phidget.observeBoard|'update' |This method is used for asynchronously observing the changes to all the features of the Phidgets RFID. It provides a stream of changes in the order in which they occur.|

##Data

The Phidget RFID object includes the listed below data. JSON.stringify can be used to list the entirety of it or can be individually selected using the keys as follows: 