#Phidget Manager

The Phidget Manager library makes for an intuitive and easy way to manage your Phigets devices. For a quick start into your Manager project see the [Getting Started](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Manager.md#GettingStarted) section or jump to this [basic Manager example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/manager.js).

##Methods

|Method call|Parameters|Description|
|---|---|---|
|[phidget.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|This connects any Phidget USB Device|
|[phidget.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected.|
|observe|function|used for asynchronously observing the changes to the any Phidget USB device. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|

##Data

|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|'PhidgetManager'|

