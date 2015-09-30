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
            thermocoupleType:{
                enumerable: true,
                get: getThermocoupleType
            },
            temperature:{
                enumerable: true,
                get: getTemperature
            },
            temperatureMax:{
                enumerable: true,
                get: getTemperatureMax
            },
            temperatureMin:{
                enumerable: true,
                get: getTemperatureMin
            },
            potential:{
                enumerable: true,
                get: getPotential
            },
            potentialMin:{
                enumerable: true,
                get: getPotentialMin
            },
            PotentialMax:{
                enumerable: true,
                get: getPotentalMax
            },
            temperatureChangeTrigger:{
                enumarable: true,
                get: getTemperatureChangeTrigger
            },
            thermocoupleType:{
                enumarable: true,
                get: getThermocoupleType
            },
            observeBoard:{
                enumerable:true,
                writable:false,
                value:observe
            }
        }
    );

    //ThermocoupleType Group
    function getThermocoupleType(){
        return board.ThermocoupleType;
    }
    //Temperature Group
    function getTemperature(){
        return board.Temperature;
    }

    //TemperatureMax Group
    function getAmbientTemperatureMax(){
        return board.TemperatureMax;
    }
    //TemperatureMin Group
    function getAmbientTemperatureMin(){
        return board.TemperatureMin;
    }
    //Potential Group
    function getPotential(){
        return board.Potential;
    }
    //PotentialMin Group
    function getPotentialMin(){
        return board.PotentialMin;
    }
    //PotentialMax Group
    function getPotentalMax(){
        return board.PotentialMax;
    }
    //TemperatureChangeTrigger Group
    function getTemperatureChangeTrigger(){
        return boad.TemperatureChangeTrigger;
    }

    Object.observe(
        TemperatureChangeTrigger,
        setTemperatureChangeTrigger
    );

    function setTemperatureChangeTrigger(changes){
        for( i = 0; i< changes.length; i++){
            var change = changes[i];
            if(change.type!='update' || change.type == 'length'){
                continue;
            }

            phidget.set(
                {
                    type:'TemperatureChangeTrigger',
                    key: change.name.toString(),
                    value: change.object.[change.name].toString()
                }
            );
        }
    }
    //ThermocoupleType Group
    function getThermocoupleType(){
        return board.ThermocoupleType;
    }

    Object.Observe(
        ThermocoupleType,
        setThermocoupleType
    );

    function setThermocoupleType(changes){
        for(var i = 0; i < changes.length; i++){
            var change = changes[i];
            if (change != 'update' || change.type == 'length'){
                continue;
            }

            phidget.set(
                type:'ThermocoupleType',
                key: change.name.toString(),
                value: change.object.[change.name].toString()
            );
        }
    }
    //Observe Groups

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
            board,
            callback
        );
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

    function update(data){
        if(board[data.type]){
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

    return this;
}

exports.Phidget=TemperatureSensor;
