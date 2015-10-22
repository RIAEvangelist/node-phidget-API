var Phidget=require('./Phidget.js').Phidget;

function Manager(){
    var phidget=new Phidget;
    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetManager'
            },
            devices:{
                enumerable:true,
                get:devices
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
            phidget:{
                enumerable:true,
                value:phidget,
                writable:true
            },
            observe:{
                enumerable:true,
                writable:false,
                value:observe
            },
            unobserve:{
                enumerable: true,
                writable: false,
                value: unobserve
            }
        }
    );

    phidget.params={
        type:this.type
    }

    function devices(){
        return phidget.data;
    }

    function observe(callback){
        if(typeof callback != 'function'){
            throw('Manager.observe requires a callback function as paramater');
        }

        Object.observe(
            phidget.data,
            newPhidgetTypeDetected.bind(callback)
        );
    }

    function unobserve(callback){
        if(typeof callback != 'function'){
            throw('Manager.unobserve requires a callback function as paramater');
        }

        Object.unobserve(
            phidget.data,
            newPhidgetTypeDetected.bind(callback)
        );
    }

    function newPhidgetTypeDetected(changes){
        for (var i in changes){
            if(changes[i].type == 'add'){
                this([changes[i]]);
                Object.observe(
                    phidget.data[
                        changes[i].name
                    ],
                    this
                );
            }
        }
    }

    function attached(data){
        //great
    }

    function detached(data){
        phidget.data[data.type][data.serial]= data;
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
        'added',
        attached
    );

    phidget.on(
        'attached',
        attached
    );

    phidget.on(
        'detached',
        detached
    );

    phidget.on(
        'removed',
        detached
    );

    return this;
}

exports.Manager=Manager;
