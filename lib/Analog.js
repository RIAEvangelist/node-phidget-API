var Phidget=require('./Phidget.js').Phidget;

function Analog(){
    var phidget=new Phidget;
    var enabled = [];
    var voltage = [];
    var voltageMin = [];
    var voltageMax = [];

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
                get:getNumberOfOutputs
            },
            voltageMaxLimit:{
                enumerable:true,
                get:getVoltageMax
            },
            voltageMinLimit:{
                enumerable:true,
                get:getVoltageMin
            },
            voltage:{
                enumerable:true,
                writable: true,
                set:setVoltage
            },
            enabled:{
                enumerable:true,
                writable: true,
                set:setEnabled
            }


        }
    );

    phidget.params={
        type:this.type
    }

    Object.observe(
        voltage,
        setVoltage
    )

    Object.observe(
        enabled,
        setEnabled
    )

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
            throw('Analog.observe requires a callback function as paramater');
        }

        Object.observe(
            board,
            callback
        );
    }

    function update(data){
         switch(data.type){
            case 'Enabled' :
                enabled[Number(data.key)]=Number(data.value);
                break;
            case 'Voltage' :
                voltage[Number(data.key)]=Number(data.value);
                break;
        }
    }

    function getNumberOfOutputs(){
        return Number(phidget.data.board.NumberOfOutputs);
    }

    function setVoltage(changes){
        for(var i in changes){
            var change=changes[i];
            for(var i=0; i<changes.length; i++){
                var change=changes[i];
                if(change.type!='update' || change.name=='length'){
                    continue;
                }

                phidget.set(
                    {
                        type:'voltage',
                        key:change.name.toString(),
                        value:change.object[change.name].toString()
                    }
                );
            }
        }
    }

    function getVoltageMax(){
        return Number(phidget.data.board.VoltageMaxLimit);
    }

    function getVoltageMin(){
        return Number(phidget.data.board.VoltageMinLimit);
    }

    function setEnabled(changes){
        for(var i in changes){
            var change=changes[i];
            for(var i=0; i<changes.length; i++){
                var change=changes[i];
                if(change.type!='update' || change.name=='length'){
                    continue;
                }

                phidget.set(
                    {
                        type:'Enabled',
                        key:change.name.toString(),
                        value:change.object[change.name].toString()
                    }
                );
            }
        }
    }

    phidget.on(
        'log',
        function(data){
            //console.log('log ',data);
        }
    );

    phidget.on(
        'error',
        function(data){
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

            if(phidget.data.board.NumberOfOutputs){
                for(var i=0; i<phidget.data.board.NumberOfOutputs; i++){
                    if(Output[i]){
                        continue;
                    }

                    Output[i]=0;
                }
            }

            if(readyHandler){
                readyHandler();
            }
        }
    );

    return this;
}

exports.Phidget=Analog;
