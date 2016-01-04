var Phidget=require('./Phidget.js').Phidget;

function Analog(){
    var phidget=new Phidget;

    var board = {
        Voltage: [],
        Enabled: []
    };

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
            voltage:{
                enumerable: true,
                get: getVoltage
            },
            enabled:{
                enumerable: true,
                get: getEnabled
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
            },
            observeVoltage:{
                enumerable: true,
                writble: false,
                value: observeVoltage
            },
            unobserveVoltage:{
                enumerable: true,
                writble: false,
                value: unobserveVoltage
            },
            observeEnabled:{
                enumerable: true,
                writble: false,
                value: observeEnabled
            },
            unobserveEnabled:{
                enumerable: true,
                writble: false,
                value: unobserveEnabled
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

    function setVoltage(changes){
        for (var i = 0; i < board.Voltage.length; i++) {
            phidget.set(
                {
                    type: 'Voltage',
                    key: i.toString(),
                    value: board.Voltage[i].toString()
                }
            );
        }
    }

    function getVoltage(){
        return board.Voltage;
    }

    function setEnabled(changes){
        for (var i = 0; i < board.Enabled.length; i++) {
            phidget.set(
                {
                    type: 'Enabled',
                    key: i.toString(),
                    value: board.Enabled[i].toString()
                }
            );
        }
    }

    function getEnabled(){
        return board.Enabled;
    }

    function observeVoltage(callback){
        if(typeof callback != 'function'){
            throw('Analog.observeVoltage requires a callback function as paramater');
        }

        Object.observe(
            board.Voltage,
            callback
        );
    }

    function unobserveVoltage(callback){
        if(typeof callback != 'function'){
            throw('Analog.unobserveVoltage requires a callback function as paramater');
        }

        Object.unobserve(
            board.Voltage,
            callback
        );
    }

    function observeEnabled(callback){
        if(typeof callback != 'function'){
            throw('Analog.observeEnabled requires a callback function as paramater');
        }

        Object.observe(
            board.Enabled,
            callback
        );
    }

    function unobserveEnabled(callback){
        if(typeof callback != 'function'){
            throw('Analog.unobserveEnabled requires a callback function as paramater');
        }

        Object.unobserve(
            board.Enabled,
            callback
        );
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
        if(!board[data.type]){
            return;
        }

        board[data.type][Number(data.key)] = Number(data.value);
    }


    phidget.on(
        'phidgetReady',
        function(data){
            for (var i = 0; i < phidget.data.board.NumberOfOutputs; i++) {
                board.Voltage[i] = 0;
                board.Enabled[i] = 0;
            }

            if(readyHandler){
                readyHandler();
            }
        }
    );

    Object.observe(
        board.Voltage,
        setVoltage
    );

    Object.observe(
        board.Enabled,
        setEnabled
    );

    return this;
}

exports.Phidget=Analog;
