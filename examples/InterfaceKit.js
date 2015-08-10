var Phidget = require('../phidgetapi').InterfaceKit;

var IK=new Phidget;

IK.phidget.connect();


IK.observeOutputs(outputs);

function outputs(changes){
   //console.log(changes)  
}

IK.phidget.on(
    'phidgetReady',
    setOutput
)

function setOutput(){
    IK.outputs[0]=1;
    //console.log(IK.outputs)
}