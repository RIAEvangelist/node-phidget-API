var Phidget=require('./Phidget.js').Phidget;

function InterfaceKit(){
    var phidget=new Phidget;
    var board={
        Output:[],
        Input:[],
        Sensor:[],
        RawSensor:[],
        Trigger:[],
        DataRate:[]
    }

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetInterfaceKit'
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
            dataRateMax:{
                enumerable:false,
                get:getDataRateMax
            },
            dataRateMin:{
                enumerable:false,
                get:getDataRateMin
            },
            ratiometric:{
                enumerable:true,
                get:getRatiometric,
                set:setRatiometric
            },
            outputs:{
                enumerable:true,
                get:getOutputs
            },
            inputs:{
                enumerable:true,
                get:getInputs
            },
            sensors:{
                enumerable:true,
                get:getSensors
            },
            triggers:{
                enumerable:true,
                get:getTriggers
            },
            dataRates:{
                enumerable:true,
                get:getDataRates
            },
            rawSensors:{
                enumerable:true,
                get:getRawSensors
            },
            observeInputs:{
                enumerable:true,
                writable:false,
                value:observeInputs
            },
            unobserveInputs:{
                enumerable: true,
                writable: false,
                value: unobserveInputs
            },
            observeOutputs:{
                enumerable:true,
                writable:false,
                value:observeOutputs
            },
            unobserveOutputs:{
                enumarable: true,
                writble: false,
                value: unobserveOutputs
            },
            observeSensors:{
                enumerable:true,
                writable:false,
                value:observeSensors
            },
            unobserveSensors:{
                enumarable: true,
                writable: false,
                value:unobserveSensors
            },
            observeRawSensors:{
                enumerable:true,
                writable:false,
                value:observeRawSensors
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

    function getRatiometric(){
        return phidget.data.board.Ratiometric;
    }

    function getDataRateMax(){
        return phidget.data.board.DataRateMax;
    }

    function getDataRateMin(){
        return phidget.data.board.DataRateMin;
    }

    function setRatiometric(value){
        if(!phidget.data.board.Ratiometric){
            return;
        }

        phidget.set(
            {
                type:'board',
                key:'Ratiometric',
                value:value.toString()
            }
        );
    }

    function getOutputs(){
        return board.Output;
    }

    function setOutputs(changes){
        for(var i=0; i<board.Output.length; i++){
            phidget.set(
                {
                    type:'Output',
                    key:i.toString(),
                    value:board.Output[i].toString()
                }
            );
        }
    }

    function setDataRate(changes){
        for(var i=0; i<changes.length; i++){
            var change=changes[i];
            if(change.type!='update' || change.name=='length'){
                continue;
            }

            var rate=Math.round(change.object[change.name]); //ints only.
            rate=Math.round(rate/8)*8;
            if(rate<this.dataRateMin){
                rate=this.dataRateMin;
            }
            if(rate<this.dataRateMax){
                rate=this.dataRateMax;
            }

            phidget.set(
                {
                    type:'DataRate',
                    key:change.name.toString(),
                    value:rate.toString()
                }
            );
        }
    }

    function setTrigger(changes){
        for(var i=0; i<changes.length; i++){
            var change=changes[i];
            if(change.type!='update' || change.name=='length'){
                continue;
            }

            phidget.set(
                {
                    type:'Trigger',
                    key:change.name.toString(),
                    value:change.object[change.name].toString()
                }
            );
        }
    }


    Object.observe(
        board.Output,
        setOutputs
    );

    Object.observe(
        board.Trigger,
        setTrigger
    );

    Object.observe(
        board.DataRate,
        setDataRate
    );

    function getDataRates(){
        return board.DataRate;
    }

    function getTriggers(){
        return board.Trigger;
    }

    function getInputs(){
        return board.Input;
    }

    function getSensors(){
        return board.Sensor;
    }

    function getRawSensors(){
        return board.RawSensor;
    }

    function observeOutputs(callback){
        if(typeof callback != 'function'){
            throw('InterfaceKit.observeOutputs requires a callback function as paramater');
        }


        Object.observe(
            board.Output,
            callback
        );
    }

    function unobserveOutputs(callback){
        if(typeof callback != 'function'){
            throw('InterfaceKit.unobserveOutputs requires a callback function as paramater');
        }


        Object.unobserve(
            board.Output,
            callback
        );
    }

    function observeInputs(callback){
        if(typeof callback != 'function'){
            throw('InterfaceKit.observeInputs requires a callback function as paramater');
        }


        Object.observe(
            board.Input,
            callback
        );
    }

    function unobserveInputs(callback){
        if(typeof callback != 'function'){
            throw('InterfaceKit.unobserveInputs requires a callback function as paramater');
        }
        
        Object.unobserve(
            board.Input,
            callback
        );
    }

    function observeSensors(callback){
        if(typeof callback != 'function'){
            throw('InterfaceKit.observeSensors requires a callback function as paramater');
        }


        Object.observe(
            board.Sensor,
            callback
        );
    }

    function unobserveSensors(callback){
        if(typeof callback != 'function'){
            throw('InterfaceKit.unobserveSensors requires a callback function as paramater');
        }


        Object.unobserve(
            board.Sensor,
            callback
        );
    }

    function observeRawSensors(callback){
        if(typeof callback != 'function'){
            throw('InterfaceKit.observeRawSensors requires a callback function as paramater');
        }


        Object.observe(
            board.RawSensor,
            callback
        );
    }

    function unobserveRawSensors(callback){
        if(typeof callback != 'function'){
            throw('InterfaceKit.unobserveRawSensors requires a callback function as paramater');
        }


        Object.unobserve(
            board.RawSensor,
            callback
        );
    }

    function update(data){
        if(!board[data.type]){
            return;
        }
        board[data.type][Number(data.key)]=Number(data.value);
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
        function(){
            if(!phidget.data.board.NumberOfInputs){
                phidget.data.board.NumberOfInputs=0;
            }
            if(!phidget.data.board.NumberOfSensors){
                phidget.data.board.NumberOfSensors=0;
            }
            if(!phidget.data.board.NumberOfOutputs){
                phidget.data.board.NumberOfOutputs=0;
            }

            for(var i=0;i<phidget.data.board.NumberOfInputs;i++){
                if(board.Input[i]){
                    continue;
                }

                board.Input[i]=0;
            }

            for(var i=0;i<phidget.data.board.NumberOfSensors;i++){
                if(!board.Sensor[i]){
                    board.Sensor[i]=0;
                }

                if(!board.RawSensor[i]){
                    board.RawSensor[i]=0;
                }
            }

            for(var i=0;i<phidget.data.board.NumberOfOutputs;i++){
                if(board.Output[i]){
                    continue;
                }

                board.Output[i]=0;
            }

            if(phidget.data.Trigger){
                for(var i in phidget.data.Trigger){
                    board.Trigger[Number(i)]=Number(phidget.data.Trigger[i]);
                }
            }

            if(phidget.data.DataRate){
                for(var i in phidget.data.DataRate){
                    board.DataRate[Number(i)]=Number(phidget.data.DataRate[i]);
                }
            }

            if(readyHandler){
                readyHandler();
            }
        }
    );

    return this;
}

exports.Phidget=InterfaceKit;
