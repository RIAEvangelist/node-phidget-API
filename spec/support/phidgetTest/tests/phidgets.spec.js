var Phidget = require('../../../../phidgetapi.js').Phidget;

describe(
    'Phidget spec',
    function(){
        var phidgetCore = new Phidget();
        console.log('label ',phidgetCore.label);

        it(
            'Verifies phidget data when phidget is ready',
            function(done){

                console.log('in phi test');

                phidgetCore.on(
                   'log',
                   giveLog
                )

                phidgetCore.on(
                    'attached',
                    checkAttachDevice
                );

                phidgetCore.on(
                    'phidgetReady',
                    phidgetIsReady
                );

                phidgetCore.on(
                    'error',
                    errorHandler
                );

                phidgetCore.on(
                    'connected',
                    checkConnect
                );

                phidgetCore.on(
                    'data',
                    function(data){
                        console.log('this is data yayayayayay',data);
                    }
                );


                function checkAttachDevice(data){
                    console.log('yeah im attached',data);
                    expect(data.Status).toBe('Attached');
                    expect(data.value).toBe('Attached');
                }

                function checkConnect(){
                    console.log('I am connected');
                    phidgetCore.removeListener(
                        'connected',
                        checkConnect
                    );
                }

                function giveLog(data){
                    expect(data).toBeDefined();
                }

                function errorHandler(err){
                    phidgetCore.removeListener(
                        'error',
                        errorHandler
                    );
                    expect(err).toBe(false);
                    done();
                }

                function phidgetIsReady(){
                    console.log('Phidget is ready to be tested');
                    testCase(phidgetCore.data);
                 }

                function testCase(){
                    phidgetCore.removeListener(
                        'attached',
                        checkAttachDevice
                    );

                    phidgetCore.removeListener(
                        'phidgetReady',
                        phidgetIsReady
                    );
                    expect(Number(phidgetCore.data.serial.length)).toBeGreaterThan(0);
                    expect(phidgetCore.data.board).toBeDefined();
                    done();
                }

                phidgetCore.connect(
                    {
                        type: 'PhidgetInterfaceKit',
                        rawLog: true
                    }
                );
            }
        );

         it(
            'Verifies the label event',
            function(done){

                phidgetCore.on(
                    'changed',
                    testCaseLabel
                );

                phidgetCore.on(
                    'error',
                    errorHandler
                );
                console.log('this is the label for phidget', phidgetCore.Label);

                var label = phidgetCore.Label;

                phidgetCore.Label = '44rdt';

                function errorHandler(err){
                     phidgetCore.removeListener(
                        'error',
                        errorHandler
                    );
                    expect(err).toBe(false);
                    done();
                }

                function testCaseLabel(){

                    phidgetCore.removeListener(
                        'changed',
                        testCaseLabel
                    );
                    console.log(phidgetCore.Label);

                    expect(phidgetCore.Label).toBe('44rdt');
                    phidgetCore.Label = label;
                    console.log('ending before')
                    done();
                }

//                 expect(phidgetCore.Label).toBe('44rdt');
//                done();
            }
        );

        it(
            'Verifies the rate event',
            function(done){
                phidgetCore.on(
                    'error',
                    errorHandler
                );

                phidgetCore.on(
                    'changed',
                    testCaseRate
                );

                var rate = phidgetCore.rate;

                phidgetCore.rate = 4;

                function errorHandler(err){
                    phidgetCore.removeListener(
                        'error',
                        errorHandler
                    );
                    expect(err).toBe(false);
                    done();
                }

                function testCaseRate(){
                    phidgetCore.removeListener(
                        'changed',
                        testCaseRate
                    );

                    expect(phidgetCore.rate).toBe(4);//rate rounds
                    phidgetCore.rate = rate;
                    console.log('ending before')
                    done();
                }
            }
        );

        it(
            'Verifies Set function and changed event',
            function(done){
                console.log(phidgetCore.data);

                var orignalOutputValue = '0';
                var changedValue = '1';

                expect(phidgetCore.data.Output[0]).toBe(orignalOutputValue);

                if(phidgetCore.data.Output[0]!==orignalOutputValue){
                    done();
                }

                phidgetCore.on(
                    'error',
                    errorHandler
                );

                phidgetCore.on(
                    'changed',
                    testCase
                );


                function errorHandler(err){
                    phidgetCore.removeListener(
                        'error',
                        errorHandler
                    );
                    expect(err).toBe(false);
                    done();
                }

                phidgetCore.set(
                    {
                        type : 'Output',
                        key : '0',
                        value : changedValue
                    }
                );

                function testCase(){
                    if(!phidgetCore.data.Output){
                        console.log('no output, waiting...');
                    }
                    phidgetCore.removeListener(
                        'changed',
                        testCase
                    );

                    expect(Number(phidgetCore.data.Output[0])).toBe(Number(changedValue));

                    setTimeout(
                        function(){
                            phidgetCore.on(
                                'changed',
                                testChangedValue
                            );
                            phidgetCore.set(
                                {
                                    type : 'Output',
                                    key : '0',
                                    value : orignalOutputValue
                                }
                            );
                        },
                        phidgetCore.rate*10
                    );
                }

                function testChangedValue(){
                    if(!phidgetCore.data.Output){
                        console.log('no output, waiting...');
                    }
                    phidgetCore.removeListener(
                        'changed',
                        testChangedValue
                    );
                    phidgetCore.removeListener(
                        'error',
                        errorHandler
                    );
                    expect(Number(phidgetCore.data.Output[0])).toBe(Number(orignalOutputValue));
                    done();
                }
            }
        );

//        it(
//            'Verifies log event',
//            function(done){
//               phidgetCore.on(
//                   'log',
//                   giveLog
//               )
//               function giveLog(data, err){
//                    console.log('In Log ',data, err);
//                    done();
//               }
//            }
//        );

        it(
            'Verifies Phidget detached event',
            function(done){
                console.log('in Detach test');
                phidgetCore.on(
                    'error',
                    errorHandler
                );

                phidgetCore.on(
                    'detached',
                    checkDetachDevice
                );

                function errorHandler(err){
                    phidgetCore.removeListener(
                        'error',
                        errorHandler
                    );
                    expect(err).toBe(false);
                    done();
                }

                function checkDetachDevice(data){
                    phidgetCore.removeListener(
                        'detached',
                        checkDetachDevice
                    );

                    console.log('in detach test');
                    expect(data.Status).toBe('Detached');
                    expect(data.value).toBe('Detached');
                    console.log(data);
                    done();
                }
            }
        );

        it(
            'Verifies the disconnected event and quit function',
            function(done){

                phidgetCore.on(
                    'error',
                    errorHandler
                );

                phidgetCore.on(
                    'disconnected',
                    checkDisconnectedDevice
                );

                function errorHandler(err){
                    phidgetCore.removeListener(
                        'error',
                        errorHandler
                    );
                    expect(err).toBe(false);
                    done();
                }

                function checkDisconnectedDevice(){

                    phidgetCore.removeListener(
                        'disconnected',
                        checkDisconnectedDevice
                    );
                    console.log('In Disconnected');
                    console.log(phidgetCore.data);
                    done();
                }
                phidgetCore.quit();

            }
        );
    }
)

describe(
    'it works',
    function(){
        it(
            'should work',
            function(){
                console.log('hello');
                expect(1+2).toBe(3);
            }
        );
    }
)
