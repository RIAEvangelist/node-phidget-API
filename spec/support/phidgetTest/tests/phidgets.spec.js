var Phidget = require('../../../../phidgetapi.js').Phidget;

describe(
    'Phidget spec',
    function(){
        var phidgetCore = new Phidget();

        it(
            'Verifies phidget data when phidget is ready',
            function(done){

                console.log('in phi test');

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
                        console.log(data);
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

                function errorHandler(err){
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

                    phidgetCore.removeListener(
                        'error',
                        errorHandler
                    );
                    expect(Number(phidgetCore.data.serial.length)).toBeGreaterThan(0);
                    expect(phidgetCore.data.board).toBeDefined();
                    done();
                }

                phidgetCore.connect(
                    {
                        type: 'PhidgetInterfaceKit',
                    }
                );
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
                    expect(err).toBe(false);
                    done();
                }

                function testCaseRate(){
                    phidgetCore.removeListener(
                        'error',
                        errorHandler
                    );
                    phidgetCore.removeListener(
                        'changed',
                        testCaseRate
                    );

                    expect(phidgetCore.rate).toBe(4);
                    phidgetCore.rate = rate;
                    console.log('ending before')
                    done();
                }
            }
        );

        it(
            'Verifies data on change',
            function(done){
                console.log('starting after')
                var orignalOutputValue = phidgetCore.data.Output[0];

                phidgetCore.on(
                    'error',
                    errorHandler
                );

                phidgetCore.on(
                    'changed',
                    testCase
                );

                function errorHandler(err){
                    expect(err).toBe(false);
                    done();
                }

                if(Number(phidgetCore.data.Output[0]) !== 1){
                    phidgetCore.set(
                        {
                            type : 'Output',
                            key : '0',
                            value : '1'
                        }
                    )
                }

                function testCase(){
                    phidgetCore.removeListener(
                        'error',
                        errorHandler
                    );
                    phidgetCore.removeListener(
                        'changed',
                        testCase
                    );
                    expect(Number(phidgetCore.data.Output[0])).toBe(1);
                    console.log('changed value', phidgetCore.data.Output[0]);
                    phidgetCore.set(
                        {
                            type : 'Output',
                            key : '0',
                            value : orignalOutputValue
                        }
                    )

                    console.log('after changing again', phidgetCore.data.Output[0])
                    done();
                }
            }
        );

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

                phidgetCore.on(
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
                    expect(data.Status).toBe('Detached');
                    expect(data.value).toBe('Detached');
                    console.log(data);
                    done();
                }
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
