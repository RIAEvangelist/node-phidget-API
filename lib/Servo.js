var Phidget=require('./Phidget.js').Phidget;

function RFID(){
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

    function observe(callback){
        if(typeof callback != 'function'){
            throw('RFID.observe requires a callback function as paramater');
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

    return this;
}

exports.InterfaceKit=InterfaceKit;
