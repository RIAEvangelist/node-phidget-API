var Phidget=require('./Phidget.js').Phidget;

function InterfaceKit(){
    var phidget=new Phidget;
    var board={
        Output:[],
        Input:[],
        Sensor:[]
    }

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writeable:false,
                value:'PhidgetInterfaceKit'
            },
            phidget:{
                enumerable:true,
                value:phidget,
                writeable:true
            },
            outputs:{
                enumerable:true,
                writeable:true,
                value:board.Output
            },
            inputs:{
                enumerable:true,
                get:getInputs
            },
            sensors:{
                enumerable:true,
                get:getSensors
            },
            observeInputs:{
                enumerable:true,
                writable:false,
                value:observeOutputs
            },
            observeOutputs:{
                enumerable:true,
                writable:false,
                value:observeOutputs
            },
            observeSensors:{
                enumerable:true,
                writable:false,
                value:observeOutputs
            }
        }
    );

    phidget.params={
        type:this.type
    }

    Object.observe(board.Output,setOutput);

    function setOutput(changes){
        console.log(changes);
    }

    function getInputs(){
        return board.Input;
    }

    function getSensors(){
        return board.Sensor;
    }

    function observeOutputs(callback){
        if(typeof callback != 'function'){
            throw('InterfaceKit.observe requires a callback function as paramater');
        }

        /*
        Object.observe(
            something,
            callback
        );
        */
    }

    function update(data){
        board[data.type][data.key]=Number(data.value);
        console.log('changed',data,board);
    }

    phidget.on(
        'log',
        function(data){
            //log it?
            //console.log('log ',data);
        }
    );

    phidget.on(
        'error',
        function(data){
            //throw it?
            //console.log('error ',data);
        }
    );

    phidget.on(
        'changed',
        update
    );

    phidget.on(
        'phidgetReady',
        function(data){
            //console.log('ready',phidget.data.board);

        }
    );

    return this;
}

exports.Phidget=InterfaceKit;
