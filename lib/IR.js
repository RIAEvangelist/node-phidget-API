var Phidget=require('./Phidget.js').Phidget;

function IR(){
    var phidget=new Phidget;

    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writable:false,
                value:'PhidgetIR'
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
            observe:{
                enumerable:true,
                writable:false,
                value:observe
            },
            unobserve:{
                enumerable:true,
                writable:false,
                value:unobserve
            },
            readRaw:{
                enumerable:true,
                get:readRaw,
                set:readRaw
            },
            Transmit:{
                enumerable:true,
                get:transmit,
                set:transmit
            }/*,
            PhidgetIRCodeInfo:{
                enumerable:true,
                get:codeInfo,
                set:codeInfo
            }*/
        }
    );

    var board = {
        type: '',
        key: '',
        value: '',
        code: ''
    }

    function readRaw(){
        return board;
    }

    function transmit(changes){

        codeInfo();
        changes=info+changes;
        phidget.set(
            {
                type:'board',
                key: 'Transmit',
                value: changes
            }
        );

        board.Transmit=changes;
        console.log('in transmit()');
        return;
    }

    function codeInfo(){

        info = {
            bitCount:32,
			encoding:1,
			header:[0,0],
			zero:[0,0],
			one:[0,0],
			trail:0,
			gap:0,
			repeat:[],
			minRepeat:0,
			toggleMask:'',
			Length:1,
			carrierFrequency:38000,
			dutyCycle:33
        }

        info=JSON.stringify(info);

        return info;
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

    function observe(callback){
        if(typeof callback != 'function'){
            throw('IR.observe requires a callback function as paramater');
        }

        Object.observe(
            board,
            callback
        );
    }

    function unobserve(callback){
        if(typeof callback != 'function'){
            throw('IR.unobserve requires a callback function as paramater');
        }

        Object.unobserve(
            board,
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
        console.log('in update()');

        board.type=data.type;
        board.key=data.key;
        board.value=data.value;
        board.code=data.Code;
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

exports.Phidget=IR;
