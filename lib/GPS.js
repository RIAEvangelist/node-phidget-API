var Phidget=require('../phidgetapi.js').Phidget;

function GPS(){
    Object.defineProperties(
        this,
        {
            type:{
                enumerable:true,
                writeable:false,
                value:"PhidgetGPS"
            },
            date:{
                enumerable:true,
                get:date
            },
            heading:{
                enumerable:true,
                get:heading
            },
            velocity:{
                enumerable:true,
                get:velocity
            },
            alt:{
                enumerable:true,
                get:alt
            },
            lat:{
                enumerable:true,
                get:lat
            },
            lon:{
                enumerable:true,
                get:lon
            },
            fixed:{
                enumerable:true,
                get:fixed
            },
            serial:{
                enumerable:true,
                get:phidget.serial
            },
            label:{
                enumerable:true,
                value:phidget.label
            },
            sampleRate:{
                enumerable:true,
                value:phidget.rate
            },
            connect:{
                enumerable:true,
                value:phidget.connect
            },
            update:{
                enumerable:false,
                writeable:false,
                value:update
            },
            phidget:{
                enumerable:false,
                value:phidgit,
                writeable:false
            }
        }
    );


    var phidget=new Phidget;

    phidget.data.parsed.date = {};
    phidget.data.parsed.InitKeys = false;
    phidget.data.parsed.ID = false;
    phidget.data.parsed.Position = {};
    phidget.data.parsed.PositionFix = false;
    phidget.data.parsed.Velocity = false;
    phidget.data.parsed.Status = false;
    phidget.data.parsed.Name = false;
    phidget.data.parsed.Version = false;
    phidget.data.parsed.Label = false;

    phidget.params={
        type:this.type
    }

    var date = false;

    //Getters
    /*
        Property: PositionFixStatus
        Gets the position fix status of this gps.
    */
    function fixed(){
        return phidget.data.parsed.PositionFix
    }
    /*
        Property: Latitude
        Gets the last recieved latitude.
    */
    function lat(){
        return phidget.data.parsed.Position.lat;
    }
    /*
        Property: Longitude
        Gets the last recieved longitude.
    */
    function lon(){
        return phidget.data.parsed.Position.lon;
    }
    /*
        Property: Altitude
        Gets the last recieved altitude.
    */
    function alt(){
        return altitude;
    }
    /*
        Property: heading
        Gets the last recieved heading.
    */
    function heading(){
        return heading;
    }
    /*
        Property: Velocity
        Gets the last recieved velocity.
    */
    function Velocity(){
        return velocity;
    }
    /*
        Property: date
        Gets the last recieved date and time in UTC.
    */
    function date(){
        return date;
    }

    function update(data){

        switch(data.key){
            case "PositionFix":

                break;
            case "Velocity":
                phidget.data.parsed.Velocity = Number(data.value);
                break;
            case "Heading":
                heading = Number(value);
                break;
            case "DateTime":
                var data = value.split("/");
                date = new Date();
                date.setUTCFullYear(
                    Number(data[0]),
                    Number(data[1])-1,
                    Number(data[2])
                );
                date.setUTCHours(
                    Number(data[3]),
                    Number(data[4]),
                    Number(data[5]),
                    Number(data[6])
                );
                break;
            case "Position":
                var data2 = value.split("/");
                latitude = Number(data2[0]);
                longitude = Number(data2[1]);
                altitude = Number(data2[2]);
                if(isAttached)
                    dispatchEvent(new PhidgetDataEvent(PhidgetDataEvent.POSITION_CHANGE,this,eventData));
                break;
        }
    }
}
