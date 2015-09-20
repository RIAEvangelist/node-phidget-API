var Phidget = require('../phidgetapi.js').GPS;

var GPS=new Phidget;

GPS.observe(update);

function update(changes){
    for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        //console.log(change);
    }

    //see updated GPS data after all changes
    //console.log(changes[changes.length-1].object);

    //Or just the info you care about
    console.log(GPS.lat,GPS.lon);
}

/*
// to see raw phidget transfer, helpful when trying to debug
GPS.phidget.params.rawLog=true;
GPS.phidget.on(
    'log',
    function(data){
        console.log(data)
    }
);
*/

/*
 * Connect to phidget
 */
GPS.connect();
