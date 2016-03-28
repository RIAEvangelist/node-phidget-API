'use strict';

const Phidget=require('./Phidget.js').Phidget;

function IR(){
    const phidget=new Phidget;

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

    let board = {
        type: '',
        key: '',
        value: '',
        code: ''
    }

    const bitCount=32;
    const encoding=1;
    const header=[0,0];
    const zero=[0,0];
    const one=[0,0];
    const trail=0;
    const gap=0;
    const repeat=[];
    const minRepeat=0;
    const toggleMask='';
    const Length=1;
    const carrierFrequency=38000;
    const dutyCycle=33;

    const IR_MAX_CODE_BIT_COUNT=128;
    const IR_MAX_CODE_DATA_LENGTH=IR_MAX_CODE_BIT_COUNT/8;
    const IR_MAX_REPEAT_LENGTH=26;

    function readRaw(){
        return board;
    }

    function Transmit(changes){
        codeString();
        changes=codeString+changes;

        phidget.set(
            {
                type:'board',
                key: 'Transmit',
                value: changes
            }
        );

        console.log('In transmit() changes: ' + changes);
        return;
    }

    function codeString(){
        codeString = flipString(bitCount.toString(16));
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

        for(let i=0;i<IR_MAX_REPEAT_LENGTH;i++)
        {
            if(repeat.length > i)
                codeString = codeString + flipString(repeat[i].toString(16));
            else
                codeString = codeString + "00000000";
        }
        codeString = codeString + flipString(minRepeat.toString(16));

        let k = IR_MAX_CODE_DATA_LENGTH*2;
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
        let outStr = '';

        while(str.length < 8)
            str = "0"+str;
        for(let i=str.length-2;i>=0;i-=2)
            outStr = outStr + str.substring(i,i+2);

        return outStr;
    }

    phidget.params={
        type:this.type
    }

    let readyHandler=false;
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
