# Phidget IR
The PhidgetIR library makes for intuitive and lightning fast development without any compromise. For a quick start into your IR project see this [Basic IR Example](https://github.com/RIAEvangelist/node-phidget-API/blob/master/examples/IR.js)

## Methods
| Method call | Parameters | Description |
|-------------|------------|-------------|
|[connect](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|[__phidget__.params object](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#connecting--phidgetparams)|Connects the Phidget IR|
|[quit](https://github.com/RIAEvangelist/node-phidget-API/blob/master/docs/Phidget.md#methods)|N/A |This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. |
|whenReady|function|This executes a function when the Phidgets IR is ready to be used. __If you set intervals on this event, you MUST clear them on the detach event! Otherwise, you could set multiple instances of the same interval if a Phidget is detached and re attached__|
| observe | change handler function | Used for asynchronously observing the changes to the PhidgetIR board. |


## Data
| Key | Data Type | Writable | Description |
|-----|-----------|----------|-------------|
| type | string | no | 'PhidgetIR' |
| readRaw |  | no | Raw IR data |
| transmit |  | yes | Transmit IR code |

## Getting Started
Initializing [Phidget IR Devices](http://www.phidgets.com/products.php?product_id=1055_0) can be very easy, here is a basic example to help you get started.
```javascript

```
