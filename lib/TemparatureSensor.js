var Phidget=require('./Phidget.js').Phidget;

const PHIDGET_TEMPERATURE_SENSOR_K_TYPE = 1;
const PHIDGET_TEMPERATURE_SENSOR_J_TYPE = 2;
const PHIDGET_TEMPERATURE_SENSOR_E_TYPE = 3;
const PHIDGET_TEMPERATURE_SENSOR_T_TYPE = 4;

function TemperatureSensor(){
    var phidget=new Phidget;

    var board = {
        ThermocoupleType:[],
        Temperature:[],
        TemperatureMin:[],
        TemperatureMax:[],
        Potential:[],
        PotentialMin:[],
        PotentialMax:[],
        TemperatureChangeTrigger:[],
        ThermocoupleType:[]
    }

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetTemperatureSensor'
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
            tempInputCount:{
                enumerable: true,
                writable: false,
                value: getTempInputCount
            },
            ambientTemperature:{
                enumerable: true,
                writable: false,
                value: getAmbientTemperature
            },
            ambientTemperatureMin:{
                enumerable: true,
                writable: false,
                value: getAmbientTemperatureMin
            },
            ambientTemperatureMax:{
                enumerable: true,
                writable: false,
                value: getAmbientTemperatureMax
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
            throw('TemperatureSensor.observe requires a callback function as paramater');
        }

        Object.observe(
            something,
            callback
        );
    }

    function update(data){

    }

    function getTempInputCount(){
        return Number(phidget.data.board.TemperatureInputCount);
    }

    function getAmbientTemperature(){
        return Number(phidget.data.board.AmbientTemperature);
    }

    function getAmbientTemperatureMin(){
        return Number(phidget.data.board.AmbientTemperatureMin);
    }

    function getAmbientTemperatureMax(){
        return Number(phidget.data.board.AmbientTemperatureMax);
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

exports.Phidget=TemperatureSensor;
