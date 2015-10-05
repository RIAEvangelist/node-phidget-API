var Phidget=require('./Phidget.js').Phidget;

const PHIDGET_TEMPERATURE_SENSOR_K_TYPE = 1;
const PHIDGET_TEMPERATURE_SENSOR_J_TYPE = 2;
const PHIDGET_TEMPERATURE_SENSOR_E_TYPE = 3;
const PHIDGET_TEMPERATURE_SENSOR_T_TYPE = 4;

function TemperatureSensor(){
    var phidget=new Phidget;

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetTemperature'
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
            ambientTemperature:{ // working
                enumerable: true,
                get: getAmbientTemperature,
                set: getAmbientTemperature
            },
            ambientTemperatureMin:{ //working
                enumerable: true,
                get: getAmbientTemperatureMin,
                set: getAmbientTemperatureMin
            },
            ambientTemperatureMax:{//working
                enumerable: true,
                get: getAmbientTemperatureMax,
                set: getAmbientTemperatureMax
            },
            temperature:{ // working
                enumerable: true,
                get: getTemperature,
                set: getTemperature
            },
            temperatureMax:{ //working
                enumerable: true,
                get: getTemperatureMax,
                set: getTemperatureMax
            },
            temperatureMin:{ //working
                enumerable: true,
                get: getTemperatureMin,
                set: getTemperatureMin
            },
            potential:{ //working
                enumerable: true,
                get: getPotential,
                set: getPotential
            },
            potentialMin:{ //working
                enumerable: true,
                get: getPotentialMin,
                set: getPotentialMin
            },
            potentialMax:{ //working
                enumerable: true,
                get: getPotentialMax,
                set: getPotentialMax
            },
            thermocoupleType:{ //workings
                enumarable: true,
                get: getThermocoupleType,
                set: getThermocoupleType
            },
            observeTemperature:{
                enumerable:true,
                writable:false,
                value:observeTemperature
            },
            observeAmbientTemperature:{
                enumerable:true,
                writable:false,
                value:observeAmbientTemperature
            }
        }
    );

    var temps={
        temperature:[],
        ambientTemp:0
    };

    function getThermocoupleType(){
        return phidget.data.ThermocoupleType;
    }

    function getTemperature(){
        return temps.temperature;
    }

    function getAmbientTemperature(){
        return temps.ambientTemp;
    }

    function getTemperatureMax(){
        var tempMaxs=[];
        for(var i in phidget.data.TemperatureMax){
            tempMaxs.push(
                Number(phidget.data.TemperatureMax[i])
            );
        }
        return tempMaxs;
    }

    function getTemperatureMin(){
        var tempMins=[];
        for(var i in phidget.data.TemperatureMin){
            tempMins.push(
                Number(phidget.data.TemperatureMin[i])
            );
        }
        return tempMins;
    }

    function getAmbientTemperatureMin(){
        return Number(phidget.data.board.AmbientTemperatureMin);
    }

    function getAmbientTemperatureMax(){
        return Number(phidget.data.board.AmbientTemperatureMax);
    }

    function getPotential(){
        var pot=[];
        for(var i in phidget.data.Potential){
            pot.push(
                Number(phidget.data.Potential[i])
            );
        }
        return pot;
    }

    function getPotentialMin(){
        var potMin;
        potMin = Number(phidget.data.board.PotentialMin);
        return potMin;
    }

    function getPotentialMax(){
        var potMax;
        potMax = Number(phidget.data.board.PotentialMax);
        return potMax;
    }

    function getThermocoupleType(){
        var type=[];
        for(var i in phidget.data.ThermocoupleType){
            type.push(
                Number(phidget.data.ThermocoupleType[i])
            );
        }
        return type;
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

    function observeTemperature(callback){
        if(typeof callback != 'function'){
            throw('Requires a callback function as paramater');
        }

        Object.observe(
            temps.temperature,
            callback
        );
    }

    function observeAmbientTemperature(callback){
        if(typeof callback != 'function'){
            throw('Requires a callback function as paramater');
        }

        Object.observe(
            temps,
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
        try{
            for(var i in phidget.data.Temperature){
                temps.temperature[i]=Number(phidget.data.Temperature[i]);
            }
            for(var i in phidget.data.board.AmbientTemperature){
                temps.ambientTemp=Number(phidget.data.board.AmbientTemperature);
            }
        }catch(err){
            //probably doesn't exist yet
        }
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
