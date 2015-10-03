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
                get: getAmbientTemperature
            },
            ambientTemperatureMin:{
                enumerable: true,
                get: getAmbientTemperatureMin
            },
            ambientTemperatureMax:{
                enumerable: true,
                get: getAmbientTemperatureMax
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

    //ThermocoupleType Group
    function getThermocoupleType(){
        return phidget.data.ThermocoupleType;
    }
    //Temperature Group
    function getTemperature(){
        return temps.temperature;
    }

    //TemperatureMax Group
    function getAmbientTemperature(){
        return temps.ambientTemp;
    }

    function getTemperatureMax(){
        return phidget.data.TemperatureMax;
    }
    //TemperatureMin Group
    function getAmbientTemperatureMin(){
        return phidget.data.board.AmbientTemperatureMin;
    }

    function getAmbientTemperatureMax(){
        return phidget.data.board.AmbientTemperatureMax;
    }

    function getTemperatureMin(){
        return phidget.data.TemperatureMin;
    }
    //Potential Group
    function getPotential(){
        return phidget.data.Potential;
    }
    //PotentialMin Group
    function getPotentialMin(){
        return phidget.data.board.PotentialMin;
    }
    //PotentialMax Group
    function getPotentalMax(){
        return phidget.data.board.PotentialMax;
    }
    //TemperatureChangeTrigger Group
    function getTemperatureChangeTrigger(){
        return phidget.data.TemperatureChangeTrigger;
    }

    function setTemperatureChangeTrigger (changes){ // fix after done with board
        // phidget.set(
        //     {
        //         type:'TemperatureChangeTrigger',
        //         key:i.toString(),
        //         value:board.Outputs[i].toString()
        //     }
        // );
    }
    //ThermocoupleType Group
    function getThermocoupleType(){
        return phidget.data.ThermocoupleType;
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
