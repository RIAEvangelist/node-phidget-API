var Phidget = require('../../../../phidgetapi.js').TemperatureSensor;

var temp = new Phidget();


describe(
    'Phidget Interface Kit spec',
    function(){
        it(
            'Verify sensor and ambient temperature measurement.',
            function(done){
                temp.whenReady(init);
                
                function init(){
                    console.log('Point the sensor over the ice cube');
                    temp.observeTemperature(temperature);
                    temp.observeAmbientTemperature(ambientTemperature);
                    
                }
                
                // To measure the temperature of anything to which sensor is pointed to
                function temperature(changes){
                    
                    console.log('Sensor Temperature is: ', temp.temperature);
                    expect(temp.temperature).toBeLessThan(10);
                    expect(temp.temperature).toBeGreaterThan(-5);
                    
                    temp.unobserveTemperature(temperature);
                }
                
                // To measure the room temperature
                function ambientTemperature(changes){
                    console.log('Ambient Temperature is: ', temp.ambientTemperature);
                    expect(temp.ambientTemperature).toBeLessThan(30);
                    temp.unobserveAmbientTemperature(ambientTemperature);
                    done();
                
                }
                
                
                temp.connect(
                    {
                        type: 'PhidgetTemperature'
                    }
                );
             }
        );
        
       
        it(
            'Verify temperature recorded by the sensor is within ambient temperature range',
            function(done){
                
                var sensorTemp;
                
                measureTemp();
                 
                function measureTemp(){
                    console.log('Point the sensor on the table');
                    temp.observeTemperature(temperature);
                    temp.observeAmbientTemperature(ambientTemperature);
                    
                }
                
                // To measure the temperature of anything to which sensor is pointed to
                function temperature(changes){
                    
                    console.log('Sensor Temperature is: ', temp.temperature);
                    sensorTemp = temp.temperature;
                    temp.unobserveTemperature(temperature);
                }
                
                
                
                // To measure the room temperature
                function ambientTemperature(changes){
                    console.log('Ambient Temperature is: ', temp.ambientTemperature);
                    expect (sensorTemp).toBeLessThan(temp.ambientTemperature +1);
                    expect (sensorTemp).toBeGreaterThan(temp.ambientTemperature -1);
                    temp.unobserveAmbientTemperature(ambientTemperature);

                    done();
                
                }
              
            }
            
        );
        
    }
)