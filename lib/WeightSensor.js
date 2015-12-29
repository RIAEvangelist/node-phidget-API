var Phidget=require('./Phidget.js').Phidget;

function WeightSensor(){
    var phidget=new Phidget;

    var board = {
        Weight: [],
        WeightChangeTrigger: []
    }

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetWeightSensor'
            },
            phidget:{
                enumerable:true,
                value:phidget,
                writable:true
            },
            weightTrigger:{
                enumerable: true,
                get: getWeightTrigger
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
            observeWeight:{
                enumerable:true,
                writable:false,
                value:observeWeight
            },
            unobserveWeight:{
                enumerable:true,
                writable:false,
                value:unobserveWeight
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

    function observeWeight(callback){
        if(typeof callback != 'function'){
            throw('WeightSensor.observe requires a callback function as paramater');
        }

        Object.observe(
            board.Weight,
            callback
        );
    }

    function unobserveWeight(callback){
        if(typeof callback != 'function'){
            throw('WeightSensor.observe requires a callback function as paramater');
        }

        Object.unobserve(
            board.Weight,
            callback
        );
    }

    function getWeightTrigger(){
        return Number(phidget.data.board.WeightChangeTrigger);
    }

    function setWeightTrigger(changes){
        for (var i = 0; i < board.WeightChangeTrigger.length; i++) {
            phidget.set(
                {
                    type: 'WeightChangeTrigger',
                    key: i.toString(),
                    value: board.WeightChangeTrigger[i].toString
                }
            );
        }
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
            if(readyHandler){
                readyHandler();
            }
        }
    );

    Object.observe(
        board.WeightChangeTrigger,
        setWeightTrigger
    );

    return this;
}

exports.Phidget=PhidgetType;
