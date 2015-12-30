var Phidget=require('./Phidget.js').Phidget;

function PhidgetMotorControl(){
    var phidget=new Phidget;

    var board = {
        Inputs : [],
        Acceleration : [],
        Velocity : [],
        Current : [],
        EncoderPosition : [],
        BackEMFSensingState: [],
        BackEMF : [],
        Braking : [],
        SensorValue: [],
        RawSensorValue : []

    }

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetMotorControl'
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
            accelerationMax:{
                enumerable: true,
                get: getAccelerationMax,
                set: getAccelerationMax
            },
            accelerationMin:{
                enumerable: true,
                get: getAccelerationMin,
                set: getAccelerationMin
            },
            inputCount:{
                enumerable: true,
                get: getInputCount,
                set: getInputCount
            },
            motorCount:{
                enumerable: true,
                get: getMotorCount,
                set: getMotorCount
            },
            encoderCount:{
                enumerable: true,
                get: getEncoderCount,
                set: getEncoderCount
            },
            sensorCount:{
                enumerable: true,
                get: getSensorCount,
                set: getSensorCount
            },
            supplyVoltage:{
                enumerable: true,
                get: getSupplyVoltage,
                set: getSupplyVoltage
            },
            inputs:{
                enumerable: true,
                get: getInputs
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

    function getAccelerationMax(){
        return Number(phidget.data.board.AccelerationMax);
    }

    function getAccelerationMin(){
        return Number(phidget.data.board.AccelerationMin);
    }

    function getInputCount(){
        return Number(phidget.data.board.InputCount);
    }

    function getMotorCount(){
        return Number(phidget.data.board.MotorCount);
    }

    function getEncoderCount(){
        return Number(phidget.data.board.EncoderCount);
    }

    function getSensorCount(){
        return Number(phidget.data.board.SensorCount);
    }

    function getSupplyVoltage(){
        return Number(phidget.data.board.SupplyVoltage);
    }

    function getInputs(){
        return board.Inputs;
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
            if(!phidget.data.board.InputCount){
                phidget.data.board.InputCount = 0;
            }
            if(!phidget.data.board.MotorCount){
                phidget.data.board.MotorCount = 0;
            }
            if(!phidget.data.board.EncoderCount){
                phidget.data.board.EncoderCount = 0;
            }

            for (var i = 0; i < phidget.data.board.InputCount; i++) {
                if(board.Inputs[i]){
                    continue;
                }
                board.Inputs[i] = 0;
            }

            for (var i = 0; i < phidget.data.board.MotorCount; i++){
                if(board.Current[i]){
                    continue;
                }
                board.Current[i] = [0];
            }

            for (var i = 0; i < phidget.data.board.MotorCount; i++){
                if(board.BackEMF[i]){
                    continue;
                }
                board.BackEMF[i] = [0];
            }

            if(readyHandler){
                readyHandler();
            }
        }
    );

    return this;
}

exports.Phidget=PhidgetMotorControl;
