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
            },
            observe:{
                enumerable:true,
                writable:false,
                value:observe
            },
            numberOfOutputs:{
                enumerable:true,
                get:outputCount
            },
            voltageMaxLimit:{
                enumerable:true,
                get:getVoltageMax
            },
            voltageMaxLimit:{
                enumerable:true,
                get:getVoltageMin
            },
            voltage:{
                enumerable:true,
                get:getVoltage
                set:setVoltage
            },
            enabled:{
                enumerable:true,
                get:getEnabled
                set:setEnabled
            }


        }
    );

    phidget.params={
        type:this.type
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

    function observe(callback){
        if(typeof callback != 'function'){
            throw('Servo.observe requires a callback function as paramater');
        }

        Object.observe(
            something,
            callback
        );
    }

    function update(data){

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


            if(readyHandler){
                readyHandler();
            }
        }
    );

    return this;
}

exports.Phidget=Servo;
