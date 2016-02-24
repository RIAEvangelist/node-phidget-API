var Phidget=require('./Phidget.js').Phidget;

function IR(){
    var phidget=new Phidget;

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetIR' // this needs to match exactly to the phidget name
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
            unobserve:{
                enumerable:true,
                writable:false,
                value:unobserve
            },
            readRaw:{
                enumerable:true,
                writable:false,
                value:readRaw
            },
            transmitRaw:{
                enumerable:true,
                get:transmitRaw,
                set:transmitRaw
            },
            transmit:{
                enumerable:true,
                get:transmit,
                set:transmit
            }
            /*
            transmitRepeat:{
                enumerable:true,
                get:transmitRepeat,
                set:transmitRepeat
            },
            lastCode:{
                enumerable:true,
                writable:false,
                value:lastCode
            }*/
        }
    );

    function readRaw(){
        return phidget.data.board.Code;
    }

    function transmitRaw(){
        return IR.transmitRaw;
    }

    function transmit(){
        return IR.transmit;
    }

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
            throw('Something.observe requires a callback function as paramater');
        }

        Object.observe(
            something,
            callback
        );
    }

    function unobserve(callback){
        if(typeof callback != 'function'){
            throw('Something.observe requires a callback function as paramater');
        }

        Object.unobserve(
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

exports.Phidget=IR;
