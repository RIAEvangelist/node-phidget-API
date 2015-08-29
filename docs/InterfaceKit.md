#Phidget InterfaceKit Boards

The PhidgetInterfaceKit library makes for intuitive and lightning fast development without any compromise to any [Phidget InterfaceBoard](http://www.phidgets.com/products.php?category=0). For accurate use, see the [analog](http://www.phidgets.com/docs/Analog_Input_Primer), [digital input](http://www.phidgets.com/docs/Digital_Input_Primer), and [digital output](http://www.phidgets.com/docs/Digital_Output_Primer) primers. For a quick start into your InterfaceKit project, see this [basic InterfaceKit example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/InterfaceKit.js).

##Methods

|Method call|Parameters|Description|
|---|---|---|
|[phidget.connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the Phidget RFID|
|[phidget.quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |