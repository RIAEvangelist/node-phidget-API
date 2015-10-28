var Phidget = require('../../../../phidgetapi.js').InterfaceKit;

var IK = new Phidget();

function initializeOutputs(){
    for (var i=0;i<8;i++){
        IK.outputs[i]=0;
    }

}

describe(
    'Phidget Interface Kit spec',
    function(){
        it(
            'Verify Digital Output is writable and change is detected',
            function(done){
                IK.whenReady(initOutputAndChange);
                
                function initOutputAndChange(){
                    initializeOutputs();
                    IK.observeOutputs(turnOnOutputs);
                    IK.outputs[0]=1;
                }
                
                function turnOnOutputs(changes){
                    expect(IK.outputs[0]).toBe(1);
                    IK.unobserveOutputs(turnOnOutputs); //Shutting off the observe feature which sets outputs to 1
                    IK.observeOutputs(turnOffOutputs); // ObserveOutputs methods called to observe the outputs port to observe the change done to set value 0. 
                    IK.outputs[0] = 0;
                }
                
                function turnOffOutputs(changes){
                    expect(IK.outputs[0]).toBe(0);
                    IK.unobserveOutputs(turnOffOutputs);//Shutting off the observe feature which sets outputs to 0
                    done();
                }
                
                IK.connect(
                    {
                        type: 'PhidgetInterfaceKit'
                    }
                );
             }
        );
       

        it(
            'Verify Raw sensor detects value more than 4050',
            function(done){
                console.log('Test for Raw Sensor to measure value more than 4050');
                IK.observeRawSensors(rawSensor);
            
                function rawSensor(changes){
                               
                    if (IK.rawSensors[0] > 4050){   
                        
                        expect(IK.rawSensors[0]).toBeGreaterThan(4050);
                        console.log('Raw Sensor value measured at [0] is: ', IK.rawSensors[0]);
                        IK.unobserveRawSensors(rawSensor);
                        done();
                    }
                }
            
            }
        );
        
        it(
            'Verify Raw sensor detects value 0',
            function(done){
                
                console.log('Test for Raw Sensor to measure value 0');
               
                IK.observeRawSensors(rawSensor);
                
                function rawSensor(changes){
                     if (IK.rawSensors[0] == 0){                       
                        expect(IK.rawSensors[0]).toEqual(0);
                        console.log('Raw Sensor value measured [0] is: ', IK.rawSensors[0]);
                        IK.unobserveRawSensors(rawSensor);
                        done();
                    }
                    
                }
               
            }
            
        );

        it(
            'Verify sensor detects value more than 900',
            function(done){
                console.log('Sensor to measure value more than 900');
           
                IK.observeSensors(sensor);
            
                function sensor(changes){
                     if (IK.sensors[0] > 900){                       
                        expect(IK.sensors[0]).toBeGreaterThan(900);
                        IK.unobserveSensors(sensor);
                        done();
                    }
                   
                }
            
            }
        );
        
        it(
            'Verify sensor detects value 0',
            function(done){
                
                console.log('Sensor to measure value 0');
              
                IK.observeSensors(sensor);
                
                function sensor(changes){
                     if (IK.sensors[0] < 10) {
                        expect(IK.sensors[0]).toBeLessThan(10);
                        IK.unobserveSensors(sensor);
                        done();
                    }
                   
                }
               
            }
            
        );
      
        
        it(
            'Verify change in digital input is detected',
            function(done){
                console.log('Digital Input test.'); //Connect one end of wire to gnd of port 0 and other end to the other port to trigger the change at input[0]
                
                IK.observeInputs(inputs);
                
                function inputs(changes){
                    if(IK.inputs[0]==1)
                        expect(IK.inputs[0]).toBe(1);
                        IK.unobserveInputs(inputs);
                        done();
                }

            }
        );
         
        
       it(
            'Verify "triggers" data key can be modified',
            function(done){
                
                var initSensorValueMeasured,
                    laterSensorValueMeasured;
                
                // Saving initial values of trigger[0] and sensors[0]
                var initTriggers = IK.triggers[0];
                    initSensorValueMeasured = IK.sensors[0];
                    console.log('Sensor value initial: ', initSensorValueMeasured);
                

                modifyAndVerifyTrigger();
                captureChangedSensor();
                
                //Modifying trigger value
                function modifyAndVerifyTrigger(){
                   
                    IK.triggers[0]=15;
                    expect(IK.triggers[0]).toEqual(15);
                    console.log('Values after trigerring:');
                }
                
                // Observe sensor values obtained from the sensor[0] after the modified trigger settings value
                function captureChangedSensor(){
                    
                    IK.observeSensors(triggerSensorWithChangedValue);
                    function triggerSensorWithChangedValue(changes){
                        laterSensorValueMeasured = IK.sensors[0];
                        console.log('Sensor value after: ', laterSensorValueMeasured);
                        IK.unobserveSensors(triggerSensorWithChangedValue); // To shut observing further changing sensor values.
                        verifyAndRestoreTrigger();
                    }

                }
                 
                // Verifying last captured sensor value after modifying trigger setting and restoring trigger settings to its inital settings.
                function verifyAndRestoreTrigger(){
                    expect(laterSensorValueMeasured).toBeGreaterThan(initSensorValueMeasured+IK.triggers[0]);
                    
                    IK.triggers[0]= initTriggers;
                    expect(IK.triggers[0]).toEqual(initTriggers);
                    
                    done();
                }
            }   
       );
   
        
      
        it(
            'Verify "ratiometric" data key can be modified',
            function(done){
                
                var initRatiometric = IK.ratiometric;
                
                IK.ratiometric = 0; 
                expect(IK.ratiometric).toBe(0);
                                
                IK.ratiometric= initRatiometric;
                expect(IK.ratiometric).toBe(initRatiometric);
                done();
            
            }
        
        );
       
        
         it(
            'Verify "dataRate" data key can be modified',
            function(done){
                
                var start=0;
                var end=0;
                var initdataRates = IK.dataRates[0];
                
                // Modify
                IK.dataRates[0] = 1000; // modifying acquition rate to 1000ms.
                console.log('Value of modified dataRate data is: ',IK.dataRates[0]);
                expect(IK.dataRates[0]).toEqual(1000);
                
                console.log('Keep rotating the dial of the sensor.');
                IK.observeSensors(sensors);

                // Observe sensor method used with start and end timestamps. Any change in the sensor reading will trigger the reading of timestamps.
                function sensors(changes){
                    console.log('Sensor value is:', IK.sensors[0]);
                    
                    if(!start){
                        
                        start = new Date().getTime();
                        return;
                    }
                    end = new Date().getTime();
                    
                    IK.unobserveSensors(sensors);
                    verifyAndRestoreDataRates();
                    done();
                }
                
                
                // Restore back the initial DataRates value and verify the acquisition time is within the set value.
                function verifyAndRestoreDataRates(){
                    IK.dataRates[0]= initdataRates;
                    expect(IK.dataRates[0]).toBe(initdataRates);
                                      
                    console.log('Data aquisition time is ', end-start,'ms');
                    expect(end-start).toBeLessThan(1010);
                    expect(end-start).toBeGreaterThan(990);
                
                }
                
            }
        
        );
       
        
    }
)

