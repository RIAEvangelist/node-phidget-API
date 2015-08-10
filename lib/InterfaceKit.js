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
                get:getOutputs
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
    
    function getOutputs(){
        return board.Output;
    }
    
    function setOutputs(changes){
        for(var i=0; i<changes.length; i++){
            var change=changes[i];
            if(change.type!='update' || change.name=='length'){
                continue;
            }
            
            console.log('Output',
                change.name.toString(),
                change.object[change.name].toString())
            
            phidget.set(
                'Output',
                change.name.toString(),
                change.object[change.name].toString()
            )
        }
        console.log(board.Output);
    }
    
    
    Object.observe(
        board.Output,
        setOutputs
    );
    
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

        
        Object.observe(
            board.Output,
            callback
        );
    }

    function update(data){
        board[data.type][Number(data.key)]=Number(data.value);
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