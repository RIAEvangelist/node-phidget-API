var Phidget=require('./Phidget.js').Phidget;

function Analog(){
    var phidget=new Phidget;

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetAnalog'
            },
            phidget:{
                enumerable:true,
                value:phidget,
                writable:true
            },
            voltageMax:{
                enumerable: true,
                get: getVoltageMax,
                set: getVoltageMax
            },
            voltageMin:{
                enumerable: true,
                get: getVoltageMin,
                set: getVoltageMin
            },
            numberOfOutputs:{
                enumerable: true,
                get: getNumberOfOutputs,
                set: getNumberOfOutputs
            },
            connect:{
                enumerable:true,
                writable: false,
                value: phidget.connect.bind(phidget)
            },
            quit:{
                enumerable: true,
                writable: false,
                value: phidget.quit.bind(phidget)
            },
            whenReady:{
                enumerable:true,
                value:ready,
                writable:false
            }
        }
    );

    phidget.params={
        type:this.type
    }

    function getVoltageMax(){
        return Number(phidget.data.board.VoltageMax);
    }

    function getVoltageMin(){
        return Number(phidget.data.board.VoltageMin);
    }

    function getNumberOfOutputs(){
        return Number(phidget.data.board.NumberOfOutputs);
    }

    var readyHandler=false;
    function ready(handler){
        if(!handler){
            return;
        }

        if(typeof handler!='function'){
            return;
        }

        readyHandler=handler;
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

    function update(data){

    }


    phidget.on(
        'phidgetReady',
        function(data){

            if(readyHandler){
                readyHandler();
            }
        }
    );

    return this;
}

exports.Phidget=Analog;
