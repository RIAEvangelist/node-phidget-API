var Phidget=require('./Phidget.js').Phidget;

function Spatial(){
    var phidget=new Phidget;
    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetSpatial'
            },
            phidget:{
                enumerable:true,
                value:phidget,
                writable:true
            },
            whenReady:{
                enumerable:true,
                value:ready,
                writable:false
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
            accelerationMin:{
                enumerable:true,
                get:getAccelerationMin
            },
            accelerationMax:{
                enumerable:true,
                get:getAccelerationMax
            },
            angularRateMax:{
                enumerable:true,
                get:getAngularRateMax
            },
            angularRateMin:{
                enumerable:true,
                get:getAngularRateMin
            },
            dataRate:{
                enumerable:true,
                get:getDataRate,
                set:setDataRate
            },
            dataRateMax:{
                enumerable:true,
                get:getDataRateMax
            },
            dataRateMin:{
                enumerable:true,
                get:getDataRateMin
            },
            compassAxisCount:{
                enumerable:true,
                get:getCompassAxisCount
            },
            gyroAxisCount:{
                enumerable:true,
                get:getGyroAxisCount
            },
            accelerationAxisCount:{
                enumerable:true,
                get:getAccelerationAxisCount
            },
            magneticFieldMax:{
                enumerable:true,
                get:getMagneticFieldMax
            },
            magneticFieldMin:{
                enumerable:true,
                get:getMagneticFieldMin
            },
            observeAcceleration:{
                enumerable:true,
                writable:false,
                value:observeAcceleration
            },
            unobserveAcceleration:{
                enumerable: true,
                writable: false,
                value:unobserveAcceleration
            },
            observeGyro:{
                enumerable:true,
                writable:false,
                value:observeAngularRate
            },
            unobserveGyro:{
                enumarable: true,
                writable: false,
                value:unobserveAngularRate
            },
            observeMagneticField:{
                enumerable:true,
                writable:false,
                value:observeMagneticField
            },
            unobserveMagneticField:{
                enumarable:true,
                writable:false,
                value: unobserveMagneticField
            },
            acceleration:{
                enumerable:true,
                get:getAccel
            },
            gyro:{
                enumerable:true,
                get:getAngle
            },
            magneticField:{
                enumerable:true,
                get:getMag
            },
            dataRate:{
                enumerable:true,
                get:getDataRate,
                set:setDataRate
            },
            zeroGyro:{
                enumerable:true,
                writable:false,
                value:zeroGyro
            },
            setCompassCorrectionParameters:{
                enumerable:true,
                writable:false,
                value:setCompassCorrectionParameters
            },
            resetCompassCorrectionParameters:{
                enumerable:true,
                writable:false,
                value:resetCompassCorrectionParameters
            }
        }
    );

    var flip=0;

    var spatialData={
        acceleration:[],
        angularRate:[],
        magneticField:[]
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

    function zeroGyro(){
        flip ^=1;
        phidget.set(
            {
                type:'board',
                key:'ZeroGyro',
                value:flip.toString()
            }
        );
    }

    function setCompassCorrectionParameters(magField, offset0, offset1, offset2, gain0, gain1, gain2, T0, T1, T2, T3, T4, T5){
        var value=Array.prototype.join.call(arguments,',');
        phidget.set(
            {
                type:'board',
                key:'CompassCorrectionParams',
                value:value
            }
        );
    }

    function resetCompassCorrectionParameters(){
        setCompassCorrectionParameters(1,0,0,0,1,1,1,0,0,0,0,0,0);
    }

    function setDataRate(value){
        var rate=Math.round(value); //ints only.
        rate=Math.round(rate/8)*8;
        if(rate<this.dataRateMin){
            rate=this.dataRateMin;
        }
        if(rate<this.dataRateMax){
            rate=this.dataRateMax;
        }

        phidget.set(
            {
                type:'board',
                key:'DataRate',
                value:rate.toString()
            }
        );
    }

    function getAccel(){
        return spatialData.acceleration;
    }

    function getAngle(){
        return spatialData.angularRate;
    }

    function getMag(){
        return spatialData.magneticField;
    }

    function getAccelerationMin(){
        return Number(phidget.data.board.AccelerationMin);
    }

    function getAccelerationMax(){
        return Number(phidget.data.board.AccelerationMax);
    }

    function getAngularRateMax(){
        return Number(phidget.data.board.AngularRateMax);
    }

    function getAngularRateMin(){
        return Number(phidget.data.board.AngularRateMin);
    }

    function getDataRate(){
        return Number(phidget.data.board.DataRate);
    }

    function setDataRate(value){
        phidget.set(
            {
                type:'board',
                key:'DataRate',
                value:value.toString()
            }
        )
    }

    function getDataRateMax(){
        return Number(phidget.data.board.DataRateMax);
    }

    function getDataRateMin(){
        return Number(phidget.data.board.DataRateMin);
    }

    function getCompassAxisCount(){
        return Number(phidget.data.board.CompassAxisCount);
    }

    function getGyroAxisCount(){
        return Number(phidget.data.board.GyroAxisCount);
    }

    function getAccelerationAxisCount(){
        return Number(phidget.data.board.AccelerationAxisCount);
    }

    function getMagneticFieldMax(){
        return Number(phidget.data.board.MagneticFieldMax);
    }

    function getMagneticFieldMin(){
        return Number(phidget.data.board.MagneticFieldMin);
    }

    function observeAcceleration(callback){
        console.log(arguments);
        if(typeof callback != 'function'){
            throw('Spatial.observeAcceleration requires a callback function as paramater');
        }

        Object.observe(
            spatialData.acceleration,
            callback
        );
    }

    function unobserveAcceleration(callback){
        console.log(arguments);
        if(typeof callback != 'function'){
            throw('Spatial.unobserveAcceleration requires a callback function as paramater');
        }

        Object.unobserve(
            spatialData.acceleration,
            callback
        );
    }

    function observeAngularRate(callback){
        console.log(arguments);
        if(typeof callback != 'function'){
            throw('Spatial.observeAngularRate requires a callback function as paramater');
        }

        Object.observe(
            spatialData.angularRate,
            callback
        );
    }

    function unobserveAngularRate(callback){
        console.log(arguments);
        if(typeof callback != 'function'){
            throw('Spatial.unobserveAngularRate requires a callback function as paramater');
        }

        Object.unobserve(
            spatialData.angularRate,
            callback
        );
    }

    function observeMagneticField(callback){
        console.log(arguments);
        if(typeof callback != 'function'){
            throw('Spatial.observeMagneticField requires a callback function as paramater');
        }

        Object.observe(
            spatialData.magneticField,
            callback
        );
    }

    function unobserveMagneticField(callback){
        console.log(arguments);
        if(typeof callback != 'function'){
            throw('Spatial.unobserveMagneticField requires a callback function as paramater');
        }

        Object.unobserve(
            spatialData.magneticField,
            callback
        );
    }

    function update(data){
        if(data.key!='SpatialData'){
            return;
        }

        var data=data.value.split(',');

        spatialData.acceleration[0]=Number(data[0]);
        spatialData.acceleration[1]=Number(data[1]);
        spatialData.acceleration[2]=Number(data[2]);

        spatialData.angularRate[0]=Number(data[3]);
        spatialData.angularRate[1]=Number(data[4]);
        spatialData.angularRate[2]=Number(data[5]);

        spatialData.magneticField[0]=Number(data[6]);
        spatialData.magneticField[1]=Number(data[7]);
        spatialData.magneticField[2]=Number(data[8]);
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

exports.Phidget=Spatial;
