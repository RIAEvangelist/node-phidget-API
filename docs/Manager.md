#Phidget Manager

The Phidget Manager library makes for an intuitive and easy way to manage your Phigets devices. For a quick start into your Manager project see the [Getting Started](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Manager.md#GettingStarted) section or jump to this [basic Manager example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/manager.js).

##Methods

|Method call|Parameters|Description|
|-----------|----------|-----------|
|[connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)Connects any Phidget USB Device|
|[quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected.|
|observe|function|used for asynchronously observing the changes to any Phidget USB device.|

##Data

|Key|Data Type|Writable|Description|
|---|---------|--------|-----------|
|type|string|no|'PhidgetManager'|

##Getting Started

Initializing and identifying any [Phidget Device](http://www.phidgets.com/) can be very easy, here is a basic example to help you get started.

    var Manager = require('phidgetapi').Manager;

    var manager=new Manager;

    manager.observe(update);

    function update(changes){
        for(var i in changes){
            var change=changes[i];
            //see specific info about each phidget
            //console.log(change);
        }

        //see latest info on all available phidgets
        console.log(manager.devices);
    }

    manager.phidget.connect();
