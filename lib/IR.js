var Phidget=require('./Phidget.js').Phidget;

function IR(){
    var phidget=new Phidget;

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetIR'
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
                get:readRaw,
                set:readRaw
            },
            transmit:{
                enumerable:true,
                get:transmit,
                set:transmit
            }
        }
    );

    var irdata = {
        type: '',
        key: '',
        value: '',
        code: ''
    }

    function readRaw(){
        return irdata;
    }

    function transmit(changes){
        console.log('in transmit()');
        phidget.set(
            {
                type:'board',
                key: 'Code',
                value: '20df10ef,32,1'
            }
        );
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
            throw('IR.observe requires a callback function as paramater');
        }

        Object.observe(
            irdata,
            callback
        );
    }

    function unobserve(callback){
        if(typeof callback != 'function'){
            throw('IR.unobserve requires a callback function as paramater');
        }

        Object.unobserve(
            irdata,
            callback
        );
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
        console.log('in update()');
        irdata.value=data.value;
        irdata.type=data.type;
        irdata.code=data.Code;
        irdata.key=data.key;
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

exports.Phidget=IR;
