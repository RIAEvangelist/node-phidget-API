#Phidget InterfaceKit Boards

The PhidgetInterfaceKit library makes for intuitive and lightning fast development without any compromise to any [Phidget InterfaceBoard](http://www.phidgets.com/products.php?category=0). For accurate use, see the [analog](http://www.phidgets.com/docs/Analog_Input_Primer), [digital input](http://www.phidgets.com/docs/Digital_Input_Primer), and [digital output](http://www.phidgets.com/docs/Digital_Output_Primer) primers. For a quick start into your InterfaceKit project, see this [basic InterfaceKit example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/InterfaceKit.js).

##Methods

|Method call|Parameters|Description|
|---|---|---|
|[phidget.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the Phidget RFID|
|[phidget.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected.|
|whenReady|function|This executes a function when the Phidget InterfaceKit is ready to be used.|
|observeOutputs|outputs|Used for asynchronously observing the digital output changes to the Phidget InterfaceKit board. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|
|observeInputs|inputs|Used for asynchronously observing the digital input changes to the Phidget InterfaceKit board. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|
|observeSensors|sensors|Used for asynchronously observing the analog input changes with an A to D digitalization of 2<sup>10</sup> to the Phidget InterfaceKit board. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|
|observeRawSensors|rawSensors|Used for asynchronously observing the analog input changes with an A to D digitalization of 2<sup>12</sup> to the Phidget InterfaceKit board. This behaves much like the JS [Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe), however you only pass the handler, not the object or accept list. All of this is handled by the Phidget Framework.|

#Data

|Key|Data Type|Writable|Description|
|---|---|---|---|
|type|string|no|'PhidgetInterfaceKit'|
|dataRateMax|number|no|Maximum data rate in samples per second|
|dataRateMin|number|no|Minimum data rate in samples per second|
|dataRate|number|yes|The number of times data is acquired per second|
|ratiometric|bool|yes| __True__ = configures the Analog Inputs to measure relative to VCC (nominal 5V), __False__ = configures the Analog Inputs to measure relative to an internal precision 5V reference|
|outputs|array|yes|Outputs of the InterfaceKit|
|inputs|array|no|Digital inputs of the InterfaceKit|
|sensors|array|no|Analog inputs of the InterfaceKit with 2<sup>10</sup> digitalization|
|rawSensors|array|no|Analog inputs of the InterfaceKit with 2<sup>12</sup> digitalization|
