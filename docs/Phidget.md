## Core Phidget Module Interaction

The PhidgetsAPI package exposes a few different ways of interacting with your Phidgets. You can use the below information to create low level or custom Phidget Modules. If you create anything you think others would like, ***Please do a pull request!*** Your rockstar work could help others too. And we would be happy to help you help others!

### Events

Once connected, the phidgets object will throw a few types of  events: 

|Event Name|Description|
|-|-|-|
|phidgetReady|the Phidget has been initialized and the basic data map has been created. No arguments passed.|
|error|there was an error ( go figure ). error data will be passed through from the board, or the API.|
|disconnected|the Phidget is no longer being listened to.|
|changed|some data value has been changed/update/modified on or via a Phidget|
|added|a new data key value pair has been added to the Phidget's data scope. Or if using the PhidgetManager type, a new phidget has been attached to the webservice for the first time during the current programs session.|
|attached|PhidgetManager type only, a phidget device has been attached|
|detached|PhidgetManager type only, a phidget device has been detached|

__it is possible that as new Phidgets are created there may be more events, however, the event dispatching method should be future proofed, and thus may emit events not described here.__ If you notice this, please feel free to edit this doc. Much Love!

### Methods

|method call|parameters|description|
|-|-|-|
|phidget.connect|[__phidget__.data object]()|This is the main initialize function.  Params is a JSON array of connection variables.  The phidgetReady event will be dispatched upon connection and initialization success. You may wish to bind other listeners to your __phidget__ inside a listener for this event.|
|phidgets.set|[__phidget__.data object]()|This method is used to set any output or setable device ( onboard led etc ) on your Phidget. See your __phidget__.data object for possible outputs. The paramaters required for this method are as follows and remember JS is case sensative so math that case exactly as it is in the __phidget__.data object.
__phidgets.quit()__ This method requests a disconnect from the phidget board.  The disconnected event will be dispatched when the connection has been successfully disconnected. 

## Connecting & Configuration Params
`phidgets.connect` can be passed an a JSON object of options.  Here are the options and their defaults:

	{
		host    : 'localhost',
		port    : 5001,
		version : '1.0.10', //older phidgetwebservice installs may require 1.0.9
		password: null,
		type    : 'PhidgetManager',
		boardID : 123456, //optional - used to connect to multiple boards of the same type
		rawLog  : false
	}

__Note on `version`__: version in this case is the version of the phidget server and associated API.  You should check your phidget server to learn the version in use.  The good news is that the APIs we are using here have not changed for the past 3 years, and appear to be unlikely to do so in the future.  If you run into errors with newer versions, let me know.

## phidget.data
|key|description|
|-|-|
|type|the key for the object your output resides ( maybe 'board', 'Output', 'Trigger' etc. check the phidget.data to see what options are available for the specific phidget you are working with )|
|key|the key of the output you wish to set|
|value|the value you wish to set|


## Example For Phidget Interface Kit 8/8/8

	var phidget = require('phidgetapi').phidget;
    
    var IK888=new phidget();
    
    IK888.on(
        "error", 
        function(data){
            console.log('error ',data);
        }
    );

    IK888.on(
        'phidgetReady',
        function(){
            console.log('IK888 phidget ready');
            console.log(IK888.data);

            IK888.set(
                {
                    type:'Output',
                    key:'0',
                    value:'1'
                }
            );

            IK888.on(
                'changed', 
                update
            );
        }
    );

    var update=function(data){
        console.log('phidget state changed');
        console.log('data ',data);

        if(data.type=='Sensor'){
            IK888.set(
                {
                    type:'Output',
                    key:'0',
                    value:'1'
                }
            );
            setTimeout(
                function(){
                    phidget.set(
                        {
                            type:'Output',
                            key:'0',
                            value:'0'
                        }
                    );
                },
                200
            );
        }
    }

    /*
    * Connect to Phidget 
    */
    IK888.connect(
        {
            type    : 'PhidgetInterfaceKit'
        }
    );

The above example will show you the available Sensors, Inputs and Outputs as well as the Triggers ( amount of change required in sensor value for a change event to be fired ) for the Phidgets Interface Kit 8/8/8. It will also cause an LED connected the Output 0 and G to flash red for 200 milliseconds upon a change in any sensor data.