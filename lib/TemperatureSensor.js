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
            ambientTemperature:{
                enumerable: true,
                get: getAmbientTemperature,
                set: getAmbientTemperature
            },
            ambientTemperatureMin:{
                enumerable: true,
                get: getAmbientTemperatureMin,
                set: getAmbientTemperatureMin
            },
            ambientTemperatureMax:{
                enumerable: true,
                get: getAmbientTemperatureMax,
                set: getAmbientTemperatureMax
            },
            temperature:{
                enumerable: true,
                get: getTemperature,
                set: getTemperature
            },
            temperatureMax:{
                enumerable: true,
                get: getTemperatureMax,
                set: getTemperatureMax
            },
            temperatureMin:{
                enumerable: true,
                get: getTemperatureMin,
                set: getTemperatureMin
            },
            potential:{
                enumerable: true,
                get: getPotential,
                set: getPotential
            },
            potentialMin:{
                enumerable: true,
                get: getPotentialMin,
                set: getPotentialMin
            },
            potentialMax:{
                enumerable: true,
                get: getPotentialMax,
                set: getPotentialMax
            },
            thermocoupleType:{
                enumarable: true,
                get: getThermocoupleType,
                set: getThermocoupleType
            },
            observeTemperature:{
                enumerable:true,
                writable:false,
                value:observeTemperature
            },
            unobserveTemperature:{
                enumarable: true,
                writable: false,
                value:unobserveTemperature
            },
            observeAmbientTemperature:{
                enumerable:true,
                writable:false,
                value:observeAmbientTemperature
            },
            unobserveAmbientTemperature:{
                enumarable: true,
                writable: false,
                value: unobserveAmbientTemperature
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

    function setThermocoupleType(changes){
        // phidget.set(
        //     {
        //         type:'ThermocoupleType',
        //         key:i.toString(),
        //         value:board.Outputs[i].toString()
        //     }
        // );
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
        //console.log(temp);
        if(typeof callback != 'function'){
            throw('Requires a callback function as paramater');
        }

        Object.observe(
            temps.temperature,
            callback
        );
    }

    function unobserveTemperature(callback){

        if(typeof callback != 'function'){
            throw('Requires a callback function as paramater');
        }

        Object.unobserve(
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

    function unobserveAmbientTemperature(callback){
        if(typeof callback != 'function'){
            throw('Requires a callback function as paramater');
        }

        Object.unobserve(
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
