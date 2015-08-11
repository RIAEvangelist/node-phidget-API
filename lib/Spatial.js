var Phidget=require('./Phidget.js').Phidget;

function Spatial(){
    var phidget=new Phidget;
    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writeable:false,
                value:'PhidgetSpatial'
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
            }
        }
    );

    var spacialData={
        acceleration:[],
        angularRate:[],
        magneticField:[]
    }

    phidget.params={
        type:this.type
    }

    var board={};

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

    function observe(callback){
        if(typeof callback != 'function'){
            throw('Spatial.observe requires a callback function as paramater');
        }

        Object.observe(
            board,
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
            //console.log('ready',data)

        }
    );

    return this;
}

exports.Phidget=Spatial;
