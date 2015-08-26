var Phidget=require('./Phidget.js').Phidget;

function Servo(){
    var phidget=new Phidget;
    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writeable:false,
                value:'PhidgetServo'
            },
            phidget:{
                enumerable:true,
                value:phidget,
                writeable:true
            },
            whenReady:{
                enumerable:true,
                value:ready,
                writeable:false
            },
            observe:{
                enumerable:true,
                writable:false,
                value:observe
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
