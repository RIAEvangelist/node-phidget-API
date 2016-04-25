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
            transmit:{
                enumerable:true,
                get:Transmit,
                set:Transmit
            }
        }
    );

    var board={
        type: '',
        key: '',
        value: '',
        code: ''
    };

    var bitCount=32;
    var encoding=1;
    var header=[0,0];
    var zero=[0,0];
    var one=[0,0];
    var trail=0;
    var gap=0;
    var repeat=[];
    var minRepeat=0;
    var toggleMask='';
    var Length=1;
    var carrierFrequency=38000;
    var dutyCycle=33;

    var IR_MAX_CODE_BIT_COUNT=128;
    var IR_MAX_CODE_DATA_LENGTH=IR_MAX_CODE_BIT_COUNT/8;
    var IR_MAX_REPEAT_LENGTH=26;

    function readRaw(){
        return board;
    }

    function Transmit(changes){
        //changes = codeString() + changes;
        phidget.set(
            {
                type:'board',
                key: 'Transmit',
                value: '200000000200000002000000e4a4010034020000502300009e110000340200009d060000340200004202000050230000cf0800003402000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000709400003200000020df10ef'
            }
        );
        console.log('In Transmit()');

        return;
    }

    function codeString(){
        var codeString = flipString(bitCount.toString(16));
        codeString = codeString + flipString(encoding.toString(16));
        codeString = codeString + flipString(Length.toString(16));
        codeString = codeString + flipString(gap.toString(16));
        codeString = codeString + flipString(trail.toString(16));
        codeString = codeString + flipString(header[0].toString(16));
        codeString = codeString + flipString(header[1].toString(16));
        codeString = codeString + flipString(one[0].toString(16));
        codeString = codeString + flipString(one[1].toString(16));
        codeString = codeString + flipString(zero[0].toString(16));
        codeString = codeString + flipString(zero[1].toString(16));

        for(var i=0;i<IR_MAX_REPEAT_LENGTH;i++)
        {
            if(repeat.length > i)
                codeString = codeString + flipString(repeat[i].toString(16));
            else
                codeString = codeString + "00000000";
        }
        codeString = codeString + flipString(minRepeat.toString(16));

        var k = IR_MAX_CODE_DATA_LENGTH*2;
        while(toggleMask.length < k--)
        {
            codeString = codeString + "0";
        }
        codeString = codeString + toggleMask;

        codeString = codeString + flipString(carrierFrequency.toString(16));
        codeString = codeString + flipString(dutyCycle.toString(16));

        return codeString;
    }

    function flipString(str){
        var outStr = '';

        while(str.length < 8)
            str = "0"+str;
        for(var i = str.length-2; i >= 0; i-=2)
            outStr = outStr + str.substring(i,i+2);

        return outStr;
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
