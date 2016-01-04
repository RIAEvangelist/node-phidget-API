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
        RawSensorValue : [],
        AccelerationMax: [],
        AccelerationMin: [],
        Ratiometric: []
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
                get: getInputs,
                set: getInputs
            },
            acceleration:{
                enumerable: true,
                get: getAcceleration
            },
            velocity:{
                enumerable: true,
                get: getVelocity
            },
            current:{
                enumerable: true,
                get: getCurrent,
                set: getCurrent
            },
            encoderPosition:{
                enumerable: true,
                get: getEncoderPosition
            },
            backEMFSensingState:{
                enumerable: true,
                get: getBackEMFSensingState
            },
            backEMF:{
                enumerable: true,
                get: getBackEMF,
                set: getBackEMF
            },
            braking:{
                enumerable: true,
                get: getBraking
            },
            sensors:{
                enumerable: true,
                get: getSensorValue,
                set: getSensorValue
            },
            rawSensors:{
                enumerable: true,
                get: getRawSensors,
                set: getRawSensors
            },
            ratiometric:{
                enumerable: true,
                get: getRatiometric
            },
            whenReady:{
                enumerable:true,
                writable:false,
                value:ready
            },
            observeAcceleration:{
                enumerable:true,
                writable:false,
                value:observeAcceleration
            },
            unobserveAcceleration:{
                enumerable:true,
                writable:false,
                value:unobserveAcceleration
            },
            observeVelocity:{
                enumerable: true,
                writable: false,
                value: observeVelocity
            },
            unobserveVelocity:{
                enumerable: true,
                writable: false,
                value: unobserveVelocity
            },
            observeBackEMF:{
                enumerable: true,
                writable: false,
                value: observeBackEMF
            },
            unobserveBackEMF:{
                enumerable: true,
                writable: false,
                value: unobserveBackEMF
            },
            observeBraking:{
                enumerable: true,
                writable: false,
                value: observeBraking
            },
            unobserveBraking:{
                enumerable: true,
                writable: false,
                value: unobserveBraking
            },
            observeEncoderPosition:{
                enumerable: true,
                writable: false,
                value: observeEncoderPosition
            },
            unobserveEncoderPosition:{
                enumerable: true,
                writable: false,
                value: unobserveEncoderPosition
            },
            observeSensors:{
                enumerable: true,
                writable: false,
                value: observeSensors
            },
            unobserveSensors:{
                enumerable: true,
                writable: false,
                value: unobserveSensors
            },
            observeRawSensors:{
                enumerable: true,
                writable: false,
                value: observeRawSensors
            },
            unobserveRawSensors:{
                enumerable: true,
                writable: false,
                value: unobserveRawSensors
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
        return Number(phidget.data.board.NumberOfInputs);
    }

    function getMotorCount(){
        return Number(phidget.data.board.NumberOfMotors);
    }

    function getEncoderCount(){
        return Number(phidget.data.board.NumberOfEncoders);
    }

    function getSensorCount(){
        return Number(phidget.data.board.NumberOfSensors);
    }

    function getSupplyVoltage(){
        if(!phidget.data.board.SupplyVoltage){
            var errMessage = phidget.data.board.Error;
            return (errMessage.split('/')[1]);
        }
        return Number(phidget.data.board.SupplyVoltage);
    }

    function getInputs(){
        return board.Inputs;
    }

    function getAcceleration(){
        return board.Acceleration;
    }

    function getVelocity(){
        return board.Velocity;
    }

    function getCurrent(){
        return board.Velocity;
    }

    function getEncoderPosition(){
        return board.EncoderPosition;
    }

    function getBackEMFSensingState(){
        return board.BackEMFSensingState;
    }

    function getBackEMF(){
        return board.BackEMF;
    }

    function getBraking(){
        return board.Braking;
    }

    function getSensorValue(){
        return board.SensorValue;
    }

    function getRawSensors(){
        return board.RawSensorValue;
    }

    function getRatiometric(){
        return Number(phidget.data.board.Ratiometric);
    }

    function observeAcceleration(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.observe(
            board.Acceleration,
            callback
        );
    }

    function unobserveAcceleration(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.unobserve(
            board.Acceleration,
            callback
        );
    }

    function observeVelocity(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.observe(
            board.Velocity,
            callback
        );
    }

    function unobserveVelocity(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.unobserve(
            board.Velocity,
            callback
        );
    }

    function observeVelocity(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.observe(
            board.Velocity,
            callback
        );
    }

    function unobserveVelocity(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.unobserve(
            board.Velocity,
            callback
        );
    }

    function observeBackEMF(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.observe(
            board.BackEMF,
            callback
        );
    }

    function unobserveBackEMF(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.unobserve(
            board.BackEMF,
            callback
        );
    }

    function observeBraking(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.observe(
            board.Braking,
            callback
        );
    }

    function unobserveBraking(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.unobserve(
            board.Braking,
            callback
        );
    }

    function observeEncoderPosition(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.observe(
            board.EncoderPosition,
            callback
        );
    }

    function unobserveEncoderPosition(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.unobserve(
            board.EncoderPosition,
            callback
        );
    }

    function observeSensors(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.observe(
            board.SensorValue,
            callback
        );
    }

    function unobserveSensors(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.unobserve(
            board.SensorValue,
            callback
        );
    }

    function observeRawSensors(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.observe(
            board.RawSensorValue,
            callback
        );
    }

    function unobserveRawSensors(callback){
        if(typeof callback != 'function'){
            throw('MotorControl.observe requires a callback function as paramater');
        }

        Object.unobserve(
            board.RawSensorValue,
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
        //console.log(data);
        switch (data.type) {
            case 'EncoderPositionUpdate':
                //console.log(data.key, data.value);
                board.EncoderPosition[data.key] = data.value;
                break;
            case 'CurrentUpdate':
                board.Current[data.key] = data.value;
                break;
            case 'RawSensor':
                board.RawSensorValue[data.key] = data.value;
                break;
            case 'Sensor':
                board.SensorValue[data.key] = data.value;
                break;
            case 'Velocity':
                board.Velocity[data.key] = data.value;
                break;
            case 'Acceleration':
                board.Acceleration[data.key] = data.value;
                break;
            case 'BackEMF':
                board.BackEMF[data.key] = data.value;
                break;
            case 'Braking':
                board.Braking[data.key] = data.value;
                break;
            case 'BackEMFState':
                board.BackEMFSensingState[data.key] = data.value;
                break;
            default:
                console.log('Unaccounted Data Type :', data);
        }
    }

    phidget.on(
        'phidgetReady',
        function(data){
            if(!phidget.data.board.NumberOfInputs){
                phidget.data.board.InputCount = 0;
            }
            if(!phidget.data.board.NumberOfMotors){
                phidget.data.board.MotorCount = 0;
            }
            if(!phidget.data.board.NumberOfEncoders){
                phidget.data.board.EncoderCount = 0;
            }
            if(!phidget.data.board.NumberOfSensors){
                phidget.data.board.SensorCount = 0;
            }

            for (var i = 0; i < phidget.data.board.NumberOfInputs; i++) {
                if(board.Inputs[i]){
                    continue;
                }
                board.Inputs[i] = 0;
            }

            for (var i = 0; i < phidget.data.board.NumberOfMotors; i++){
                if(board.Current[i]){
                    continue;
                }
                board.Current[i] = 0;
                board.Velocity[i] = 0;
                board.BackEMF[i] = 0;
                board.BackEMFSensingState[i] = 0;
                board.Braking[i] = 0;
                board.Acceleration[i] = 0;
            }

            for (var i = 0; i < phidget.data.board.NumberOfEncoders; i++){
                if(board.EncoderPosition[i]){
                    continue;
                }
                board.EncoderPosition[i] = 0;
            }

            for (var i = 0; i < phidget.data.board.NumberOfSensors ; i++){
                if(board.SensorValue){
                    continue;
                }
                board.SensorValue[i] = 0;
                board.RawSensorValue[i] = 0;
            }

            if(readyHandler){
                readyHandler();
            }
        }
    );

    Object.observe(
        board.Acceleration,
        setAcceleration
    );

    Object.observe(
        board.Velocity,
        setVelocity
    );

    Object.observe(
        board.BackEMFSensingState,
        setBackEMFSensingState
    );

    Object.observe(
        board.Braking,
        setBraking
    );

    Object.observe(
        board.EncoderPosition,
        setEncoderPosition
    );

    Object.observe(
        board.Ratiometric,
        setRatiometric
    );

    function setAcceleration(changes){
        for (var i = 0; i < board.Acceleration.length; i++){
            phidget.set(
                {
                    type: 'Acceleration',
                    key: i.toString(),
                    value: board.Acceleration[i].toString()
                }
            );
        }
    }

    function setVelocity(changes){
        for (var i = 0; i < board.Velocity.length; i++){
            phidget.set(
                {
                    type: 'Velocity',
                    key: i.toString(),
                    value: board.Velocity[i].toString()
                }
            );
        }
    }

    function setBackEMFSensingState(changes){
        for (var i = 0; i < board.BackEMFSensingState.length; i++){
            phidget.set(
                {
                    type: 'BackEMFState',
                    key: i.toString(),
                    value: board.BackEMFSensingState[i].toString()
                }
            );
        }
    }

    function setBraking(changes){
        for (var i = 0; i < board.Braking.length; i++){
            phidget.set(
                {
                    type: 'Braking',
                    key: i.toString(),
                    value: board.Braking[i].toString()
                }
            );
        }
    }

    function setEncoderPosition(changes){
        for (var i = 0; i < board.EncoderPosition.length; i++){
            phidget.set(
                {
                    type: 'EncoderPositionUpdate',
                    key: i.toString(),
                    value: board.EncoderPosition[i].toString()
                }
            );
        }
    }

    function setRatiometric(changes){
        for (var i = 0; i < board.Ratiometric.length; i++){
            phidget.set(
                {
                    type: 'Ratiometric',
                    key: i.toString(),
                    value: board.Ratiometric[i].toString()
                }
            );
        }
    }

    return this;
}

exports.Phidget=PhidgetMotorControl;
