var Phidget = require('../phidgetapi.js').Spatial;

var spatial=new Phidget;

spatial.observe(update);

spatial.phidget.on(
    'phidgetReady',
    function(){
        setTimeout(
            function(){
                console.log(spatial.phidget.data)
            },
            5000
        )
        console.log(spatial.phidget.data);
    }
);

function update(changes){
    for(var i in changes){
        var change=changes[i];
        //see specific info about each change
        //console.log(change);
    }

    //see updated Spatial data after all changes
    //console.log(changes[changes.length-1].object);

    //Or just the info you care about
    console.log(spatial);
}

spatial.phidget.connect();
