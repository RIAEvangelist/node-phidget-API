var Phidget = require('../../../../phidgetapi.js').Phidget;

describe(
    'Phidget spec',
    function(){
        var interfaceKit = new Phidget();

        it(
            'Verifies phidget data when phidget is ready',
            function(done){

                console.log('in phi test');

                interfaceKit.on(
                    'attached',
                    checkAttachDevice
                );

                interfaceKit.on(
                    'phidgetReady',
                    phidgetIsReady
                );

                interfaceKit.on(
                    'error',
                    errorHandler
                );

                interfaceKit.on(
                    'connected',
                    checkConnect
                );

                interfaceKit.on(
                    'data',
                    function(data){
                        console.log(data);
                    }
                );


                function checkAttachDevice(data){
                    console.log('fuck yeah im attached',data);
                }

                function checkConnect(){
                    console.log('I am connected');
                    interfaceKit.removeListener(
                        'connected',
                        checkConnect
                    );
                }

                function errorHandler(err){
                    expect(err).toBe(false);
                    done();
                }

                function phidgetIsReady(){
                    console.log('Phidget is ready to be tested');
                    testCase(interfaceKit.data);
                 }

                function testCase(){
                    interfaceKit.removeListener(
                        'attached',
                        checkAttachDevice
                    );

                    interfaceKit.removeListener(
                        'phidgetReady',
                        phidgetIsReady
                    );

                    interfaceKit.removeListener(
                        'error',
                        errorHandler
                    );
                    expect(Number(interfaceKit.data.serial.length)).toBeGreaterThan(0);
                    expect(interfaceKit.data.board).toBeDefined();
                    done();
                }

                interfaceKit.connect(
                    {
                        type: 'PhidgetInterfaceKit',
                    }
                );
            }
        );

        xit(
            'Verifies the rate event',
            function(done){
                interfaceKit.on(
                    'error',
                    errorHandler
                );

                interfaceKit.on(
                    'changed',
                    testCaseRate
                );

                var rate = interfaceKit.rate;

                interfaceKit.rate = 4;

                function errorHandler(err){
                    expect(err).toBe(false);
                    done();
                }

                function testCaseRate(){
                    interfaceKit.removeListener(
                        'error',
                        errorHandler
                    );
                    interfaceKit.removeListener(
                        'changed',
                        testCaseRate
                    );

                    expect(interfaceKit.rate).toBe(4);
                    interfaceKit.rate = rate;
                    console.log('ending before')
                    done();
                }
            }
        );

        xit(
            'Verifies data on change',
            function(done){
                console.log('starting after')
                var orignalOutputValue = interfaceKit.data.Output[0];

                interfaceKit.on(
                    'error',
                    errorHandler
                );

                interfaceKit.on(
                    'changed',
                    testCase
                );

                function errorHandler(err){
                    expect(err).toBe(false);
                    done();
                }

                if(Number(interfaceKit.data.Output[0]) !== 1){
                    interfaceKit.set(
                        {
                            type : 'Output',
                            key : '0',
                            value : '1'
                        }
                    )
                }

                function testCase(){
                    interfaceKit.removeListener(
                        'error',
                        errorHandler
                    );
                    interfaceKit.removeListener(
                        'changed',
                        testCase
                    );
                    expect(Number(interfaceKit.data.Output[0])).toBe(1);
                    console.log('changed value', interfaceKit.data.Output[0]);
                    interfaceKit.set(
                        {
                            type : 'Output',
                            key : '0',
                            value : orignalOutputValue
                        }
                    )

                    console.log('after changing again', interfaceKit.data.Output[0])
                    done();
                }
            }
        );

        it(
            'Verifies Phidget detached event',
            function(done){



                console.log('in the test');
                interfaceKit.on(
                    'error',
                    errorHandler
                );

                interfaceKit.on(
                    'detached',
                    checkDetachDevice
                );

                interfaceKit.on(
                    'removed',
                    checkRemoveDevice
                );

                function errorHandler(err){
                    expect(err).toBe(false);
                    done();
                }

                function checkRemoveDevice(data){
                    console.log('in remove test');
                    console.log(data);
                    done();
                }


                function checkDetachDevice(data){
                    console.log('in detach test');
                    console.log(data);
                    done();
                }

                console.log(interfaceKit.quit);

                interfaceKit.quit();
            }
        )
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
